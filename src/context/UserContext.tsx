"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import * as signalR from "@microsoft/signalr";
import { getCookie } from "@/lib/utils";
import { authFetch } from "@/lib/api";

interface User {
  userId?: string;
  fullName?: string;
  userName: string;
  email: string;
  profilePic?: string;
}

export interface Notification {
  id: number;
  actionUserId: string;
  isRead: boolean;
  notificationType: string;
  message: string;
  profilePic: string;
  fullName: string;
  createdAt: string;
}

interface UserContextType {
  user: User;
  setUser: (user: User) => void;
  isLoading: boolean;
  refreshUserData: () => void;
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
  refreshNotifications: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>({
    fullName: "",
    userName: "",
    email: "",
    profilePic: "",
  });
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null
  );

  const loadUserFromStorage = useCallback(() => {
    setIsLoading(true);
    try {
      const localUser = localStorage.getItem("user");
      if (localUser) {
        const parsed = JSON.parse(localUser);
        if (parsed.user) {
          setUser(parsed.user);
        }
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateUser = useCallback((userData: User) => {
    setUser(userData);
    try {
      const currentData = localStorage.getItem("user");
      const parsedData = currentData ? JSON.parse(currentData) : {};
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...parsedData,
          user: userData,
        })
      );
    } catch (error) {
      console.error("Error updating user in localStorage:", error);
    }
  }, []);
  
  const refreshNotifications = useCallback(async () => {
    try {
      const res = await authFetch("/api/Notification", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("token") || ""}`,
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch notifications");
      }
      const data = await res.json();
      setNotifications(data.items || []);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    refreshNotifications();
  }, [refreshNotifications]);

  useEffect(() => {
    loadUserFromStorage();
  }, [loadUserFromStorage]);

  const refreshUserData = useCallback(() => {
    loadUserFromStorage();
  }, [loadUserFromStorage]);

  // Initialize SignalR connection
  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://cinemate.runasp.net/notificationHub", {
        withCredentials: true,
        accessTokenFactory: () => getCookie("token") || "", // Ensure a string is always returned
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    setConnection(newConnection);
  }, []);

  // Start SignalR connection and listen for notifications
  useEffect(() => {
    if (!connection) return;

    const startConnection = async () => {
      try {
        await connection.start();
        console.log("✅ SignalR connected");
      } catch (err) {
        console.error("❌ SignalR connection error:", err);
        setTimeout(startConnection, 5000); // Retry after 5s
      }
    };

    // Listen once
    connection.on("ReceiveNotification", (notification: Notification) => {
      console.log("📬 Notification received:", notification);
      setNotifications((prev) => [...prev, notification]);
    });

    startConnection();

    return () => {
      connection.stop();
      console.log("🔌 SignalR disconnected");
    };
  }, [connection]);
  return (
    <UserContext.Provider
      value={{
        user,
        setUser: updateUser,
        isLoading,
        refreshUserData,
        notifications,
        setNotifications,
        refreshNotifications,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

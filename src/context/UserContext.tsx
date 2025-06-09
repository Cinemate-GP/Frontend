"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import * as signalR from "@microsoft/signalr";

interface User {
  userId?: string;
  fullName?: string;
  userName: string;
  email: string;
  profilePic?: string;
}

interface Notification {
  id: string;
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
  notifications: Notification[]; // Optional: expose notifications if needed
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
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);

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
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    setConnection(newConnection);
  }, []);

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
      console.log("📩 New notification:", notification);
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
        notifications, // Optional: expose if components need it
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

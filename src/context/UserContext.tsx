"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";


interface User {
  userId?: string;
  fullName?: string;
  userName: string;
  email: string;
  profilePic?: string;
}


interface UserContextType {
  user: User;
  setUser: (user: User) => void;
  isLoading: boolean;
  refreshUserData: () => void;
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
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

  return (
    <UserContext.Provider
      value={{
        user,
        setUser: updateUser,
        isLoading,
        refreshUserData,
        notifications,
        setNotifications,
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

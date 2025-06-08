// context/UserContext.tsx
"use client";


import { getUserId } from "@/lib/utils";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import {io, Socket} from "socket.io-client";
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
  socket: Socket | null; // Add socket to the context type
}



// Create a context for user dataz
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>({
    fullName: "",
    userName: "",
    email: "",
    profilePic: "",
  });
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Function to load user data from localStorage
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

  // Function to update user state and also sync with localStorage
  const updateUser = useCallback((userData: User) => {
    setUser(userData);
    
    // When user data is updated through setUser, also update localStorage
    try {
      const currentData = localStorage.getItem("user");
      const parsedData = currentData ? JSON.parse(currentData) : {};
      localStorage.setItem("user", JSON.stringify({
        ...parsedData,
        user: userData
      }));
    } catch (error) {
      console.error("Error updating user in localStorage:", error);
    }
  }, []);

  // Initial load of user data
  useEffect(() => {
    loadUserFromStorage();
  }, [loadUserFromStorage]);

  // Function for components to manually refresh user data when needed
  const refreshUserData = useCallback(() => {
    loadUserFromStorage();
  }, [loadUserFromStorage]);

  // Initialize socket connection
  useEffect(() => {
    
    const newSocket = io("http://localhost:5000", {
      transports: ["websocket"],
      autoConnect: true,
    });
    setSocket(newSocket);
    },[]);
  
  useEffect(() => {
    socket?.emit("addUser", getUserId());
  },[socket, user.userId]);


  return (
    <UserContext.Provider value={{ 
      user, 
      setUser: updateUser, 
      isLoading,
      refreshUserData,
      socket: socket || null, // Provide the socket connection

    }}>
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

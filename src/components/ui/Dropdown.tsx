"use client";
import { Notification, useUser } from "@/context/UserContext";
import { authFetch } from "@/lib/api";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications } = useUser();
  const [newNotifications, setNewNotifications] =
    useState<Notification[]>(notifications);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update notifications when the context changes
  useEffect(() => {
    setNewNotifications(notifications);
  }, [notifications]);

  const markAsRead = async (id: number) => {
    try {
      const res = await authFetch(`/api/Notification/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to mark notification as read");
      }
      setNewNotifications((prev) =>
        prev.map((n) =>
          String(n.id) === String(id) ? { ...n, isRead: true } : n
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const clearAllNotfictions = async () => {
    notifications.forEach((n) => {
      markAsRead(n.id);
    });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 transition"
      >
        <div className="w-8 h-8 text-foreground rounded-full flex items-center justify-center text-xl">
          <IoNotificationsOutline className="text-gray-500" />
        </div>
        {newNotifications.some((n) => !n.isRead) && (
          <span className="absolute top-2 right-[21px] w-[6px] h-[6px] bg-primary rounded-full animate-ping"></span>
        )}
      </button>

      {/* Dropdown */}
      <div
        className={`absolute -right-10 p-3 mt-3 w-80 bg-secondaryBg border border-primary rounded-lg shadow-xl text-foreground transform max-w-[300px] ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        } transition-all duration-300`}
      >
        {/* Header */}
        <div className="p-3 border-b border-primary text-lg font-bold text-center bg-background">
          🎬 Movie Alerts
        </div>

        {/* Notifications List */}
        {newNotifications.length > 0 ? (
          <div className="max-h-72 overflow-y-auto custom-scrollbar">
            {newNotifications.map((n) => (
              <div
                key={n.id}
                className={`flex items-center p-3 gap-3 border-b border-border ${
                  n.isRead ? "opacity-60" : "bg-background shadow-lg"
                } hover:bg-hoverBg cursor-pointer transition`}
              >
                {/* Movie Poster */}
                <Image
                  src={n.profilePic}
                  alt="Movie Poster"
                  width={48}
                  height={64}
                  className="w-16 h-16 rounded-md shadow-lg"
                />

                {/* Notification Text */}
                <div className="flex-1">
                  <p className="text-sm">{n.message}</p>
                  {!n.isRead && (
                    <button
                      onClick={() => markAsRead(n.id)}
                      className="text-primary font-bold text-xs mt-1 hover:underline"
                    >
                      Mark as Read
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-3 text-gray-400 text-sm text-center">
            No new notifications 📭
          </div>
        )}
        {newNotifications.some((n) => !n.isRead) && (
          <button
            onClick={clearAllNotfictions}
            className="rounded-lg w-full p-1 bg-primary border hover:bg-transparent transition-all duration-150 hover:text-foreground border-primary text-foreground mt-3"
          >
           clear all notifications
          </button>
        )}
      </div>
    </div>
  );
}

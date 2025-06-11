"use client";
import { authFetch } from "@/lib/api";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { IoCheckmarkDone } from "react-icons/io5";
import { HiOutlineBell, HiBell } from "react-icons/hi";
import Link from "next/link";
import * as signalR from "@microsoft/signalr";
import { getCookie } from "@/lib/utils";

export interface Notification {
  id: number;
  actionUserId: string;
  isRead: boolean;
  notificationType: string;
  message: string;
  pic: string;
  fullName: string;
  createdAt: string;
}

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null
  );
  const [newNotifications, setNewNotifications] = useState<Notification[]>([]);

  // Fetch notifications from the server
  useEffect(() => {
    (async() => {
      try {
        const res = await authFetch("/api/Notification");
        if (!res.ok) {
          throw new Error("Failed to fetch notifications");
        }
        const data= await res.json();
        setNewNotifications(data.items);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    })()
  },[])

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://cinemate.runasp.net/notificationHub", {
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
      setNewNotifications((prev) => [...prev, notification]);
    });

    startConnection();

    return () => {
      connection.stop();
      console.log("🔌 SignalR disconnected");
    };
  }, [connection]);

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


  const markAsRead = async (id: number) => {
    try {
      const res = await authFetch(`/api/Notification/${id}/mark-read`, {
        method: "PUT",
      });
      if (!res.ok) {
        throw new Error("Failed to mark notification as read");
      }
      // Update local state
      setNewNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await authFetch("/api/Notification/mark-all-read", {
        method: "PUT",
      });
      // Update local state
      setNewNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch (error) {
      console.log(error);
    }
  };

  const cellAllNotifications = async () => {
    try {
      await authFetch("/api/Notification", {
        method: "DELETE",
      });
      // Clear local state
      setNewNotifications([]);
    } catch (error) {
      console.log(error);
    }
  };

  const getNotificationPath = (notification: Notification) => {
    const notificationType = notification.notificationType.toLowerCase();
    if (notificationType === "follow") {
      return `/${notification.actionUserId}`;
    } else if (notificationType === "newrelease") {
      return `/movies/${notification.actionUserId}`;
    }
    return "#"; // fallback for unknown types
  };

  const getNotificationImage = (notification: Notification) => {
    const notificationType = notification.notificationType.toLowerCase();
    if (notificationType === "newrelease" && notification.pic) {
      // For new releases, treat profilePic as movie poster path
      return `https://image.tmdb.org/t/p/original${notification.pic}`;
    }
    // For other types (like follows), use profilePic as user profile picture
    return notification.pic || "/user-placeholder.jpg";
  };

  const handleLinkClick = (notification: Notification) => {
    // Mark as read if not already read
    if (!notification.isRead) {
      markAsRead(notification.id);
    }

    // Close dropdown
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {" "}
      {/* Modern Notification Button */}{" "}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-secondaryBg border border-border hover:border-primary transition-colors duration-200 flex items-center justify-center group"
      >
        {newNotifications.some((n) => !n.isRead) ? (
          <HiBell className="w-5 h-5 text-primary" />
        ) : (
          <HiOutlineBell className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
        )}

        {/* Notification Count Badge */}
        {newNotifications.filter((n) => !n.isRead).length > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-medium rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
            {newNotifications.filter((n) => !n.isRead).length}
          </span>
        )}
      </button>
      {/* Modern Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 sm:w-80 lg:w-96 bg-secondaryBg border border-border rounded-xl shadow-2xl z-50 overflow-hidden max-w-[calc(100vw-2rem)]">
          {/* Header */}
          <div className="px-4 py-3 border-b border-border bg-background/50 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">
                Notifications
              </h3>
              {newNotifications.some((n) => !n.isRead) && (
                <button
                  onClick={markAllAsRead}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors"
                >
                  <IoCheckmarkDone className="w-3.5 h-3.5" />
                  mark all as read
                </button>
              )}
              {newNotifications.every((n) => n.isRead) &&
                newNotifications.length > 0 && (
                  <button
                    onClick={cellAllNotifications}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors"
                  >
                    <IoCheckmarkDone className="w-3.5 h-3.5" />
                    clear all
                  </button>
                )}
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-[60vh] sm:max-h-[400px] overflow-y-auto custom-scrollbar">
            {newNotifications.length > 0 ? (
              <div className="divide-y divide-border">
                {newNotifications.map((n) => (
                  <div key={n.id}>
                    <Link
                      href={getNotificationPath(n)}
                      onClick={() => handleLinkClick(n)}
                      className={`block p-4 hover:bg-hoverBg transition-colors `}
                    >
                      <div className="flex items-start gap-3">
                        {/* Profile Image */}
                        <div className="flex-shrink-0">
                          <Image
                            src={getNotificationImage(n)}
                            alt={n.fullName || "User"}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-lg object-cover border border-border"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground leading-relaxed">
                            {n.message}
                          </p>
                          {n.fullName && (
                            <p className="text-xs text-gray-500 mt-1">
                              by {n.fullName}
                            </p>
                          )}

                          {/* Read/Unread indicator */}
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2">
                              {!n.isRead && (
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                              )}
                              <span className="text-xs text-gray-500">
                                {!n.isRead ? "New" : "Read"}
                              </span>
                            </div>

                            {!n.isRead && (
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  markAsRead(n.id);
                                }}
                                className="text-xs text-primary hover:text-primary/80 font-medium"
                              >
                                Mark read
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <HiOutlineBell className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-400 text-sm">No notifications yet</p>
                <p className="text-gray-500 text-xs mt-1">
                  We&apos;ll notify you when something happens
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

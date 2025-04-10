"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      text: "New movie added: 'Interstellar'",
      moviePoster: "/test.png",
      read: false,
    },
    {
      id: 2,
      text: "Your friend liked 'Inception'",
      moviePoster: "/user-profile.webp",
      read: false,
    },
    {
      id: 3,
      text: "New episode of 'Stranger Things' is out!",
      moviePoster: "/notification.jpeg",
      read: true,
    },
  ]);

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

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 transition"
      >
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xl">
          <IoNotificationsOutline />
        </div>
        {notifications.some((n) => !n.read) && (
          <span className="absolute top-2 right-[21px] w-[6px] h-[6px] bg-red-600 rounded-full animate-ping"></span>
        )}
      </button>

      {/* Dropdown */}
      <div
        className={`absolute -right-6 p-3 mt-3 w-80 bg-black border border-red-500 rounded-lg shadow-xl text-white transform ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        } transition-all duration-300`}
      >
        {/* Header */}
        <div className="p-3 border-b border-red-500 text-lg font-bold text-center bg-gray-900">
          🎬 Movie Alerts
        </div>

        {/* Notifications List */}
        {notifications.length > 0 ? (
          <div className="max-h-72 overflow-y-auto">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`flex items-center p-3 gap-3 border-b border-gray-700 ${
                  n.read ? "opacity-60" : "bg-gray-800 shadow-lg"
                } hover:bg-gray-700 cursor-pointer transition`}
              >
                {/* Movie Poster */}
                <Image
                  src={n.moviePoster}
                  alt="Movie Poster"
                  width={48}
                  height={64}
                  className="w-12 h-16 rounded-md shadow-lg"
                />

                {/* Notification Text */}
                <div className="flex-1">
                  <p className="text-sm">{n.text}</p>
                  {!n.read && (
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
      </div>
    </div>
  );
}



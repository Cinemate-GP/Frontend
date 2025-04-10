"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CiLogout } from "react-icons/ci";
import { LuUserRound } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function ProfileMenu() {
  const {name , profileImage} = useSelector((state:RootState)=> state.user);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const menuItems = [
    { name: "Profile", href: "/pages/profile", icon: LuUserRound },
    { name: "Settings", href: "/pages/settings", icon: IoSettingsOutline },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Profile Button */}
      <button
        className="flex gap-2 items-center px-2 py-1  hover:bg-gray-800 rounded-lg transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-8 h-8 rounded-full border-2 border-primary">
          {profileImage ? (
            <Image
              src={profileImage }
              alt="user"
              width={32}
              height={32}
              className="w-full h-full rounded-full object-contain"
            />
          ) : (
            <span className="text-white text-lg font-semibold">
              {name?.charAt(0).toUpperCase() || "U"}
            </span>
          )}
        </div>
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute right-0 mt-2 w-40 bg-secondaryBg border border-red-500 rounded-lg shadow-lg transform ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        } transition-all duration-300`}
      >
        {/* Menu Items */}
        <ul className="p-2">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className="hover:bg-gray-700 rounded-lg transition"
            >
              <Link
                href={item.href}
                className="flex items-center gap-3 p-2 text-white"
                onClick={() => setIsOpen(false)}
              >
                <item.icon size={20} />
                {item.name}
              </Link>
            </li>
          ))}
          {/* Logout */}
          <li className="hover:bg-gray-800 rounded-lg transition">
            <button
              className="w-full flex items-center gap-3 p-2"
              onClick={() => {
                setIsOpen(false);
                router.push("/");
                document.cookie =
                  "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
              }}
            >
              <CiLogout size={20} />
              Log out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { modernIcons } from "@/constants";
import { motion } from "framer-motion";
import { useUser } from "@/context/UserContext";
import Image from "next/image";
import React from "react";
import { logout } from "@/lib/utils";

const Menu = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { user } = useUser();

  const handleLogout = () => {
    // Use centralized logout function
    logout("/");
    setIsOpen(false);
  };

  // Categories of menu items
  const libraryItems = [
    {
      name: "Watchlist",
      href: "/profile/watchlist",
      icon: modernIcons.Watchlist,
      description: "Movies to watch"
    },
    {
      name: "Liked",
      href: "/profile/liked",
      icon: modernIcons.Likes,
      description: "Favorite movies"
    },
  ];

  const browseItems = [
    {
      name: "Movies",
      href: "/movies",
      icon: modernIcons.Movies,
      description: "Explore all movies"
    },
    {
      name: "Feed",
      href: "/feed",
      icon: modernIcons.Feeds,
      description: "Latest updates"
    },
  ];

  const accountItems = [
    {
      name: "Profile",
      href: "/profile",
      icon: modernIcons.Profile,
      description: "Your account"
    },
    {
      name: "Settings",
      href: "/settings",
      icon: modernIcons.Settings,
      description: "Preferences"
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* User Profile Section */}
      <div className="flex items-center gap-3 mb-2 px-2 py-3 bg-[#1a1a1a] rounded-lg">
        <div className="w-12 h-12 rounded-full border-2 border-primary overflow-hidden">
          <Image
            src={user?.profilePic || "/user-placeholder.jpg"}
            alt="Profile"
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-white font-medium">{user?.fullName || "User"}</h3>
          <p className="text-xs text-gray-400">{user?.email || ""}</p>
        </div>
        <motion.button
          onClick={handleLogout}
          className="p-2.5 bg-[#252525] text-gray-400 hover:text-red-500 rounded-full"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Logout"
        >
          {React.createElement(modernIcons.Logout as React.ComponentType<React.SVGProps<SVGSVGElement>>, {
            className: "w-5 h-5",
            "aria-hidden": "true",
          })}
        </motion.button>
      </div>

      {/* Menu Categories */}
      <div>
        <h3 className="text-xs font-medium text-gray-500 uppercase mb-2 px-2">Your Library</h3>
        <div className="grid grid-cols-2 gap-2">
          {libraryItems.map((item) => (
            <MenuGridItem key={item.name} item={item} setIsOpen={setIsOpen} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-medium text-gray-500 uppercase mb-2 px-2">Browse</h3>
        <div className="grid grid-cols-2 gap-2">
          {browseItems.map((item) => (
            <MenuGridItem key={item.name} item={item} setIsOpen={setIsOpen} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-medium text-gray-500 uppercase mb-2 px-2">Account</h3>
        <div className="grid grid-cols-2 gap-2">
          {accountItems.map((item) => (
            <MenuGridItem key={item.name} item={item} setIsOpen={setIsOpen} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Grid item component for menu
const MenuGridItem = ({ 
  item, 
  setIsOpen
}: { 
  item: { 
    name: string; 
    href: string; 
    icon: React.ComponentType; 
    description: string;
  }; 
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-[#1a1a1a] rounded-lg overflow-hidden"
    >
      <Link
        href={item.href}
        className="flex flex-col p-4 h-full"
        onClick={() => setIsOpen(false)}
      >
        <div className="flex justify-between items-center mb-2">
          {React.createElement(item.icon as React.ComponentType<React.SVGProps<SVGSVGElement>>, {
            className: "w-5 h-5 text-gray-400",
            "aria-hidden": "true",
          })}
          <span className="text-sm font-medium text-white">{item.name}</span>
        </div>
        <p className="text-xs text-gray-400">{item.description}</p>
      </Link>
    </motion.div>
  );
};

export default Menu;

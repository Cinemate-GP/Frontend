"use client";

import Link from "next/link";
import { modernIcons } from "@/constants";
import { motion } from "framer-motion";
import { useUser } from "@/context/UserContext";
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
  };  // Categories of menu items - Remove Feed since it's in horizontal nav
  const libraryItems = [
    {
      name: "Watchlist",
      href: `/${user?.userName}/watchlist`,
      icon: modernIcons.Watchlist,
      description: "Movies to watch"
    },
    {
      name: "Liked",
      href: `/${user?.userName}/liked`,
      icon: modernIcons.Likes,
      description: "Favorite movies"    },
  ];
  
  const accountItems = [
    {
      name: "Settings",
      href: "/settings",
      icon: modernIcons.Settings,
      description: "Preferences"
    },
    {
      name: "Profile",
      href: `/${user?.userName}`,
      icon: modernIcons.Profile,
      description: "Your account"
    },
  ];return (
    <div className="flex flex-col h-full bg-sideNavBg">      {/* User Info Section - No Image, Just Text */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center py-6 border-b border-border"
      >
        <h3 className="text-foreground font-semibold text-lg">{user?.fullName}</h3>
        <p className="text-textMuted text-sm">@{user?.userName}</p>
        <p className="text-textMuted text-xs opacity-75">{user?.email}</p>
      </motion.div>{/* Menu Items - 2x2 Grid */}
      <div className="flex-1 py-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-2 gap-4 px-4"
        >
          {[...libraryItems, ...accountItems].map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="relative"
            >              <Link
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 p-4 hover:bg-hoverBg transition-colors duration-200 rounded-lg border border-border hover:border-primary/50 bg-secondaryBg/50"
              >
                {React.createElement(item.icon as React.ComponentType<React.SVGProps<SVGSVGElement>>, {
                  className: "w-5 h-5 text-textMuted",
                  "aria-hidden": "true",
                })}
                <span className="text-foreground font-medium text-sm">{item.name}</span>
              </Link>
              
              {/* Decorative corner accent */}
              <div className="absolute top-2 right-2 w-1 h-1 bg-border rounded-full"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>      {/* Logout Button - Clean and Prominent */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="border-t border-border p-4"
      >
        <motion.button
          onClick={handleLogout}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary transition-colors duration-200 rounded-lg"
        >
          {React.createElement(modernIcons.Logout as React.ComponentType<React.SVGProps<SVGSVGElement>>, {
            className: "w-5 h-5",
            "aria-hidden": "true",
          })}
          <span className="font-medium">Sign Out</span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Menu;

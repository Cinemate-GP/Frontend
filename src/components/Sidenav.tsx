"use client";

import { useState, useCallback } from "react";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { modernIcons } from "@/constants";
import HorizontalNav from "./HorizontalNav";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidenave } from "@/redux/slices/sidebarSlice";
import { IoIosArrowBack } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { logout } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { useUser } from "@/context/UserContext";

export default function Sidenav() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { themeMode } = useSelector((state: RootState) => state.theme);
  const { user } = useUser();
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    dispatch(toggleSidenave(isCollapsed));
  };

  const handleLogout = useCallback(() => {
    // Use centralized logout function that handles both token and refreshToken
    logout("/");
    // Router will be handled by the logout function
  }, []);

  // Dynamic navigation categories
  const navCategories = {
    browse: [
      { name: "Home", href: "/home", icon: "Home" as keyof typeof modernIcons },
      {
        name: "Movies",
        href: "/movies",
        icon: "Movies" as keyof typeof modernIcons,
      },
      {
        name: "Feed",
        href: "/feed",
        icon: "Feeds" as keyof typeof modernIcons,
      },
    ],
    library: [
      {
        name: "Watchlist",
        href: `/${user?.userName}/watchlist`,
        icon: "Watchlist" as keyof typeof modernIcons,
      },
      {
        name: "Liked",
        href: `/${user?.userName}/liked`,
        icon: "Likes" as keyof typeof modernIcons,
      },
    ],
    account: [
      {
        name: "Profile",
        href: `/${user?.userName}`,
        icon: "Profile" as keyof typeof modernIcons,
      },
      {
        name: "Settings",
        href: "/settings",
        icon: "Settings" as keyof typeof modernIcons,
      },
    ],
  };

  // Sidebar animation variants
  const sidebarVariants = {
    expanded: {
      width: "14rem",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    collapsed: {
      width: "4.2rem",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  return (
    <>
      {" "}
      <motion.aside
        data-sidebar="true"
        className="h-screen bg-sideNavBg fixed z-50
           flex-col border-r border-border shadow-xl
          md:flex hidden"
        variants={sidebarVariants}
        initial="expanded"
        animate={isCollapsed ? "collapsed" : "expanded"}
      >
        {/* Logo Section with Toggle Button */}
        <div className="relative flex items-center h-16 px-4 border-b border-border">
          <Link
            href="/home"
            className={`flex items-center ${
              isCollapsed ? "justify-center w-full" : ""
            }`}
          >
            <Image
              src="/logo.png"
              width={36}
              height={36}
              priority
              alt="CineMate logo"
              className={`${
                themeMode === "light" ? "invert" : ""
              } filter object-contain min-w-[36px]`}
            />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  className="ml-2.5 font-semibold text-base text-foreground truncate"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  Cine<span className="text-primary">Mate</span>
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {/* Toggle Button - Only shown when sidebar is expanded */}
          {!isCollapsed && (
            <motion.button
              aria-label="Collapse sidebar"
              className="ml-auto text-textMuted hover:text-textMuted p-1.5 rounded-lg hover:bg-secondaryBg 
                transition-colors duration-200"
              onClick={toggleSidebar}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <IoIosArrowBack size={20} />
            </motion.button>
          )}
        </div>

        {/* Browse Section */}
        <nav className="flex-1 py-3 px-3 overflow-y-auto overflow-x-hidden custom-scrollbar">
          {/* Browse Category */}
          <div
            className={`mb-2 px-2 overflow-hidden ${
              isCollapsed ? "hidden" : ""
            }`}
          >
            <AnimatePresence mode="wait">
              <motion.h2
                key="browse-expanded"
                className="text-xs text-gray-500 uppercase tracking-wider"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                Browse
              </motion.h2>
            </AnimatePresence>
          </div>
          <ul className="space-y-1.5 mb-3">
            {navCategories.browse.map((link) => (
              <NavItem
                key={link.name}
                link={link}
                isActive={pathname === link.href}
                isCollapsed={isCollapsed}
              />
            ))}
          </ul>

          {/* Separator for collapsed mode */}
          {isCollapsed && (
            <div className="my-3 mx-auto w-3/4 h-[2px] bg-gradient-to-r from-transparent via-gray-700/50 to-transparent rounded-full" />
          )}

          {/* Personal Library Section */}
          <div
            className={`mb-2 px-2 overflow-hidden ${
              isCollapsed ? "hidden" : ""
            }`}
          >
            <AnimatePresence mode="wait">
              <motion.h2
                key="library-expanded"
                className="text-xs text-gray-500 uppercase tracking-wider"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                Your Library
              </motion.h2>
            </AnimatePresence>
          </div>
          <ul className="space-y-1.5 mb-3">
            {navCategories.library.map((link) => (
              <NavItem
                key={link.name}
                link={link}
                isActive={pathname === link.href}
                isCollapsed={isCollapsed}
              />
            ))}
          </ul>

          {/* Separator for collapsed mode */}
          {isCollapsed && (
            <div className="my-3 mx-auto w-3/4 h-[2px] bg-gradient-to-r from-transparent via-gray-700/50 to-transparent rounded-full" />
          )}

          {/* Account Section */}
          <div
            className={`mb-2 px-2 overflow-hidden ${
              isCollapsed ? "hidden" : ""
            }`}
          >
            <AnimatePresence mode="wait">
              <motion.h2
                key="account-expanded"
                className="text-xs text-gray-500 uppercase tracking-wider"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                Your Account
              </motion.h2>
            </AnimatePresence>
          </div>
          <ul className="space-y-1.5">
            {navCategories.account.map((link) => (
              <NavItem
                key={link.name}
                link={link}
                isActive={
                  pathname ===
                    (link.name === "Profile"
                      ? `/${user?.userName}`
                      : link.href) ||
                  // Only consider profile active if it's exactly the username path, not subpaths
                  (link.name === "Profile" && pathname === `/${user?.userName}`)
                }
                isCollapsed={isCollapsed}
              />
            ))}
          </ul>
        </nav>

        {/* User Profile and Logout Section */}
        <div className="mt-auto border-t border-border p-3">
          <motion.button
            onClick={handleLogout}
            className={`relative group w-full rounded-lg transition-all duration-200
              ${
                isCollapsed
                  ? "p-2 flex justify-center"
                  : "p-3 flex items-center"
              } 
              text-gray-500 hover:bg-secondaryBg hover:text-textMuted`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label="Sign out"
          >
            <div
              className={`flex items-center ${
                isCollapsed ? "justify-center" : "w-full"
              }`}
            >
              {/* Logout icon */}
              <span className="flex-shrink-0">
                {React.createElement(modernIcons.Logout, {
                  className: "w-[20px] h-[20px]",
                  "aria-hidden": "true",
                })}
              </span>

              <AnimatePresence>
                {/* Logout text - only visible when expanded */}
                {!isCollapsed && (
                  <motion.span
                    className="ml-3 text-sm font-medium"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    Sign out
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div
                  className="absolute left-full ml-2 px-2.5 py-1.5 bg-[#1a1a1a] text-gray-200
                  text-xs rounded-lg opacity-0 group-hover:opacity-100 transform translate-x-2
                  group-hover:translate-x-0 pointer-events-none group-hover:pointer-events-auto
                  border border-[#333333] transition-all duration-200 whitespace-nowrap z-50 shadow-lg"
                >
                  Sign out
                </div>
              )}
            </div>
          </motion.button>
        </div>
      </motion.aside>
      {/* Expand Button - Only shown when sidebar is collapsed and positioned outside */}
      <AnimatePresence>
        {isCollapsed && (
          <motion.button
            key="expand-button"
            aria-label="Expand sidebar"
            className="fixed top-4 left-[4.2rem] z-50 
              backdrop-blur-md border border-border
              text-gray-textMuted p-1.5 rounded-lg hover:bg-hoverBg
              hidden md:flex items-center justify-center"
            onClick={toggleSidebar}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -5 }}
            transition={{ duration: 0.2 }}
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
      <HorizontalNav pathname={pathname} />
    </>
  );
}

const NavItem = ({
  link,
  isActive,
  isCollapsed,
}: {
  link: { name: string; href: string; icon: keyof typeof modernIcons };
  isActive: boolean;
  isCollapsed: boolean;
}) => {
  const iconName = link.icon;

  return (
    <motion.li
      className="group w-full"
      whileFocus={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      <Link
        href={link.href}
        className={`flex items-center  px-3 py-2.5 rounded-lg transition-all duration-200 w-full
          ${
            isActive
              ? "bg-secondaryBg border-l-2 border-primary text-textMuted"
              : "text-gray-500 hover:bg-secondaryBg hover:text-textMuted border-l-2 border-transparent"
          }
          ${isCollapsed ? "justify-center" : ""}
        `}
      >
        <motion.span
          className={`${isCollapsed ? "" : "mr-3"} flex-shrink-0`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {React.createElement(modernIcons[iconName], {
            className: `w-[20px] h-[20px] transition-colors duration-200 ${
              isActive ? "text-primary" : ""
            }`,
            "aria-hidden": "true",
          })}
        </motion.span>

        {!isCollapsed && (
          <motion.span
            className="text-sm font-medium truncate"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {link.name}
          </motion.span>
        )}

        {isCollapsed && (
          <div
            className="absolute left-full z-50 px-2.5 py-1.5 bg-secondaryBg text-textMuted text-xs rounded-lg
             opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0
            pointer-events-none group-hover:pointer-events-auto border border-border
            transition-all duration-200 whitespace-nowrap shadow-lg"
          >
            {link.name}
          </div>
        )}
      </Link>
    </motion.li>
  );
};

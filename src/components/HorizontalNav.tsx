"use client";
import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiHome, FiRss } from "react-icons/fi";
import { IoExitOutline } from "react-icons/io5";
import { usePathname as useNextPathname } from "next/navigation";
import Menu from "./Menu";
import { Search } from "./Search";
import { useUser } from "@/context/UserContext";
import Image from "next/image";
import { logout } from "@/lib/utils";

const HorizontalNav = ({ pathname: propPathname }: { pathname: string }) => {
  const pathFromRouter = useNextPathname();
  const pathname = propPathname || pathFromRouter;
  
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLogoutConfirm, setIsLogoutConfirm] = useState<boolean>(false);
  const { user, refreshUserData } = useUser();

  // Refresh user data when component mounts
  useEffect(() => {
    refreshUserData();
  }, [refreshUserData]);

  // Close logout confirmation when menu is opened
  const toggleMenu = () => {
    setIsOpen((prev: boolean) => !prev);
    if (isLogoutConfirm) setIsLogoutConfirm(false);
  };

  const handleLogout = useCallback(() => {
    // If this is the first click, show confirmation
    if (!isLogoutConfirm) {
      setIsLogoutConfirm(true);
      return;
    }
    
    logout("/");
    setIsLogoutConfirm(false);
  }, [isLogoutConfirm]);

  // Auto-close logout confirmation after a delay
  useEffect(() => {
    if (isLogoutConfirm) {
      const timer = setTimeout(() => {
        setIsLogoutConfirm(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isLogoutConfirm]);

  // Updated mobile nav items with Home, Feed, and Search
  const mobileNavItems = [
    { name: "Home", href: "/home", icon: FiHome },
    { name: "Feed", href: "/feed", icon: FiRss },
  ];

  return (
    <>
      {/* Mobile Bottom Navigation Bar */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-full h-[60px] fixed z-[100] left-0 bottom-0 block md:hidden border-t border-border bg-sideNavBg backdrop-blur-md shadow-lg"
      >
        <ul className="flex items-center justify-between h-full px-2">
          {/* Main Navigation Items - Home and Feed */}
          {mobileNavItems.map((item) => (
            <li key={item.name} className="flex-1">
              <Link
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex flex-col items-center justify-center h-full ${
                  pathname === item.href ? "text-primary" : "text-gray-400"
                }`}
              >
                <item.icon className="w-5 h-5 mb-1" aria-hidden="true" />
                <span className="text-[10px]">{item.name}</span>
              </Link>
            </li>
          ))}

          {/* Search Button */}
          <li className="flex-1" onClick={() => setIsOpen(false)}>
            <div className="flex flex-col items-center justify-center h-full">
              <Search isMobile={true} />
            </div>
          </li>

          {/* Profile Button (opens menu) */}
          <AnimatePresence mode="wait">
            {isLogoutConfirm ? (
              <motion.li 
                key="logout-confirm"
                className="flex-1"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <button
                  className="flex flex-col items-center justify-center h-full w-full text-primary"
                  onClick={handleLogout}
                  aria-label="Confirm logout"
                >
                  <IoExitOutline className="w-5 h-5 mb-1" aria-hidden="true" />
                  <span className="text-[10px]">Confirm</span>
                </button>
              </motion.li>
            ) : (
              <motion.li 
                key="profile" 
                className="flex-1"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <button
                  className={`flex flex-col items-center justify-center h-full w-full ${
                    isOpen ? "text-primary" : "text-gray-400"
                  }`}
                  onClick={toggleMenu}
                >
                  <div className="relative w-6 h-6 mb-1 rounded-full border border-primary overflow-hidden">
                    <Image
                      src={user?.profilePic || "/user-placeholder.jpg"}
                      alt="Profile"
                      width={24}
                      height={24}
                      className="w-full h-full object-cover"
                      priority={true}
                    />
                  </div>
                  <span className="text-[10px]">profile</span>
                </button>
              </motion.li>
            )}
          </AnimatePresence>
        </ul>
      </motion.div>

      {/* Mobile Menu Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 bottom-[60px] z-[99] bg-[#111111] border-t border-[#222222] p-4 max-h-[70vh] overflow-y-auto rounded-t-xl shadow-xl"
          >
            <Menu setIsOpen={setIsOpen} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HorizontalNav;

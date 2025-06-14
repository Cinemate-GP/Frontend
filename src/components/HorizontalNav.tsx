"use client";
import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiHome, FiRss, FiFilm } from "react-icons/fi";
import { IoExitOutline } from "react-icons/io5";
import { usePathname as useNextPathname } from "next/navigation";
import Menu from "./Menu";
import { Search } from "./Search";
import { useUser } from "@/context/UserContext";
import { logout } from "@/lib/utils";

const HorizontalNav = ({ pathname: propPathname }: { pathname: string }) => {
  const pathFromRouter = useNextPathname();
  const pathname = propPathname || pathFromRouter;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLogoutConfirm, setIsLogoutConfirm] = useState<boolean>(false);
  const { refreshUserData } = useUser();

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
  // Updated mobile nav items with Home, Movies, Feed, and Search
  const mobileNavItems = [
    { name: "Home", href: "/home", icon: FiHome },
    { name: "Movies", href: "/movies", icon: FiFilm },
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
          {/* Main Navigation Items - Home, Movies, and Feed */}
          {mobileNavItems.map((item) => (
            <li key={item.name} className="flex-1">
              <Link
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex flex-col items-center justify-center max-w-16 hover:text-primary ${
                  pathname === item.href ? "text-primary" : "text-gray-400"
                }`}
              >
                <item.icon className="w-5 h-5 mb-1 " aria-hidden="true" />
                <span className="text-[10px]">{item.name}</span>
              </Link>
            </li>
          ))}

          {/* Search Button */}
          <li className="flex-1" onClick={() => setIsOpen(false)}>
            <div className="flex flex-col items-center justify-center h-full hover:text-primary">
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
                key="menu"
                className="flex-1"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <button
                  className={`flex flex-col items-center justify-center h-full w-full hover:text-primary ${
                    isOpen ? "text-primary" : "text-gray-400"
                  }`}
                  onClick={toggleMenu}
                >
                  <svg
                    className="w-5 h-5 mb-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                  <span className="text-[10px]">Menu</span>
                </button>
              </motion.li>
            )}
          </AnimatePresence>
        </ul>
      </motion.div>{" "}
      {/* Mobile Menu Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 bottom-[60px] z-[99] bg-sideNavBg border-t border-border p-4 max-h-[70vh] overflow-y-auto rounded-t-xl shadow-xl"
          >
            <Menu setIsOpen={setIsOpen} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HorizontalNav;

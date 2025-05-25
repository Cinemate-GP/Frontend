"use client";

import React, { useEffect } from "react";
import NavbarSearch from "./Search";
import Image from "next/image";
import NotificationDropdown from "@/components/ui/Dropdown";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
const Navbar = () => {
  const { isCollapsed } = useSelector((state: RootState) => state.sideNave);
  const { user, refreshUserData } = useUser();
  const router = useRouter();
  const { themeMode } = useSelector((state: RootState) => state.theme);


  // Refresh user data when component mounts
  useEffect(() => {
    refreshUserData();
  }, [refreshUserData]);

  const navigateToProfile = () => {
    router.push("/profile");
  };

  return (
    <div
      className={`absolute z-30 w-full ${
        isCollapsed ? "w-full md:w-[calc(100%-3rem)] right-0" : "w-full left-0"
      } top-0 px-2`}
    >
      <div className="flex items-center py-2 md:p-4 gap-x-4">
        <div className="block md:hidden w-[60px] h-[60px] sm:w-[100px] sm:h-[100px]">
          <Image
            src="/logo.png"
            width={60}
            height={60}
            alt="logo"
            className={`object-contain w-full h-full filter ${themeMode === "light" ? "invert" : ""}`}
          />
        </div>
        <div className="hidden md:block w-full max-w-2xl">
          <NavbarSearch />
        </div>
        {/* <div
          role="button"
          className={`w-12 h-6 flex items-center bg-gray-400 rounded-full p-1 cursor-pointer ms-auto ${
            isDark ? "!bg-primary" : ""
          }`}
          onClick={toggleTheme}
        >
          <div
            className={`w-5 h-5 bg-white rounded-full transition-all duration-200 ${
              isDark ? "translate-x-[22px]" : ""
            }`}
          ></div>
        </div> */}
        <div className="ml-auto flex items-center relative gap-3">
          <NotificationDropdown />
          <motion.div
            className="w-[36px] h-[36px] rounded-full border-2 border-primary overflow-hidden shadow-md cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            onClick={navigateToProfile}
          >
            <Image
              src={user?.profilePic || "/user-placeholder.jpg"}
              alt="Profile"
              width={36}
              height={36}
              className="w-full h-full object-cover"
              priority={true}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

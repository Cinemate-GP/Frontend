"use client";

import React, { useEffect } from "react";
import NavbarSearch from "./Search";
import Image from "next/image";
import NotificationDropdown from "@/components/ui/Dropdown";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const Navbar = () => {
  const { user, refreshUserData } = useUser();
  const router = useRouter();

  // Refresh user data when component mounts
  useEffect(() => {
    refreshUserData();
  }, [refreshUserData]);

  const navigateToProfile = () => {
    router.push("/profile");
  };

  return (
    <div className="absolute z-30 w-full pr-2 top-0">
      <div className="flex items-center py-2 md:p-4">
        <div className="block md:hidden w-[60px] h-[60px] sm:w-[100px] sm:h-[100px]">
          <Image
            src="/logo.png"
            width={60}
            height={60}
            alt="logo"
            className="object-contain w-full h-full"
          />
        </div>
        <div className="hidden md:block md:ml-10 w-[62%] sm:w-1/2">
          <NavbarSearch />
        </div>
        <div className="ml-auto flex items-center relative gap-3">
          <NotificationDropdown />
          <motion.div 
            className="w-[36px] h-[36px] rounded-full border-2 border-red-500/50 overflow-hidden shadow-md cursor-pointer"
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

"use client";

import React, { useEffect } from "react";
import NavbarSearch from "./Search";
import Image from "next/image";
import NotificationDropdown from "@/components/ui/Dropdown";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
const Navbar = () => {
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
    <div className="absolute z-30 w-full top-0 py-4 md:py-6">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
  
        <div className="flex items-center justify-between w-full">
          <div className="block md:hidden w-[60px] h-[60px] sm:w-[100px] sm:h-[100px]">
            <Image
              src="/logo.png"
              width={60}
              height={60}
              alt="logo"
              className={`object-contain w-full h-full filter ${
                themeMode === "light" ? "invert" : ""
              }`}
            />
          </div>
          <div className="hidden md:block w-full max-w-2xl mr-4">
            <NavbarSearch isNavbar={true} />
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <NotificationDropdown />
            <div
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-secondaryBg border border-border hover:border-primary overflow-hidden shadow-sm cursor-pointer transition-colors duration-200"
              onClick={navigateToProfile}
            >
              <Image
                src={user?.profilePic || "/user-placeholder.jpg"}
                alt="Profile"
                width={44}
                height={44}
                className="w-full h-full object-cover"
                priority={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

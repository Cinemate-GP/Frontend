"use client";

import React, { useEffect } from "react";
import NavbarSearch from "./Search";
import Image from "next/image";
import NotificationDropdown from "@/components/ui/Dropdown";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getCookie } from "@/lib/utils";

const Navbar = () => {
  const { user, refreshUserData } = useUser();
  const router = useRouter();
  const { themeMode } = useSelector((state: RootState) => state.theme);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  useEffect(() => {
    refreshUserData();
    setIsAuthenticated(!!getCookie("token"));
  }, [refreshUserData]);

  const navigateToProfile = () => {
    router.push(`/${user?.userName}`);
  };

  return (
    <div className="absolute z-30 w-full top-0 py-4 md:py-6">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between w-full">
          <div className="block md:hidden w-8 h-8 sm:w-10 sm:h-10">
            <Image
              src="/logo.png"
              width={40}
              height={40}
              alt="logo"
              className={`object-contain w-full h-full filter ${
                themeMode === "light" ? "invert" : ""
              }`}
            />
          </div>
          <div className="hidden md:block w-full max-w-2xl mr-4">
            <NavbarSearch />
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            {isAuthenticated ? (
              <>
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
              </>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => router.push("/login")}
                  className="px-4 py-2 text-sm font-medium text-foreground border border-border rounded-lg hover:bg-hoverBg transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => router.push("/signup")}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

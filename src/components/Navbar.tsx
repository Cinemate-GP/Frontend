import React from "react";
import ProfileMenue from "./ProfileMenue";
import NavbarSearch from "./Search";
import Image from "next/image";
import NotificationDropdown from "./Dropdown";
const Navbar = () => {
  return (
    <div className="absolute z-30 w-full pr-2">
      <div className="ml-[10px] md:ml-48 flex items-center py-2 md:p-4">
        <div className="block md:hidden w-[60px] h-[60px] sm:w-[100px] sm:h-[100px]">
          <Image
            src="/logo.svg"
            width={60}
            height={60}
            alt="logo"
            className="object-contain w-full h-full"
          />
        </div>
        <div className="hidden md:block w-[62%] sm:w-1/2">
          <NavbarSearch />
        </div>
        <div className="ml-auto flex items-center gap-3 relative">
          <NotificationDropdown />
          <ProfileMenue />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

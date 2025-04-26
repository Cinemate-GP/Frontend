"use client";

import { useState } from "react";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainLinks, icons, NavLink } from "@/constants";
import HorizontalNav from "./HorizontalNav";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { toggleSidenave } from "@/redux/slices/sidebarSlice";
import { RiMenuUnfold2Line, RiMenuFold2Line } from "react-icons/ri";
import { useSearch } from "@/context/SearchContext";
import { useUser } from "@/context/UserContext";

export default function Sidenav() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { setSearch } = useSearch();
  const dispatch = useDispatch();
  const { user } = useUser();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    dispatch(toggleSidenave(isCollapsed));
  };

  return (
    <>
      <aside
        onClick={() => setSearch("")}
        className={`h-screen bg-black fixed z-50
          flex flex-col transition-all duration-200 ease-in-out
          ${isCollapsed ? "w-[4.5rem]" : "w-[14rem]"} hidden md:flex
          border-r border-gray-950`}
      >
        {/* Logo Section */}
        <div className="relative flex items-center h-16 px-4 border-b border-gray-950/60">
          <Link
            href="/pages"
            className={`flex items-center ${isCollapsed ? "justify-center w-full" : ""}`}
          >
            <Image
              src="/logo.png"
              width={50}
              height={50}
              priority
              alt="CineMate logo"
              className="object-contain"
            />
            {!isCollapsed && (
              <span className="ml-2 mr-5 font-semibold text-gray-200">
                Cine<span className="text-red-500">Mate</span>
              </span>
            )}
          </Link>

          <button
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={`${
              isCollapsed ? "-mr-12" : "-mr-2"
            } p-1.5 rounded-lg hover:bg-gray-900/60 text-gray-500 hover:text-gray-200 transition-colors duration-200`}
            onClick={toggleSidebar}
          >
            {isCollapsed ? <RiMenuFold2Line size={20} /> : <RiMenuUnfold2Line size={20} />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-4 px-3">
          <ul className="space-y-1">
            {mainLinks.map((link) => (
              <NavItem
                key={link.name}
                link={link}
                isActive={pathname === link.href}
                isCollapsed={isCollapsed}
              />
            ))}
          </ul>
        </nav>

        {/* Footer Actions */}
        <div className="mt-auto border-t border-gray-950/60 p-3">
          <div className={`flex ${isCollapsed ? "flex-col" : "items-center justify-between"} gap-2`}>
            <Link
              href="/pages/profile"
              className={`relative group flex items-center p-2 rounded-xl
                ${pathname === "/pages/profile" ? "bg-red-950/30 text-red-500" : "text-gray-500"}
                hover:bg-black/40 hover:text-gray-300 transition-all duration-200
                ${isCollapsed ? "justify-center w-10 mx-auto" : ""}`}
            >
              <span className={`${isCollapsed ? "" : "mr-3"}`}>
                <div className="w-[28px] h-[28px] rounded-full overflow-hidden">
                  <Image
                    src={user?.profilePic || "/ueser-placeholder.jpg"}
                    alt="Profile"
                    width={28}
                    height={28}
                    className="w-full h-full object-cover"
                  />
                </div>
              </span>
              {!isCollapsed && <span className="text-sm font-medium">Profile</span>}
              
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2.5 py-1.5 bg-gray-950 text-gray-200
                  text-sm rounded-lg opacity-0 group-hover:opacity-100 transform translate-x-2
                  group-hover:translate-x-0 pointer-events-none group-hover:pointer-events-auto
                  transition-all duration-200 whitespace-nowrap z-50 shadow-lg">
                  Profile
                </div>
              )}
            </Link>

            <Link
              href="/pages/settings"
              className={`relative group flex items-center p-2 rounded-xl
                ${pathname === "/pages/settings" ? "bg-red-950/30 text-red-500" : "text-gray-500"}
                hover:bg-black/40 hover:text-gray-300 transition-all duration-200
                ${isCollapsed ? "justify-center w-10 mx-auto" : ""}`}
            >
              <span className={`${isCollapsed ? "" : "mr-3"}`}>
                {icons["Settings"] ? (
                  React.createElement(icons["Settings"], {
                    className: `w-[22px] h-[22px] ${pathname === "/pages/settings" ? "text-red-500" : ""}`,
                  })
                ) : (
                  <div className="w-[22px] h-[22px] flex items-center justify-center text-gray-500">⚙️</div>
                )}
              </span>
              {!isCollapsed && <span className="text-sm font-medium">Settings</span>}
              
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2.5 py-1.5 bg-gray-950 text-gray-200
                  text-sm rounded-lg opacity-0 group-hover:opacity-100 transform translate-x-2
                  group-hover:translate-x-0 pointer-events-none group-hover:pointer-events-auto
                  transition-all duration-200 whitespace-nowrap z-50 shadow-lg">
                  Settings
                </div>
              )}
            </Link>
          </div>
        </div>
      </aside>

      <HorizontalNav pathname={pathname} />
    </>
  );
}

const NavItem = ({ link, isActive, isCollapsed }: { 
  link: NavLink; 
  isActive: boolean; 
  isCollapsed: boolean;
}) => {
  const iconName = link.icon;
  
  return (
    <li className="relative group">
      <Link
        href={link.href}
        className={`flex items-center px-3 py-2.5 rounded-xl transition-all duration-200
          ${isActive ? "bg-red-950/30 text-red-500" : "text-gray-500 hover:bg-black/40 hover:text-gray-300"}
          ${isCollapsed ? "justify-center w-10 mx-auto" : ""}
        `}
      >
        <span className={`${isCollapsed ? "" : "mr-3"}`}>
          {icons[iconName] ? (
            React.createElement(icons[iconName], {
              className: `w-[22px] h-[22px] transition-colors duration-200 ${isActive ? "text-red-500" : ""}`,
              "aria-hidden": "true",
            })
          ) : (
            <div className="w-[22px] h-[22px] bg-gray-800 rounded-md" />
          )}
        </span>
        {!isCollapsed && <span className="text-sm font-medium">{link.name}</span>}

        {isCollapsed && (
          <div className="absolute left-full ml-2 px-2.5 py-1.5 bg-gray-950 text-gray-200 text-sm rounded-lg
            opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0
            pointer-events-none group-hover:pointer-events-auto
            transition-all duration-200 whitespace-nowrap z-50 shadow-lg">
            {link.name}
          </div>
        )}
      </Link>
      {isActive && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-red-500 rounded-full transform origin-center
          transition-transform duration-200" />
      )}
    </li>
  );
};

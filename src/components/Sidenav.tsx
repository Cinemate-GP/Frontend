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
export default function Sidenav() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    dispatch(toggleSidenave(isCollapsed));
  };

  const renderLinks = (links: NavLink[], pathname: string) => {
    return links.map((link) => {
      const iconName = link.icon;
      const isActive = pathname === link.href;

      return (
        <li key={link.name} className="relative group">
          <Link
            href={link.href}
            className={`flex items-center px-4 py-3 hover:bg-gray-700 rounded-lg transition-all duration-200 ${
              isActive ? "bg-gray-700 text-red-600" : "text-gray-400"
            } ${isCollapsed ? "justify-center" : ""}`}
          >
            <span
              className={`${
                isCollapsed ? "" : "mr-3"
              } transition-all duration-200`}
            >
              {icons[iconName] ? (
                React.createElement(icons[iconName], {
                  className: "w-5 h-5",
                  "aria-hidden": "true",
                })
              ) : (
                <div className="w-5 h-5 bg-gray-600 rounded-sm"></div>
              )}
            </span>
            {!isCollapsed && <span>{link.name}</span>}

            {isCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-black text-gray-300 text-sm rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50">
                {link.name}
              </div>
            )}
          </Link>
          {isActive && !isCollapsed && (
            <div className="absolute left-0 top-0 w-1 h-full bg-red-600 rounded-r"></div>
          )}
        </li>
      );
    });
  };

  return (
    <>
      <div
        className={`h-screen text-gray-300 bg-black border-r fixed z-50 border-gray-600 flex flex-col ${
          isCollapsed ? "w-[4rem]" : "w-[13rem]"
        } hidden md:flex`}
      >
        <div className="flex items-center justify-between px-4 py-5 border-b border-gray-600">
          <Link
            href={"/pages"}
            className={`flex items-center ${
              isCollapsed ? "justify-center w-full" : ""
            }`}
          >
            <Image
              src="/logo.png"
              width={isCollapsed ? 40 : 50}
              height={isCollapsed ? 40 : 50}
              priority
              alt="logo"
              className="object-contain"
            />
            {!isCollapsed && (
              <span className="ml-2 font-bold text-lg">
                Cine<span className="text-red-600">Mate</span>
              </span>
            )}
          </Link>

          <button
            onClick={toggleSidebar}
            className={`text-gray-500 hover:text-gray-300 focus:outline-none transition-all duration-200 ${
              isCollapsed ? "hidden" : "block"
            }`}
          >
            {<span>←</span>}
          </button>

          {isCollapsed && (
            <button
              onClick={toggleSidebar}
              className="absolute -right-3 top-10 bg-black border border-gray-600 rounded-full p-1 text-gray-500 hover:text-gray-300 focus:outline-none"
            >
              {<span>→</span>}
            </button>
          )}
        </div>

        <div className="flex-1 py-4 px-3 w-full">
          <div className={`mb-4 ${isCollapsed ? "px-0" : "px-2"}`}>
            <ul className="space-y-1">{renderLinks(mainLinks, pathname)}</ul>
          </div>
        </div>

        <div
          className={`mt-auto border-t border-gray-600 p-3 ${
            isCollapsed ? "flex justify-center" : ""
          }`}
        >
          <div
            className={`flex ${
              isCollapsed ? "flex-col" : "items-center justify-between"
            } gap-2`}
          >
            <Link
              href="/pages/profile"
              className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-700 transition-all duration-200 group"
            >
              <div className="relative">
                {icons["Profile"] ? (
                  React.createElement(icons["Profile"], {
                    className: "w-6 h-6 text-gray-400",
                  })
                ) : (
                  <div className="w-6 h-6 flex items-center justify-center text-gray-400">
                    👤
                  </div>
                )}
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-red-600 rounded-full"></div>
              </div>
              {!isCollapsed && <span className="ml-2 text-sm">Profile</span>}

              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-black text-gray-300 text-sm rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50">
                  Profile
                </div>
              )}
            </Link>

            <Link
              href="/pages/settings"
              className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-700 transition-all duration-200 group"
            >
              {icons["Settings"] ? (
                React.createElement(icons["Settings"], {
                  className: "w-6 h-6 text-gray-400",
                })
              ) : (
                <div className="w-6 h-6 flex items-center justify-center text-gray-400">
                  ⚙️
                </div>
              )}
              {!isCollapsed && <span className="ml-2 text-sm">Settings</span>}

              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-black text-gray-300 text-sm rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50">
                  Settings
                </div>
              )}
            </Link>
          </div>
        </div>
      </div>

      <HorizontalNav pathname={pathname} />
    </>
  );
}

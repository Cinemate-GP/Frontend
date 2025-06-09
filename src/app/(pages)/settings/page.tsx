"use client";
import { useState } from "react";
import AccountSettings from "@/components/settings/AccountSettings";
import AppearanceSettings from "@/components/settings/Appearance";
import DeleteAccount from "@/components/settings/DeleteAccount";
import NotificationSettings from "@/components/settings/NotificationSettings";
import PrivacyAndSecurity from "@/components/settings/PrivacyAndSecurity";
import ProfileEditor from "@/components/settings/ProfileEditor";
import { FaUserCircle } from "react-icons/fa";
import {
  IoSettingsSharp,
  IoNotifications,
  IoShieldCheckmark,
} from "react-icons/io5";
import { MdOutlineColorLens } from "react-icons/md";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: <FaUserCircle size={18} /> },
    { id: "account", label: "Account", icon: <IoSettingsSharp size={18} /> },
    {
      id: "appearance",
      label: "Appearance",
      icon: <MdOutlineColorLens size={18} />,
    },
    {
      id: "privacy",
      label: "Privacy & Security",
      icon: <IoShieldCheckmark size={18} />,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: <IoNotifications size={18} />,
    },
  ];
  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 pt-32 pb-20 text-foreground">
      <h1 className="text-2xl sm:text-3xl text-foreground font-bold mb-6 sm:mb-8">
        Settings
      </h1>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Sidebar - Tab Navigation */}
        <div className="md:w-56 md:mb-0 rounded-xl shadow-md bg-secondaryBg">
          {/* Mobile tabs - horizontal scrollable */}
          <div className="md:hidden flex overflow-x-auto py-2 px-2 scrollbar-hidden space-x-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 shrink-0 px-4 py-2.5 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? "bg-hoverBg "
                    : "text-gray-500 hover:bg-hoverBg hover:text-textMuted"
                }`}
              >
                <span
                  className={
                    activeTab === tab.id ? "text-primary" : "text-gray-500"
                  }
                >
                  {tab.icon}
                </span>
                <span className="whitespace-nowrap">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Desktop tabs - vertical */}
          <div className="hidden md:block space-y-1.5 p-0  sm:p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg duration-200 transition-colors ${
                  activeTab === tab.id
                    ? "bg-hoverBg"
                    : "text-gray-500 hover:bg-hoverBg hover:text-textMuted"
                }`}
              >
                <span
                  className={`${
                    activeTab === tab.id ? "text-primary" : "text-gray-500"
                  }`}
                >
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <span className="ml-auto w-1.5 h-5 bg-primary rounded-full"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Content based on active tab */}
          {activeTab === "profile" && <ProfileEditor />}
          {activeTab === "account" && (
            <>
              <AccountSettings />
              <div className="mt-6">
                <DeleteAccount />
              </div>
            </>
          )}
          {activeTab === "appearance" && <AppearanceSettings />}
          {activeTab === "privacy" && <PrivacyAndSecurity />}
          {activeTab === "notifications" && <NotificationSettings />}
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import AccountSettings from "@/components/settings/AccountSettings";
import AppearanceSettings from "@/components/settings/Appearance";
import DeleteAccount from "@/components/settings/DeleteAccount";
import NotificationSettings from "@/components/settings/NotificationSettings";
import PrivacyAndSecurity from "@/components/settings/PrivacyAndSecurity";
import ProfileEditor from "@/components/settings/ProfileEditor";
import { FaUserCircle } from "react-icons/fa";
import { IoSettingsSharp, IoNotifications, IoShieldCheckmark } from "react-icons/io5";
import { MdOutlineColorLens } from "react-icons/md";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  
  const tabs = [
    { id: "profile", label: "Profile", icon: <FaUserCircle size={18} /> },
    { id: "account", label: "Account", icon: <IoSettingsSharp size={18} /> },
    { id: "appearance", label: "Appearance", icon: <MdOutlineColorLens size={18} /> },
    { id: "privacy", label: "Privacy & Security", icon: <IoShieldCheckmark size={18} /> },
    { id: "notifications", label: "Notifications", icon: <IoNotifications size={18} /> },
  ];
  
  return (
    <div className="px-4 sm:px-6 text-white max-w-7xl mx-auto mt-[5rem] mb-20">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Settings</h1>

      <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
        {/* Sidebar - Tab Navigation */}
        <div className="md:w-64 mb-6 md:mb-0">
          {/* Mobile tabs - horizontal scrollable */}
          <div className="md:hidden flex overflow-x-auto pb-3 scrollbar-hidden space-x-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 shrink-0 px-4 py-2.5 rounded-lg transition-colors ${
                  activeTab === tab.id
                  ? "bg-gradient-to-r from-red-600/20 to-red-800/40 text-white" 
                  : "bg-zinc-800/50 text-gray-300 hover:text-gray-200"
                }`}
              >
                <span className={activeTab === tab.id ? "text-primary" : "text-gray-500"}>
                  {tab.icon}
                </span>
                <span className="whitespace-nowrap">{tab.label}</span>
              </button>
            ))}
          </div>
          
          {/* Desktop tabs - vertical */}
          <div className="hidden md:block space-y-1.5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                  ? "bg-gradient-to-r from-red-600/20 to-red-800/40 text-white"
                  : "text-gray-400 hover:bg-zinc-800/70 hover:text-gray-200"
                }`}
              >
                <span className={`${activeTab === tab.id ? "text-primary" : "text-gray-500"}`}>
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

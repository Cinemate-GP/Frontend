"use client";
import React, { useState } from "react";
import { IoShieldCheckmark } from "react-icons/io5";
import { MdHistory, MdFavorite, MdVisibility, MdVisibilityOff, MdManageAccounts } from "react-icons/md";
import SwitchButton from "../ui/SwitchButton";
import Link from "next/link";

const PrivacyAndSecurity = () => {
  const [privateProfile, setPrivateProfile] = useState(false);
  const [hideWatchHistory, setHideWatchHistory] = useState(false);
  const [hideActivity, setHideActivity] = useState(false);
  
  return (
    <div className="bg-zinc-900 p-4 sm:p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 sm:mb-6 text-white flex items-center gap-2">
        <IoShieldCheckmark className="text-red-500" />
        Privacy & Security
      </h2>
      
      <div className="space-y-4 sm:space-y-5">
        <div className="flex items-center justify-between py-3 border-b border-zinc-800">
          <div className="flex items-start sm:items-center gap-2 sm:gap-3">
            <MdVisibility className="text-gray-400 mt-0.5 sm:mt-0 flex-shrink-0" size={20} />
            <div>
              <p className="text-gray-300 text-sm sm:text-base">Private Profile</p>
              <p className="text-xs text-gray-500">Only followers can see your activity</p>
            </div>
          </div>
          <SwitchButton status={privateProfile} setStatus={setPrivateProfile} />
        </div>
        
        <div className="flex items-center justify-between py-3 border-b border-zinc-800">
          <div className="flex items-start sm:items-center gap-2 sm:gap-3">
            <MdVisibilityOff className="text-gray-400 mt-0.5 sm:mt-0 flex-shrink-0" size={20} />
            <div>
              <p className="text-gray-300 text-sm sm:text-base">Hide Watch History</p>
              <p className="text-xs text-gray-500">Keep your watched movies private</p>
            </div>
          </div>
          <SwitchButton status={hideWatchHistory} setStatus={setHideWatchHistory} />
        </div>
        
        <div className="flex items-center justify-between py-3 border-b border-zinc-800">
          <div className="flex items-start sm:items-center gap-2 sm:gap-3">
            <MdVisibilityOff className="text-gray-400 mt-0.5 sm:mt-0 flex-shrink-0" size={20} />
            <div>
              <p className="text-gray-300 text-sm sm:text-base">Hide Activity</p>
              <p className="text-xs text-gray-500">Hide your activity from the public feed</p>
            </div>
          </div>
          <SwitchButton status={hideActivity} setStatus={setHideActivity} />
        </div>
        
        <div className="pt-4 sm:pt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link 
            href="/settings/manage-history"
            className="flex items-center justify-center gap-2 py-2.5 sm:py-3 px-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors text-sm sm:text-base"
          >
            <MdHistory size={18} className="flex-shrink-0" />
            <span>Manage Watch History</span>
          </Link>
          
          <Link
            href="/settings/manage-likes"
            className="flex items-center justify-center gap-2 py-2.5 sm:py-3 px-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors text-sm sm:text-base"
          >
            <MdFavorite size={18} className="flex-shrink-0" />
            <span>Manage Liked Movies</span>
          </Link>
        </div>
        
        <div className="pt-2">
          <Link
            href="/settings/manage-account"
            className="w-full flex items-center justify-center gap-2 py-2.5 sm:py-3 px-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors text-sm sm:text-base"
          >
            <MdManageAccounts size={18} className="flex-shrink-0" />
            <span>Manage Account Permissions</span>
          </Link>
        </div>

        <div className="pt-4 mt-2">
          <button
            className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg transition-colors flex items-center justify-center text-sm sm:text-base"
          >
            Save Privacy Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyAndSecurity;

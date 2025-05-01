"use client";
import Image from "next/image";
import { useState } from "react";
import EditProfileModal from "./EditProfileModal";
import { useGetUser } from "@/hooks/useGetUser";

const ProfileHeader = () => {
  const user = useGetUser();
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <header className="relative flex flex-col sm:flex-row justify-between items-center gap-8 p-6 bg-zinc-900 rounded-xl border border-zinc-800 shadow-lg overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-800 via-red-600 to-red-800"></div>
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-red-900/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-red-900/5 rounded-full blur-3xl"></div>
        
        {/* Profile details container */}
        <div className="flex gap-6 items-center flex-wrap z-10 w-full sm:w-auto">
          {/* Avatar with red border glow effect */}
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500 to-red-800 blur-sm opacity-75"></div>
            <div className="relative border-2 border-red-500 p-1 rounded-full mx-auto sm:mx-0 bg-zinc-950">
              {user?.profilePic ? (
                <Image
                  src={user.profilePic}
                  alt="user profile"
                  width={100}
                  height={100}
                  className="w-16 h-16 sm:w-28 sm:h-28 rounded-full object-cover"
                />
              ) : (
                <Image
                  src="/ueser-placeholder.jpg"
                  alt="user profile"
                  width={100}
                  height={100}
                  className="w-16 h-16 sm:w-28 sm:h-28 rounded-full object-cover"
                />
              )}
            </div>
          </div>
          
          {/* User info */}
          <div className="flex flex-col items-center sm:items-start">
            <div className="flex items-center mx-auto sm:mx-0 mb-2">
              <h2 className="text-xl sm:text-3xl font-bold text-white">
                {user.fullName ? user.fullName : "User Name"}
              </h2>
            </div>
            
            <button
              onClick={() => setIsOpen(true)}
              className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 transition-all duration-300 rounded-full px-6 py-2 text-sm text-white font-medium flex items-center justify-center gap-1 hover:shadow-lg hover:shadow-red-900/20 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Stats with improved styling */}
        <ul className="flex gap-8 justify-center sm:justify-end bg-zinc-950/50 px-6 py-3 rounded-lg backdrop-blur-sm border border-zinc-800/50 w-full sm:w-auto mt-4 sm:mt-0">
          <li className="flex flex-col items-center">
            <span className="text-lg sm:text-2xl font-bold text-white">80</span>
            <span className="text-gray-400 text-sm">films</span>
          </li>
          <li className="flex flex-col items-center border-l border-zinc-700 pl-8">
            <span className="text-lg sm:text-2xl font-bold text-white">48</span>
            <span className="text-gray-400 text-sm">followers</span>
          </li>
          <li className="flex flex-col items-center border-l border-zinc-700 pl-8">
            <span className="text-lg sm:text-2xl font-bold text-white">56</span>
            <span className="text-gray-400 text-sm">following</span>
          </li>
        </ul>
      </header>

      {isOpen && <EditProfileModal onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default ProfileHeader;

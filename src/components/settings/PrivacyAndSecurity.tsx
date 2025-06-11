"use client";
import React, { useEffect, useState } from "react";
import { IoShieldCheckmark } from "react-icons/io5";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import SwitchButton from "../ui/SwitchButton";
import { authFetch } from "@/lib/api";

const PrivacyAndSecurity = () => {
  const [privateProfile, setPrivateProfile] = useState<boolean>(false);
  const [hideActivity, setHideActivity] = useState<boolean>(false);

  // load initial status settings from API
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await authFetch("/api/Profile/privacy");
        if (!response.ok) {
          throw new Error("Failed to fetch settings");
        }
        const data = await response.json();
        setPrivateProfile(data.isEnableFollowerAndFollowing);
        setHideActivity(data.isEnableRecentActivity);
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };
    fetchSettings();
  }, []);

  return (
    <div className="bg-secondaryBg p-4 sm:p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 sm:mb-6 text-foreground flex items-center gap-2">
        <IoShieldCheckmark className="text-primary" />
        Privacy & Security
      </h2>

      <div className="space-y-4 sm:space-y-5">
        <div className="flex items-center justify-between py-3 border-b border-border">
          <div className="flex items-start sm:items-center gap-2 sm:gap-3">
            <MdVisibility
              className="text-gray-400 mt-0.5 sm:mt-0 flex-shrink-0"
              size={20}
            />
            <div>
              <p className="text-textMuted text-sm sm:text-base">
                Private Profile
              </p>
              <p className="text-xs text-gray-400">
                Only followers can see your activity
              </p>
            </div>
          </div>
          <SwitchButton
            status={privateProfile}
            setStatus={setPrivateProfile}
            statusType="toggle-following"
          />
        </div>

        {/* <div className="flex items-center justify-between py-3 border-b border-border">
          <div className="flex items-start sm:items-center gap-2 sm:gap-3">
            <MdVisibilityOff className="text-gray-400 mt-0.5 sm:mt-0 flex-shrink-0" size={20} />
            <div>
              <p className="text-textMuted text-sm sm:text-base">Hide Watch History</p>
              <p className="text-xs text-gray-400">Keep your watched movies private</p>
            </div>
          </div>
          <SwitchButton status={hideWatchHistory} setStatus={setHideWatchHistory} />
        </div>
         */}
        <div className="flex items-center justify-between py-3 border-b border-border">
          <div className="flex items-start sm:items-center gap-2 sm:gap-3">
            <MdVisibilityOff
              className="text-gray-400 mt-0.5 sm:mt-0 flex-shrink-0"
              size={20}
            />
            <div>
              <p className="text-textMuted text-sm sm:text-base">
                Hide Activity
              </p>
              <p className="text-xs text-gray-400">
                Hide your activity from the public feed
              </p>
            </div>
          </div>
          <SwitchButton
            status={hideActivity}
            setStatus={setHideActivity}
            statusType="toggle-recent"
          />
        </div>
      </div>
    </div>
  );
};

export default PrivacyAndSecurity;

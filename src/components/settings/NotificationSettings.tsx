"use client";
import React, { useEffect, useState } from "react";
import { IoMdNotifications } from "react-icons/io";
import { MdMovie, MdFavorite } from "react-icons/md";
import SwitchButton from "../ui/SwitchButton";
import { authFetch } from "@/lib/api";

const NotificationSettings = () => {
  const [newReleases, setNewReleases] = useState(true);
  const [follow, setFollow] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await authFetch("/api/Profile/notify-privacy");
        if (!response.ok) {
          throw new Error("Failed to fetch settings");
        }
        const data = await response.json();
        setNewReleases(data.IsEnableNotificationNewRelease);
        setFollow(data.isEnableNotificationFollowing);
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };
    fetchSettings();
  }, []);

  return (
    <div className="bg-secondaryBg p-4 sm:p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 sm:mb-6 text-foreground flex items-center gap-2">
        <IoMdNotifications className="text-primary" />
        Notifications
      </h2>

      <div className="space-y-4 sm:space-y-5">
        <div className="pt-3">
          <h3 className=" mb-4 pb-2 border-b border-border text-sm sm:text-base font-medium">
            Notification Types
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                <MdMovie
                  className="text-gray-400 mt-0.5 sm:mt-0 flex-shrink-0"
                  size={20}
                />
                <div>
                  <p className="text-sm sm:text-base">New Releases</p>
                  <p className="text-xs text-gray-500">
                    Get notified about new movie releases
                  </p>
                </div>
              </div>
              <SwitchButton
                status={newReleases}
                setStatus={setNewReleases}
                statusType="toggle-notify-new-release"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                <MdFavorite
                  className="text-gray-400 mt-0.5 sm:mt-0 flex-shrink-0"
                  size={20}
                />
                <div>
                  <p className="text-sm sm:text-base">followers notification</p>
                  <p className="text-xs text-gray-500">
                    Get notified about my followers
                  </p>
                </div>
              </div>
              <SwitchButton
                status={follow}
                setStatus={setFollow}
                statusType="toggle-notify-following"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;

"use client";
import React, { useState } from "react";
import { IoMdNotifications } from "react-icons/io";
import { MdEmail, MdDevices, MdMovie, MdFavorite } from "react-icons/md";
import SwitchButton from "../ui/SwitchButton";

const NotificationSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [newReleases, setNewReleases] = useState(true);
  const [activityUpdates, setActivityUpdates] = useState(true);
  const [friendActivity, setFriendActivity] = useState(true);

  return (
    <div className="bg-secondaryBg p-4 sm:p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 sm:mb-6 text-foreground flex items-center gap-2">
        <IoMdNotifications className="text-primary" />
        Notifications
      </h2>

      <div className="space-y-4 sm:space-y-5">
        <div className="flex items-center justify-between py-3 border-b border-border">
          <div className="flex items-start sm:items-center gap-2 sm:gap-3">
            <MdEmail className="text-gray-400 mt-0.5 sm:mt-0 flex-shrink-0" size={20} />
            <div>
              <p className="text-sm sm:text-base">Email Notifications</p>
              <p className="text-xs text-gray-500">Receive updates via email</p>
            </div>
          </div>
          <SwitchButton status={emailNotifications} setStatus={setEmailNotifications} />
        </div>

        <div className="flex items-center justify-between py-3 border-b border-border">
          <div className="flex items-start sm:items-center gap-2 sm:gap-3">
            <MdDevices className="text-gray-400 mt-0.5 sm:mt-0 flex-shrink-0" size={20} />
            <div>
              <p className="text-sm sm:text-base">Push Notifications</p>
              <p className="text-xs text-gray-500">Receive updates on your devices</p>
            </div>
          </div>
          <SwitchButton status={pushNotifications} setStatus={setPushNotifications} />
        </div>

        <div className="pt-3">
          <h3 className=" mb-4 pb-2 border-b border-border text-sm sm:text-base font-medium">Notification Types</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                <MdMovie className="text-gray-400 mt-0.5 sm:mt-0 flex-shrink-0" size={20} />
                <div>
                  <p className="text-sm sm:text-base">New Releases</p>
                  <p className="text-xs text-gray-500">Get notified about new movie releases</p>
                </div>
              </div>
              <SwitchButton status={newReleases} setStatus={setNewReleases} />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-gray-400 mt-0.5 sm:mt-0 flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <div>
                  <p className="text-sm sm:text-base">Activity Updates</p>
                  <p className="text-xs text-gray-500">Get notified about your activity</p>
                </div>
              </div>
              <SwitchButton status={activityUpdates} setStatus={setActivityUpdates} />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                <MdFavorite className="text-gray-400 mt-0.5 sm:mt-0 flex-shrink-0" size={20} />
                <div>
                  <p className="text-sm sm:text-base">Friend Activity</p>
                  <p className="text-xs text-gray-500">Get notified about friends activity</p>
                </div>
              </div>
              <SwitchButton status={friendActivity} setStatus={setFriendActivity} />
            </div>
          </div>
        </div>

        <div className="pt-4 mt-4">
          <button
            className="w-full py-2.5 sm:py-3 bg-gradient-to-r  bg-primary text-white rounded-lg transition-colors flex items-center justify-center text-sm sm:text-base"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;

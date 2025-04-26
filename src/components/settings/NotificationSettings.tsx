"use client";
import React, { useState } from "react";
import SwitchButton from "../SwitchButton";

const NotificationSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);
  return (
    <div className="mb-6 bg-black p-4 rounded-lg border border-gray-950/60">
      <h2 className="text-xl font-semibold mb-3 text-gray-200">Notifications</h2>
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-300">Email Notifications</span>
        <SwitchButton
          status={emailNotifications}
          setStatus={setEmailNotifications}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-gray-300">Push Notifications</span>
        <SwitchButton
          status={pushNotifications}
          setStatus={setPushNotifications}
        />
      </div>
    </div>
  );
};

export default NotificationSettings;

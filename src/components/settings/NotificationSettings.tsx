"use client";
import React, { useState } from "react";
import SwitchButton from "../SwitchButton";

const NotificationSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);
  return (
    <div className="mb-6 bg-gray-800 p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-3">Notifications</h2>
      <div className="flex items-center justify-between mb-2">
        <span>Email Notifications</span>
        <SwitchButton
          status={emailNotifications}
          setStatus={setEmailNotifications}
        />
      </div>
      <div className="flex items-center justify-between">
        <span>Push Notifications</span>
        <SwitchButton
          status={pushNotifications}
          setStatus={setPushNotifications}
        />
      </div>
    </div>
  );
};

export default NotificationSettings;

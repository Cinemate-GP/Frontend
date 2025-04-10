'use client'
import React, { useState } from "react";
import SwitchButton from "../SwitchButton";

const AppearanceSettings = () => {
  const [darkMode, setDarkMode] = useState(true);
  return (
    <div className="mb-6 bg-gray-800 p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-3">Appearance</h2>
      <div className="flex items-center justify-between">
        <span>Dark Mode</span>
        <SwitchButton status={darkMode} setStatus={setDarkMode} />
      </div>
    </div>
  );
};

export default AppearanceSettings;

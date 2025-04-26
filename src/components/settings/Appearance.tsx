'use client'
import React, { useState } from "react";
import SwitchButton from "../SwitchButton";

const AppearanceSettings = () => {
  const [darkMode, setDarkMode] = useState(true);
  return (
    <div className="mb-6 bg-black p-4 rounded-lg border border-gray-950/60">
      <h2 className="text-xl font-semibold mb-3 text-gray-200">Appearance</h2>
      <div className="flex items-center justify-between">
        <span className="text-gray-300">Dark Mode</span>
        <SwitchButton status={darkMode} setStatus={setDarkMode} />
      </div>
    </div>
  );
};

export default AppearanceSettings;

'use client';
import React, { useState } from "react";
import { MdOutlineDarkMode, MdOutlineColorLens, MdOutlineMonitor } from "react-icons/md";
import SwitchButton from "../SwitchButton";

const AppearanceSettings = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [autoTheme, setAutoTheme] = useState(false);
  const [selectedAccent, setSelectedAccent] = useState("red");

  const accentColors = [
    { name: "Red", value: "red" },
    { name: "Blue", value: "blue" },
    { name: "Green", value: "green" },
    { name: "Purple", value: "purple" },
    { name: "Orange", value: "orange" }
  ];

  const handleAccentChange = (value: string) => {
    setSelectedAccent(value);
  };

  return (
    <div className="bg-zinc-900 p-4 sm:p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 sm:mb-6 text-white flex items-center gap-2">
        <MdOutlineColorLens className="text-red-500" />
        Appearance
      </h2>
      
      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center justify-between py-2 border-b border-zinc-800">
          <div className="flex items-center gap-2 sm:gap-3">
            <MdOutlineDarkMode className="text-gray-400 flex-shrink-0" size={20} />
            <span className="text-gray-300 text-sm sm:text-base">Dark Mode</span>
          </div>
          <SwitchButton status={darkMode} setStatus={setDarkMode} />
        </div>

        <div className="flex items-center justify-between py-2 border-b border-zinc-800">
          <div className="flex items-center gap-2 sm:gap-3">
            <MdOutlineMonitor className="text-gray-400 flex-shrink-0" size={20} />
            <span className="text-gray-300 text-sm sm:text-base">Use System Theme</span>
          </div>
          <SwitchButton status={autoTheme} setStatus={setAutoTheme} />
        </div>

        <div className="py-2">
          <div className="flex items-center gap-2 sm:gap-3 mb-3">
            <MdOutlineColorLens className="text-gray-400 flex-shrink-0" size={20} />
            <label className="block text-gray-300 text-sm sm:text-base">Accent Color</label>
          </div>
          
          <div className="flex flex-wrap gap-3 sm:gap-4">
            {accentColors.map((color) => (
              <button
                key={color.value}
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-transform ${
                  selectedAccent === color.value 
                    ? 'border-white scale-110' 
                    : 'border-transparent'
                }`}
                style={{ 
                  backgroundColor: color.value === 'red' ? '#dc2626' : 
                                  color.value === 'blue' ? '#2563eb' : 
                                  color.value === 'green' ? '#16a34a' : 
                                  color.value === 'purple' ? '#9333ea' : 
                                  '#f97316' 
                }}
                onClick={() => handleAccentChange(color.value)}
                aria-label={`Select ${color.name} accent color`}
              >
                {selectedAccent === color.value && (
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor" 
                    className="w-5 h-5 text-white"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4">
          <button
            className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg transition-colors flex items-center justify-center"
          >
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppearanceSettings;

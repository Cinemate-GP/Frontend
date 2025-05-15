"use client";
import React, { useEffect, useState } from "react";
import {
  MdOutlineDarkMode,
  MdOutlineColorLens,
  MdOutlineMonitor,
} from "react-icons/md";
import SwitchButton from "../ui/SwitchButton";
import { accentColors } from "@/constants";
import {
  setPrimaryColor,
  setSystemTheme,
  setThemeMode,
} from "@/redux/slices/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const AppearanceSettings = () => {
  const { primaryColor, themeMode, themePreference } = useSelector(
    (state: RootState) => state.accentColor
  );

  const dispatch = useDispatch();

  const [autoTheme, setAutoTheme] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [selectedAccent, setSelectedAccent] = useState(primaryColor);

  // ✅ Sync local state with Redux store on load
  useEffect(() => {
    setAutoTheme(themePreference === "system");
    setIsDark(themeMode === "dark");
    setSelectedAccent(primaryColor);
  }, [themeMode, themePreference, primaryColor]);

  const handleAccentChange = (value: string) => {
    setSelectedAccent(value);
  };

  const saveChanges = () => {
    dispatch(setPrimaryColor(selectedAccent));

    if (autoTheme) {
      dispatch(setSystemTheme(true)); // system
    } else {
      dispatch(setThemeMode(isDark ? "dark" : "light")); // manual + mode
      dispatch(setSystemTheme(false));
    }
  };

  return (
    <div className="bg-secondaryBg p-4 sm:p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 sm:mb-6 text-foreground flex items-center gap-2">
        <MdOutlineColorLens className="text-primary" />
        Appearance
      </h2>

      <div className="space-y-4 sm:space-y-6">
        {/* Dark Mode */}
        <div className="flex items-center justify-between py-2 border-b border-border">
          <div className="flex items-center gap-2 sm:gap-3">
            <MdOutlineDarkMode
              className="text-gray-400 flex-shrink-0"
              size={20}
            />
            <span className="text-foreground text-sm sm:text-base">
              Dark Mode
            </span>
          </div>
          <SwitchButton status={isDark} setStatus={setIsDark} disabled={autoTheme} />
        </div>

        {/* System Theme */}
        <div className="flex items-center justify-between py-2 border-b border-border">
          <div className="flex items-center gap-2 sm:gap-3">
            <MdOutlineMonitor
              className="text-gray-400 flex-shrink-0"
              size={20}
            />
            <span className="text-foreground text-sm sm:text-base">
              Use System Theme
            </span>
          </div>
          <SwitchButton status={autoTheme} setStatus={setAutoTheme} />
        </div>

        {/* Accent Color */}
        <div className="py-2">
          <div className="flex items-center gap-2 sm:gap-3 mb-3">
            <MdOutlineColorLens
              className="text-gray-400 flex-shrink-0"
              size={20}
            />
            <label className="block text-textMuted text-sm sm:text-base">
              Accent Color
            </label>
          </div>

          <div className="flex flex-wrap gap-3 sm:gap-4">
            {accentColors.map((color) => (
              <button
                key={color.name}
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-transform ${
                  selectedAccent === color.value
                    ? "border-gray-400 scale-110"
                    : "border-transparent"
                }`}
                style={{ backgroundColor: color.value }}
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

        {/* Save Button */}
        <div className="pt-4">
          <button
            type="button"
            onClick={saveChanges}
            className="w-full py-2.5 sm:py-3 bg-primary text-white rounded-lg transition-colors flex items-center justify-center"
          >
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppearanceSettings;

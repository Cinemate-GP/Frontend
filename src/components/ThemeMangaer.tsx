"use client";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function ThemeManager() {
  const primaryColor = useSelector((state: RootState) => state.accentColor.primaryColor);

  useEffect(() => {
    if (primaryColor) {
      document.documentElement.style.setProperty("--primary", primaryColor);
    }
  }, [primaryColor]);

  return null;
}

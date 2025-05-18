"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hydrateThemeFromLocalStorage } from "@/redux/slices/themeSlice";
import { RootState } from "@/redux/store";

export default function ThemeManager() {
  const dispatch = useDispatch();
  const { primaryColor, themeMode } = useSelector(
    (state: RootState) => state.theme
  );

  useEffect(() => {
    dispatch(hydrateThemeFromLocalStorage());
  }, [dispatch]);

  useEffect(() => {
    document.documentElement.style.setProperty("--primary", primaryColor);
    document.documentElement.setAttribute("data-theme", themeMode);
  }, [primaryColor, themeMode]);

  return null;
}

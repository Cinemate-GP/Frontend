import { createSlice } from "@reduxjs/toolkit";

const defaultColor = "#dc2626";

export interface ThemeState {
  primaryColor: string;
  themeMode: "dark" | "light";
  themePreference: "manual" | "system";
}

// ✅ Server-safe initial state
const initialState: ThemeState = {
  primaryColor: defaultColor,
  themeMode: "dark",
  themePreference: "manual",
};

const accentColorSlice = createSlice({
  name: "accentColor",
  initialState,
  reducers: {
    setPrimaryColor: (state, action) => {
      state.primaryColor = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("accentColor", action.payload);
      }
    },
    setThemeMode: (state, action) => {
      const newMode = action.payload;
      state.themeMode = newMode;
      state.themePreference = "manual";
      if (typeof window !== "undefined") {
        localStorage.setItem("themeMode", newMode);
        localStorage.setItem("themePreference", "manual");
      }
    },
    setSystemTheme: (state, action) => {
      const isSystem = action.payload;
      state.themePreference = isSystem ? "system" : "manual";
      if (typeof window !== "undefined") {
        localStorage.setItem("themePreference", state.themePreference);
      }
    },
    switchMode: (state) => {
      const newMode = state.themeMode === "dark" ? "light" : "dark";
      state.themeMode = newMode;
      state.themePreference = "manual";
      if (typeof window !== "undefined") {
        localStorage.setItem("themeMode", newMode);
        localStorage.setItem("themePreference", "manual");
      }
    },
    // ✅ Hydrate state from localStorage (only called on client side)
    hydrateThemeFromLocalStorage: (state) => {
      if (typeof window !== "undefined") {
        const storedColor = localStorage.getItem("accentColor") || defaultColor;
        const storedPref = localStorage.getItem("themePreference"); // manual/system
        const storedManual = localStorage.getItem("themeMode");

        const systemMode = window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";

        const finalMode =
          storedPref === "manual" && storedManual
            ? storedManual
            : storedPref === "system"
            ? systemMode
            : "dark";

        state.primaryColor = storedColor;
        state.themeMode = finalMode as "dark" | "light";
        state.themePreference = storedPref === "system" ? "system" : "manual";
      }
    },
  },
});

export const {
  setPrimaryColor,
  setThemeMode,
  setSystemTheme,
  switchMode,
  hydrateThemeFromLocalStorage,
} = accentColorSlice.actions;

export default accentColorSlice.reducer;

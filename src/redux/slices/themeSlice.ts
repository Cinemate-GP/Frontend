// accentColorSlice.js
import { createSlice } from '@reduxjs/toolkit';

const defaultColor = '#dc2626'; // fallback

// Avoid accessing localStorage on server
const getInitialAccentColor = (): string => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accentColor') || defaultColor;
  }
  return defaultColor;
};

const initialState = {
  primaryColor: getInitialAccentColor(), // default color
};

const accentColorSlice = createSlice({
  name: 'accentColor',
  initialState,
  reducers: {
    setPrimaryColor: (state, action) => {
      state.primaryColor = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('accentColor', action.payload);
      }
    },
  },
});

export const { setPrimaryColor } = accentColorSlice.actions;
export default accentColorSlice.reducer;

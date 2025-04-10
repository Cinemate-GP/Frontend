import { createSlice } from "@reduxjs/toolkit";

const initialState: { name: string | null; profileImage: string | null } = {
  name: null,
  profileImage: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.profileImage = action.payload.profileImage;
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
    },
    clearUser: (state) => {
      state.name = null;
      state.profileImage = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

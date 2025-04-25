import { createSlice } from "@reduxjs/toolkit";

const initialState: { name: string | null; profilePic: string | null } = {
  name: null,
  profilePic: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.profilePic = action.payload.profilePic;
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload));
        setUser(JSON.parse(localStorage.getItem("user") || "{}"))
      }
    },
    clearUser: (state) => {
      state.name = null;
      state.profilePic = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

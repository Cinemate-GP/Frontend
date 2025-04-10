import { createSlice } from "@reduxjs/toolkit";

const initialState : { isCollapsed: boolean } = {
    isCollapsed: false,
};


const sidebarSlice = createSlice({
    name: "sidenave",
    initialState,
    reducers: {
        toggleSidenave: (state, action) => {
        state.isCollapsed = !action.payload
        },
    },
});

export const { toggleSidenave } = sidebarSlice.actions;
export default sidebarSlice.reducer;
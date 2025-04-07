import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  screensize:{
    width: window.innerWidth,
    isMobile: window.innerWidth < 768,
    isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
    isLaptop: window.innerWidth >= 1024 && window.innerWidth < 1440,
    isDesktop: window.innerWidth >= 1440
  }
};

const Slice = createSlice({
  name: "lightdark",
  initialState,
  reducers: {
    toggleLightDark: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

const store = configureStore({
  reducer: {
    lightdark: Slice.reducer,
  },
});

export const { toggleLightDark } = Slice.actions;
export default store;

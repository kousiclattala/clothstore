import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  selected: "home",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUserSelected: (state, action) => {
      state.selected = action.payload;
    },
  },
});

export const { setIsLoading, setUserSelected } = authSlice.actions;

export default authSlice.reducer;

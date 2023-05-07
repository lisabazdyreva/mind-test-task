import { createSlice } from "@reduxjs/toolkit";

export interface AppState {
  cart: [];
}

const initialState: AppState = {
  cart: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    getCart: (state) => {
      state.cart;
    },
  },
});

export const { getCart } = appSlice.actions;

export default appSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { decryptData } from "../../../utils/helpers";

const initialState = {
  user: localStorage.getItem("user")
    ? decryptData(localStorage.getItem("user"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
    },
    logOut: (state) => {
      state.user = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

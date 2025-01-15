import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      toast.success(
        `Wellcome ${action.payload.username}, You are successfully logged in`
      );
    },
    loginFalure: (state) => {
      state.isFetching = false;
      state.error = true;
      toast.error(`Please enter correct email and password`);
    },
    logOut: (state) => {
      state.isFetching = false;
      state.currentUser = null;
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFalure, logOut } =
  userSlice.actions;

export default userSlice.reducer;

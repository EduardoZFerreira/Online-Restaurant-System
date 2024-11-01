import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null, roles: [] },
  reducers: {
    setCredentials: (state, action) => {
      const { user, token, roles } = action.payload;
      state.user = user;
      state.token = token;
      state.roles = roles;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.roles = [];
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: any) => state.auth.user;
export const selectCurrentToken = (state: any) => state.auth.token;
export const selectCurrentRoles = (state: any) => state.auth.roles;

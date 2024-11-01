import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { name: null, user: null, token: null, roles: [] },
  reducers: {
    setCredentials: (state, action) => {
      const { name, user, token, roles } = action.payload;
      state.name = name;
      state.user = user;
      state.token = token;
      state.roles = roles;
    },
    logOut: (state) => {
      state.name = null;
      state.user = null;
      state.token = null;
      state.roles = [];
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentName = (state: any) => state.auth.name;
export const selectCurrentUser = (state: any) => state.auth.user;
export const selectCurrentToken = (state: any) => state.auth.token;
export const selectCurrentRoles = (state: any) => state.auth.roles;

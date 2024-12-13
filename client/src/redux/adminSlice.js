// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   adminToken: sessionStorage.getItem("adminToken") || null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     adminLogin(state, action) {
//       state.adminToken = action.payload;
//       sessionStorage.setItem("adminToken", action.payload); // Save token to sessionStorage
//     },
//     adminLogout(state) {
//       state.adminToken = null;
//       sessionStorage.removeItem("adminToken"); // Clear token from sessionStorage
//     },
//   },
// });

// export const { adminLogin, adminLogout } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminToken: sessionStorage.getItem("adminToken") || null,  // We don't need to access sessionStorage here since redux-persist will handle it
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    adminLogin(state, action) {
      state.adminToken = action.payload;
      sessionStorage.setItem("adminToken", action.payload); 
    },
    adminLogout(state) {
      state.adminToken = null;
      sessionStorage.removeItem("adminToken");
    },
  },
});

export const { adminLogin, adminLogout } = authSlice.actions;
export default authSlice.reducer;

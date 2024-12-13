// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     userToken: sessionStorage.getItem("userToken") || null,
//     userData: sessionStorage.getItem("userData") || null,
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     userLogin(state, action) {
//       state.userToken = action.payload;
//       sessionStorage.setItem("userToken", action.payload); // Save token to sessionStorage
//     },
//     userLoginData(state, action) {
//         state.userData = action.payload;
//         sessionStorage.setItem("userData", action.payload); 
//     },
//     userLogout(state) {
//       state.userToken = null;
//       sessionStorage.removeItem("userToken"); // Clear token from sessionStorage
//     },
//   },
// });

// export const { userLogin, userLoginData, userLogout } = userSlice.actions;
// export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(sessionStorage.getItem("user")) || null, // Fetch from sessionStorage
  token: sessionStorage.getItem("token") || null, // Fetch token from sessionStorage
  isAuthenticated: Boolean(sessionStorage.getItem("token")), // Check if token exists
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      // Save user data and token to sessionStorage
      sessionStorage.setItem("user", JSON.stringify(state.user));
      sessionStorage.setItem("token", state.token);
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      // Remove user data and token from sessionStorage
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;


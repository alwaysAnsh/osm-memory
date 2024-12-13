import { configureStore } from '@reduxjs/toolkit'
import authReducer from './adminSlice.js'
import userReducer from './userSlice.js'

export default configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
})
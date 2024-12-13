import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default: localStorage
import userReducer from './userSlice.js'
import authReducer from './adminSlice.js'


const persistConfig = {
  key: "root",
  storage,
  debug: true,
  whitelist: ["user", "auth"], // Persist only the user slice
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    auth: persistedAuthReducer,

    
  },
});

export const persistor = persistStore(store);



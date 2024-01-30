import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";

const rootReducer = combineReducers({
  users: userReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReduer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReduer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

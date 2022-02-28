import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import carSlice from "./slices/carSlice";
import invoiceSlice from "./slices/invoiceSlice";

import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

const reducers = combineReducers({
  userSlice,
  carSlice,
  invoiceSlice,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

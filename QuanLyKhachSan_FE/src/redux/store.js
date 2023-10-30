import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import roleSlice from "./roleSlice";
import userSlice from "./userSlice";
import trangThaiDatPhongSlice from "./trangThaiDatPhongSlice";
import khachHangSlice from "./khachHangSlice";
import phongSlice from "./phongSlice";
import employeeSlice from "./employeeSlice";

const persistConfig = {
  key: "rootReducerConfig",
  storage,
  whitelist: ["employee", "phong", "khachHang", "trangThaiDat", "role", "user"],
  stateReconciler: hardSet,
};

const rootReducer = combineReducers({
  role: roleSlice,
  user: userSlice,
  trangThaiDat: trangThaiDatPhongSlice,
  khachHang: khachHangSlice,
  phong: phongSlice,
  employee: employeeSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false,
  }),
];

export const store = configureStore({
  reducer: persistedReducer,
  middleware,
});

export const persistor = persistStore(store);

export default store;

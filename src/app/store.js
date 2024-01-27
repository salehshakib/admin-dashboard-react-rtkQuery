import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import { userApi } from "./services/user/userServices";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: false,
    }).concat(userApi.middleware),
});
export default store;

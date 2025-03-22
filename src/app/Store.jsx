import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Feature/Auth/AuthSlice";
import productsReducer from "../Feature/Products/ProductSlice";
import usersReducer from "../Feature/User/UserSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: usersReducer,
    products: productsReducer,
  },
});

import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { navbarReducers } from "../features/navbar";
import { loginReducers } from "../features/login";

export const store = configureStore({
  reducer: {
    navbar: navbarReducers,
    login: loginReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

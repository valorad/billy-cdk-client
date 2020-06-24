import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { navbarReducers } from "../features/navbar";

export const store = configureStore({
  reducer: {
    navbar: navbarReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

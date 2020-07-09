import slice from "./loginSlice";
import { RootState } from "../../app/store";

// reducers for store configuration
export const loginReducers = slice.reducer;

// sync actions
export const { setLoginAsPlayer } = slice.actions;

// async actions

// get value from store
export const selectLoginAsPlayer = (state: RootState) => state.login.loginAsPlayer;
import slice from "./navbarSlice";
import { RootState } from "../../app/store";

// reducers for store configuration
export const navbarReducers = slice.reducer;

// sync actions
export const {setTitle, setDescription} = slice.actions;

// async actions

// get value from store
export const selectTitle = (state: RootState) => state.navbar.title;
export const selectDescription = (state: RootState) => state.navbar.description;
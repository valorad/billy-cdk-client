import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  title: "欢迎来到Billy CDKey"
};

export default createSlice({
  name: "navbar",
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    }
  }
});
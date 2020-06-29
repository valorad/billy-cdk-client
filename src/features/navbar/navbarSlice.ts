import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  title: "欢迎来到Billy CDKey",
  description: "高端黑框框版",
};

export default createSlice({
  name: "navbar",
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
  }
});
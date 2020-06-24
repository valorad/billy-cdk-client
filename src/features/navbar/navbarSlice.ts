import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  title: "title0"
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
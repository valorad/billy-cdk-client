import { t } from "@lingui/macro";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  title: t`Welcome to Billy CDKey!`,
  description: t`High-end Terminal Version`,
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
import { t } from "@lingui/macro";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player } from "../../models/player.interface";

const initialState = {
  loginAsPlayer: {
    dbname: "",
    name: t`My friend`,
    isPremium: false,
    games: [],
  } as Player
};

export default createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoginAsPlayer: (state, action: PayloadAction<Player>) => {
      state.loginAsPlayer = {...action.payload};
    },
  }
});
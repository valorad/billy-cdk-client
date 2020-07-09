import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player } from "../../models/player.interface";

const initialState = {
  loginAsPlayer: {
    dbname: "",
    name: "朋友",
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
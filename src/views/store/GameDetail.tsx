import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRoute } from "wouter";

import GameDetail from "../../components/game/detail";
import { setTitle, setDescription } from "../../features/navbar";
import { MenuItem } from "../../models/menu.interface";
import { Game } from "../../models/game.interface";


// import "./Dummy.scss";

export default () => {

  const params = useRoute("/store/games/:dbname")[1];

  let dbname = params?.dbname;

  const dispatch = useDispatch();

  const game: Game = {
    dbname: dbname || "Game of Non-existance",
    name: "某个游戏",
    price: 100,
  };

  const purchase = () => {
    console.log(`Purchase game ${game.dbname} for player "Billy" success`);
    return {
      ok: true,
      message: `Success`
    }
  };

  const updateGame = () => {
    console.log(`Modal dialog UPDATE shows up`);
    return {
      ok: true,
      message: `Success`
    }
  };

  const deleteGame = () => {
    console.log(`Modal dialog DELETE shows up`);
    return {
      ok: true,
      message: `Success`
    }
  };

  const menus: MenuItem[] = [
    {
      name: "为自己购买",
      activate: purchase,
    },
    {
      name: "修改游戏信息",
      activate: updateGame,
    },
    {
      name: "从商店删除",
      activate: deleteGame,
    },
  ];



  useEffect(() => {
    
    dispatch(setTitle(game.name));
    dispatch(setDescription(`dbname: ${game.dbname}`));
    
  });

  return (
    <section className="StoreGameDetail">
      {/* Each page must have at least 1 and only 1 menu */}
      <GameDetail game={game} menus={menus} />
    </section>
  );
};
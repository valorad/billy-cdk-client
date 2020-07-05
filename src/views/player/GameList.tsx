import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import GameList from "../../components/game/list";
import { setTitle, setDescription } from "../../features/navbar";
import { Game } from "../../models/game.interface";
import { useRoute } from "wouter";
import { Player } from "../../models/player.interface";

// import "./Dummy.scss";

export default () => {

  const params = useRoute("/players/dbname/:dbname/games")[1];

  let dbname = params?.dbname;

  const player: Player = {
    dbname: dbname || "Mr. Stranger",
    name: "Billy",
    bio: "我喜欢吃肯德基!",
    isPremium: true,
    games: [
      "game-tesV",
      "game-halfLifeAlyx"
    ],
  };

  const games: Game[] = [
    {
      dbname: "game-tesV",
      name: "题伊诶四威",
      description: "超大型奇幻bug游戏",
      price: 123,
    },
    {
      dbname: "game-halfLifeAlyx",
      name: "Half Life Alyx",
      description: "你可以用VR在白板上画一天",
      price: 321,
    }
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    
    dispatch(setTitle(`${player.name}的游戏`));
    dispatch(setDescription("选择一款游戏以查看详情"));
    
  });

  return (
    <section className="PlayerGameList">

      <GameList games={games} />
    </section>
  );
};
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import GameList from "../../components/game/list";
import { setTitle, setDescription } from "../../features/navbar";
import { Game } from "../../models/game.interface";

// import "./Dummy.scss";

export default () => {

  const dispatch = useDispatch();

  useEffect(() => {
    
    dispatch(setTitle("商店游戏列表"));
    dispatch(setDescription("选择一款游戏以查看详情"));
    
  });

  const games: Game[] = [
    {
      dbname: "starCraft3",
      name: "星海争霸3",
      description: "星海争霸3",
      price: 200,
    },
    {
      dbname: "happyDoudizhu",
      name: "欢乐斗地主",
      description: "欢乐斗地主 欢乐斗地主",
      price: 0,
    },
    {
      dbname: "superAdoKitt",
      name: "超萌小猫猫",
      description: "小猫猫",
      price: 100,
    },
  ];

  return (
    <section className="StoreGameList">

      <GameList games={games} />
    </section>
  );
};
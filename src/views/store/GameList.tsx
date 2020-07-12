import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import GameList from "../../components/game/list";
import { setTitle, setDescription } from "../../features/navbar";
import { useGameList } from "../../services/game";

// import "./Dummy.scss";

export default () => {

  const dispatch = useDispatch();
  const { isQueryLoading, queryError, games } = useGameList();

  useEffect(() => {
    
    dispatch(setTitle("商店游戏列表"));
    dispatch(setDescription("选择一款游戏以查看详情"));
    
  });

  // test data
  // const games: Game[] = [
  //   {
  //     dbname: "starCraft3",
  //     name: "星海争霸3",
  //     description: "星海争霸3",
  //     price: 200,
  //   },
  //   {
  //     dbname: "happyDoudizhu",
  //     name: "欢乐斗地主",
  //     description: "欢乐斗地主 欢乐斗地主",
  //     price: 0,
  //   },
  //   {
  //     dbname: "superAdoKitt",
  //     name: "超萌小猫猫",
  //     description: "小猫猫",
  //     price: 100,
  //   },
  // ];

  const placeGameList = () => {

    if (isQueryLoading) {
      return (
        <div className="statusInfo">
          <h1>载入中，请稍后...</h1>
        </div>
      );
    } else if (queryError || !games) {
      return (
        <div className="statusInfo">
          <h1>错误！无法进行查询。请联系管理员。</h1>
        </div>
      );
    } else if (games.length <= 0) {
      return (
        <div className="statusInfo">
          <h1>错误！商店里没有任何游戏。请联系管理员。</h1>
        </div>
      );
    } else {
      return (<GameList games={games} />);
    }

  };

  return (
    <section className="StoreGameList">
      {placeGameList()}
    </section>
  );
};
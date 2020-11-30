import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import GameList from "../../components/game/list";
import { setTitle, setDescription } from "../../features/navbar";

import { usePlayerDetail } from "../../services/player";
import { useGameList } from "../../services/game";

// import "./Dummy.scss";

const GameListView = () => {

  const params: any = useParams();

  let dbname = params?.dbname || "mr-stranger";
  const playerName0 = "神秘的陌生人";
  const { isQueryLoading: isPlayerLoading, queryError: playerLoadingError, player } = usePlayerDetail(dbname);
  const playerDisplayName = player?.name || player?.dbname || playerName0;
  const { isQueryLoading: isGameListLoading, queryError: gameListLoadingError, games } = useGameList({$or: player?.games.map((ele) => {return {dbname: ele}})}, {perPage: 1000});

  // const player: Player = {
  //   dbname: dbname || "Mr. Stranger",
  //   name: "Billy",
  //   bio: "我喜欢吃肯德基!",
  //   isPremium: true,
  //   games: [
  //     "game-tesV",
  //     "game-halfLifeAlyx"
  //   ],
  // };

  // const games: Game[] = [
  //   {
  //     dbname: "game-tesV",
  //     name: "题伊诶四威",
  //     description: "超大型奇幻bug游戏",
  //     price: 123,
  //   },
  //   {
  //     dbname: "game-halfLifeAlyx",
  //     name: "Half Life Alyx",
  //     description: "你可以用VR在白板上画一天",
  //     price: 321,
  //   }
  // ];

  const dispatch = useDispatch();

  useEffect(() => {
    
    dispatch(setTitle(`${playerDisplayName}的游戏`));
    dispatch(setDescription("选择一款游戏以查看详情"));

  });

  const placePlayerGameList = () => {
    if (isPlayerLoading) {
      return (
        <div className="statusInfo">
          <h1>获取玩家信息中，请稍后...</h1>
        </div>
      );
    } else if (playerLoadingError || player === undefined) {
      return (
        <div className="statusInfo">
          <h1>错误！无法进行玩家查询。请联系管理员。</h1>
        </div>
      );
    } else if (player === null) {
      return (
        <div className="statusInfo">
          <h1>错误！未找到该玩家。请联系管理员。</h1>
        </div>
      );
    } else if (isGameListLoading) {
      return (
        <div className="statusInfo">
          <h1>获取游戏列表中，请稍后...</h1>
        </div>
      );
    } else if (gameListLoadingError || games === undefined) {
      return (
        <div className="statusInfo">
          <h1>错误！无法进行游戏查询。请联系管理员。</h1>
        </div>
      );
    } else if (games === null || games.length <= 0) {
      return (
        
        <div className="statusInfo">
          <h1>{playerDisplayName}没有任何游戏。如果你觉得不对劲，请联系管理员。</h1>
        </div>
      );
    } else {
      return (<GameList games={games} />);
    }
  };

  return (
    <section className="PlayerGameList">
      {placePlayerGameList()}
    </section>
  );
};

export default GameListView;
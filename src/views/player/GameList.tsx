import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { t, Trans } from "@lingui/macro";

import GameList from "../../components/game/list";
import { setTitle, setDescription } from "../../features/navbar";

import { usePlayerDetail } from "../../services/player";
import { useGameList } from "../../services/game";

// import "./Dummy.scss";

const GameListView = () => {

  const params: any = useParams();

  let dbname = params?.dbname || "mr-stranger";
  const playerName0 = t`Mr. Stranger`;
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
    
    dispatch(setTitle(t`Games owned by ${playerDisplayName}`));
    dispatch(setDescription(t`Select a game to view its details.`)); //"选择一款游戏以查看详情"

  });

  const placePlayerGameList = () => {
    if (isPlayerLoading) {
      return (
        <div className="statusInfo">
          <h1> <Trans>Loading player data</Trans>, <Trans>please wait</Trans></h1>
        </div>
      );
    } else if (playerLoadingError || player === undefined) {
      return (
        <div className="statusInfo">
          <h1><Trans>Error</Trans>! <Trans>Failed to load player data.</Trans><Trans>Please contact the administrator.</Trans></h1>
        </div>
      );
    } else if (player === null) {
      return (
        <div className="statusInfo">
          <h1><Trans>Error</Trans>! <Trans>Unable to find the player.</Trans> <Trans>Please contact the administrator.</Trans></h1>
        </div>
      );
    } else if (isGameListLoading) {
      return (
        <div className="statusInfo">
          <h1><Trans>Retrieving game list</Trans>, <Trans>please wait</Trans>...</h1>
        </div>
      );
    } else if (gameListLoadingError || games === undefined) {
      return (
        <div className="statusInfo">
          <h1><Trans>Error</Trans>! <Trans>Unable to retrieve game list</Trans>, <Trans>Please contact the administrator.</Trans></h1>
        </div>
      );
    } else if (games === null || games.length <= 0) {
      return (
        
        <div className="statusInfo">
          <h1><Trans>No Games found owned by {playerDisplayName}.</Trans> <Trans>If you think there has been something wrong, please contact the administrator. </Trans></h1>
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
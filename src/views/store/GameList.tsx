import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { t, Trans } from "@lingui/macro";

import GameList from "../../components/game/list";
import { setTitle, setDescription } from "../../features/navbar";
import { useGameList } from "../../services/game";

const StoreGameListView = () => {

  const dispatch = useDispatch();
  const { isQueryLoading, queryError, games } = useGameList({}, {perPage: 1000});

  useEffect(() => {
    
    dispatch(setTitle(t`Games In Store`)); // "商店游戏列表"
    dispatch(setDescription(t`Select a game to view its details.`)); // "选择一款游戏以查看详情"
    
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
          <h1><Trans>Loading</Trans>, <Trans>please wait</Trans>...</h1>
        </div>
      );
    } else if (queryError || !games) {
      return (
        <div className="statusInfo">
          <h1><Trans>Error</Trans>! <Trans>Failed to retrieve game information.</Trans> <Trans>Please contact the administrator.</Trans></h1>
        </div>
      );
    } else if (games.length <= 0) {
      return (
        <div className="statusInfo">
          <h1><Trans>Error</Trans>! <Trans>There are no games in the store.</Trans> <Trans>Please contact the administrator.</Trans></h1>
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

export default StoreGameListView;
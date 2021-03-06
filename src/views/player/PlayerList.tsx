import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { t, Trans } from "@lingui/macro";

import PlayerList from "../../components/player/list";
import { setTitle, setDescription } from "../../features/navbar";
import { usePlayerList } from "../../services/player";

// import "./Dummy.scss";

const PlayerListView = () => {

  const dispatch = useDispatch();
  const { isQueryLoading, queryError, players } = usePlayerList({}, {perPage: 1000});

  // test data
  // const players: Player[] = [
  //   {
  //     dbname: "player-tom",
  //     name: "Tom",
  //     bio: "Tom is a little boy",
  //     isPremium: true,
  //     games: [
  //       "game-superAdoKitt",
  //     ],
  //   },
  //   {
  //     dbname: "player-billy",
  //     name: "Billy",
  //     bio: "Billy is a naughty boy",
  //     isPremium: true,
  //     games: [
  //       "game-starCraft3",
  //       "game-dota2",
  //     ],
  //   },
  //   {
  //     dbname: "player-angularBiter",
  //     name: "Angular Biter",
  //     bio: "Zu zu zu zu zu zu zu zu boom~",
  //     isPremium: false,
  //     games: [],
  //   },
  // ];

  // during test
  // const placePlayerList = () => {
  //   return (<PlayerList players={players} />);
  // };

  const placePlayerList = () => {

    if (isQueryLoading) {
      return (
        <div className="statusInfo">
          <h1> <Trans>Loading</Trans>, <Trans>please wait</Trans>...</h1>
        </div>
      );
    } else if (queryError || !players) {
      return (
        <div className="statusInfo">
          <h1><Trans>Error</Trans>! <Trans>Failed to load player data.</Trans> <Trans>Please contact the administrator.</Trans></h1>
        </div>
      );
    } else if (players.length <= 0) {
      return (
        <div className="statusInfo">
          <h1><Trans>Error</Trans>! <Trans>Unable to find any player.</Trans> <Trans>Please contact the administrator.</Trans></h1>
        </div>
      );
    } else {
      return (<PlayerList players={players} />);
    }

  };



  useEffect(() => {
    
    dispatch(setTitle(t`Player List`)); //"玩家列表"
    dispatch(setDescription(t`All the players are your friends`)); //"所有玩家都是您的好友"
    
  });

  return (
    <section className="PlayerList">
      {placePlayerList()}
    </section>
  );
};

export default PlayerListView;
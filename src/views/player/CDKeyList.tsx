import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { t, Trans } from "@lingui/macro";

import CDKeyList from "../../components/cdkey/list";

import { setTitle, setDescription } from "../../features/navbar";
import { useParams } from "react-router-dom";
import { useCDKeyList } from "../../services/cdkey";
import { usePlayerDetail } from "../../services/player";

// import "./Dummy.scss";

const CDKeyListView = () => {

  const dispatch = useDispatch();

  const params: any = useParams();

  // test data
  // const cdkeys: CDKey[] = [
  //   // discalimer: values generated from 3rd party website
  //   // they are NOT actual game serial activation key!
  //   {
  //     id: "5f06013bdd27c4b4eb8eb930",
  //     game: "game-diablo4",
  //     player: "player-billy",
  //     value: "4PN3D-VAZCR-38RYW",
  //     isActivated: false,
  //   },
  //   {
  //     id: "5f060141bae59a2aa8815a88",
  //     game: "game-portal2",
  //     player: "player-billy",
  //     value: "WLWED-M2CWA-YWX4E",
  //     isActivated: false,
  //   },
  //   {
  //     id: "5f06014891f6aecbd1ea154b",
  //     game: "game-assassinsCreedValhalla",
  //     player: "player-billy",
  //     value: "VT7BX-3VV9C-ZVCBN",
  //     isActivated: false,
  //   }
  // ];

  // get the names of the games
  // const gameNamedCDkeys: DetailedCDKey[] = cdkeys.map(async () => {
  //   // access DB
  // });

  let dbname = params?.dbname || "mr-stranger";
  const playerName0 = t`Mr. Stranger`; //"神秘的陌生人";
  const { isQueryLoading: isPlayerQueryLoading, queryError: playerQueryError, player } = usePlayerDetail(dbname);
  const playerDisplayName = player?.name || player?.dbname || playerName0;
  const { isQueryLoading: isCDKeyQueryLoading, queryError: cdkeyQueryError, cdkeys } = useCDKeyList({player: dbname}, {perPage: 1000});
  // const { isQueryLoading: isGameQueryLoading, queryError: gameQueryError, game } = useGameDetail(dbname);
  // const gameName0 = "不存在的游戏";
  // const gameDisplayName = game?.name || game?.dbname || gameName0;
  // const { data: _gameData, getGameDetail } = useLazyGameDetail();

  // let detailedCDKeys: DetailedCDKey[];

  // test data
  // const gameNamedCDkeys: DetailedCDKey[] = [
  //   {
  //     id: "5f06013bdd27c4b4eb8eb930",
  //     game: "game-diablo4",
  //     gameName: "大菠萝4",
  //     player: "player-billy",
  //     value: "4PN3D-VAZCR-38RYW",
  //     isActivated: false,
  //   },
  //   {
  //     id: "5f060141bae59a2aa8815a88",
  //     game: "game-portal2",
  //     gameName: "传送门2",
  //     player: "player-billy",
  //     value: "WLWED-M2CWA-YWX4E",
  //     isActivated: false,
  //   },
  //   {
  //     id: "5f06014891f6aecbd1ea154b",
  //     game: "game-assassinsCreedValhalla",
  //     gameName: "刺客信条哇啦啦",
  //     player: "player-billy",
  //     value: "VT7BX-3VV9C-ZVCBN",
  //     isActivated: false,
  //   }
  // ]

  const placePlayerCDKeyList = () => {

    if (isPlayerQueryLoading) {
      return (
        <div className="statusInfo">
          <h1><Trans>Loading player data</Trans>, <Trans>please wait</Trans>...</h1>
        </div>
      );
    } else if (playerQueryError || player === undefined) {
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
    } else if (isCDKeyQueryLoading) {
      return (
        <div className="statusInfo">
          <h1><Trans>Loading CDKey data</Trans>, <Trans>please wait</Trans>...</h1>
        </div>
      );
    } else if (cdkeyQueryError || cdkeys === undefined) {
      return (
        <div className="statusInfo">
          <h1><Trans>Error</Trans>! <Trans>Unable to load CDKey data.</Trans> <Trans>Please contact the administrator.</Trans></h1>
        </div>
      );
    } else if (cdkeys.length <= 0) {
      return (
        <div className="statusInfo">
          <h1><Trans>No CDKey found in the inventory of {playerDisplayName}.</Trans> <Trans>If you think there has been something wrong, please contact the administrator. </Trans></h1>
        </div>
      );
    } else {
      // console.log(cdkeys);

      // if (!detailedCDKeys) {
      //   detailedCDKeys = cdkeys.map((ele) => {
      //     // getGameDetail({ variables: { dbname: ele.game } })
      //     return {
      //       ...ele,
      //       gameName: _gameData?.game.name || "不存在的游戏",
      //       playerName: playerDisplayName,
      //     }
      //   });
      // }

      // Haven't found a way to load game details one by one
      // It infinitely loads
      

      return (<CDKeyList cdkeys={cdkeys} />);
    }
  };

  useEffect(() => {
    
    dispatch(setTitle(t`CDKey Inventory of ${playerDisplayName}`)); //的CDKey库存列表
    dispatch(setDescription(`CDKeys owned by ${playerDisplayName}`));

    
    
  });

  return (
    <section className="CDKeyList">
      {/* Each page must have at least 1 and only 1 menu */}
      {placePlayerCDKeyList()}
    </section>
  );
};

export default CDKeyListView;
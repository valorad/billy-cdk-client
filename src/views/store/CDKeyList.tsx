import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { t, Trans } from "@lingui/macro";

import CDKeyList from "../../components/cdkey/list";

import { setTitle, setDescription } from "../../features/navbar";

import { useGameDetail } from "../../services/game";
import { useCDKeyList } from "../../services/cdkey";


// import "./Dummy.scss";

const StoreGameCDKeyListView = () => {

  const dispatch = useDispatch();

  const params: any = useParams();

  let dbname = params?.dbname || "game:non-existance";
  const name0 = t`A game of non-existence`;
  const { isQueryLoading: isGameQueryLoading, queryError: gameQueryError, game } = useGameDetail(dbname);
  const gameDisplayName = game?.name || game?.dbname || name0;
  const { isQueryLoading: isCDKeyQueryLoading, queryError: cdkeyQueryError, cdkeys } = useCDKeyList({game: dbname}, {perPage: 1000});


  useEffect(() => {
    
    dispatch(setTitle(t`Issued CDKeys`)); // "已签发的CDKey"
    dispatch(setDescription(t`Game` + `: ${gameDisplayName}`)); // 游戏：${gameDisplayName}
    
  });

  // test data
  // const cdkeys: CDKey[] = [
  //   // discalimer: values generated from 3rd party website
  //   // they are NOT actual game serial activation key!
  //   {
  //     ID: "5f06013bdd27c4b4eb8eb930",
  //     game: "game-diablo4",
  //     player: "player-billy",
  //     value: "4PN3D-VAZCR-38RYW",
  //     isActivated: false,
  //   },
  //   {
  //     ID: "5f060141bae59a2aa8815a88",
  //     game: "game-diablo4",
  //     player: null,
  //     value: "WLWED-M2CWA-YWX4E",
  //     isActivated: false,
  //   },
  //   {
  //     ID: "5f06014891f6aecbd1ea154b",
  //     game: "game-diablo4",
  //     player: null,
  //     value: "VT7BX-3VV9C-ZVCBN",
  //     isActivated: false,
  //   }
  // ];

  const placeGameCDKeyList = () => {

    if (isGameQueryLoading) {
      return (
        <div className="statusInfo">
          <h1><Trans>Retrieving game information</Trans>, <Trans>please wait</Trans>...</h1>
        </div>
      );
    } else if (gameQueryError || game === undefined) {
      return (
        <div className="statusInfo">
          <h1><Trans>Error</Trans>! <Trans>Failed to retrieve game information.</Trans> <Trans>Please refer to the console or server logs for more details.</Trans></h1>
        </div>
      );
    } else if (game === null) {
      return (
        <div className="statusInfo">
          <h1><Trans>Error</Trans>! <Trans>Unable to find the game.</Trans> <Trans>Please refer to the console or server logs for more details.</Trans></h1>
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
          <h1><Trans>Error</Trans>! <Trans>Unable to load CDKey data.</Trans> <Trans>Please refer to the console or server logs for more details.</Trans></h1>
        </div>
      );
    } else if (cdkeys.length <= 0) {
      return (
        <div className="statusInfo">
          <h1><Trans>No CDKeys are issued for this game.</Trans> <Trans>Please issue a CDKey first.</Trans> <Trans>If you think there has been something wrong, please contact the administrator.</Trans></h1>
        </div>
      );
    } else {
      return (<CDKeyList cdkeys={cdkeys} />);
    }
  };

  return (
    <section className="StoreGameCDKeyListView">
      {placeGameCDKeyList()}
      
    </section>
  );
};

export default StoreGameCDKeyListView;
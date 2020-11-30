import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import CDKeyList from "../../components/cdkey/list";

import { setTitle, setDescription } from "../../features/navbar";

import { useGameDetail } from "../../services/game";
import { useCDKeyList } from "../../services/cdkey";


// import "./Dummy.scss";

const StoreGameCDKeyListView = () => {

  const dispatch = useDispatch();

  const params: any = useParams();

  let dbname = params?.dbname || "game:non-existance";
  const name0 = "不存在的游戏";
  const { isQueryLoading: isGameQueryLoading, queryError: gameQueryError, game } = useGameDetail(dbname);
  const gameDisplayName = game?.name || game?.dbname || name0;
  const { isQueryLoading: isCDKeyQueryLoading, queryError: cdkeyQueryError, cdkeys } = useCDKeyList({game: dbname}, {perPage: 1000});


  useEffect(() => {
    
    dispatch(setTitle("已签发的CDKey"));
    dispatch(setDescription(`游戏：${gameDisplayName}`));
    
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
          <h1>读取游戏信息中，请稍后...</h1>
        </div>
      );
    } else if (gameQueryError || game === undefined) {
      return (
        <div className="statusInfo">
          <h1>错误！无法进行游戏查询。请查看控制台或后台日志。</h1>
        </div>
      );
    } else if (game === null) {
      return (
        <div className="statusInfo">
          <h1>错误！未找到该游戏。请查看控制台或后台日志。</h1>
        </div>
      );
    } else if (isCDKeyQueryLoading) {
      return (
        <div className="statusInfo">
          <h1>读取CDKey信息中，请稍后...</h1>
        </div>
      );
    } else if (cdkeyQueryError || cdkeys === undefined) {
      return (
        <div className="statusInfo">
          <h1>错误！无法进行CDKey查询。请查看控制台或后台日志。</h1>
        </div>
      );
    } else if (cdkeys.length <= 0) {
      return (
        <div className="statusInfo">
          <h1>该游戏未签发任何CDKey。请签发一条CDKey。如果你觉得不对劲，请查看控制台或后台日志。</h1>
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
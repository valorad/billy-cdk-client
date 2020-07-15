import React, { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { useDispatch, useSelector } from "react-redux";

import CDKeyDetail from "../../components/cdkey/detail";

import { setTitle, setDescription } from "../../features/navbar";
import { MenuItem } from "../../models/menu.interface";
import { CDKey, DetailedCDKey } from "../../models/cdkey.interface";
import { useCDKeyDetail } from "../../services/cdkey";
import { useGameDetail } from "../../services/game";
import { usePlayerDetail } from "../../services/player";
import { selectLoginAsPlayer } from "../../features/login";


// import "./CDKeyDetail.scss";

export default () => {

  const dispatch = useDispatch();

  const params = useRoute("/cdkeys/id/:id")[1];

  let id = params?.id || "unknown-id";

  // logged in player
  const loggedInPlayer = useSelector(selectLoginAsPlayer);

  const { isQueryLoading: isCDKeyQueryLoading, queryError: cdkeyQueryError, cdkey } = useCDKeyDetail({id});
  const gameName0 = "不存在的游戏";
  const { isQueryLoading: isGameQueryLoading, queryError: gameQueryError, game } = useGameDetail(cdkey?.game || "");
  const gameDisplayName = game?.name || game?.dbname || gameName0;

  const playerName0 = "神秘的陌生人";
  const { isQueryLoading: isPlayerQueryLoading, queryError: playerQueryError, player } = usePlayerDetail(cdkey?.player || "");
  const playerDisplayName = player?.name || player?.dbname || playerName0;

  // get cdkey
  // const cdkey: CDKey = {
  //   // discalimer: value generated from 3rd party website
  //   // it is NOT actual game serial activation key!
  //   id: "5f060823483666ad38510545",
  //   player: "player-billy",
  //   game: "game-deathStranding",
  //   value: "MX6L5-NYQYZ-Q7GXV",
  //   isActivated: false,
  //   price: 222,
  // }


  // get cdkey detailed info
  let detailedCDKey = {  } as DetailedCDKey;
  let doesPlayerOwnThisGame = false;

  // test data
  // const detailedCDKey: DetailedCDKey = {
  //   id: "5f060823483666ad38510545",
  //   player: "player-billy",
  //   playerName: "Billy",
  //   game: "game-deathStranding",
  //   gameName: "死亡搁浅",
  //   value: "MX6L5-NYQYZ-Q7GXV",
  //   isActivated: false,
  //   price: 222,
  // }

  const placeCDKeyDetail = () => {

    if (isCDKeyQueryLoading) {
      return (
        <div className="statusInfo">
          <h1>获取CDKey信息中，请稍后...</h1>
        </div>
      );
    } else if (cdkeyQueryError || cdkey === undefined) {
      return (
        <div className="statusInfo">
          <h1>错误！无法进行CDKey查询。请联系管理员。</h1>
        </div>
      );
    } else if (cdkey === null) {
      return (
        <div className="statusInfo">
          <h1>错误！未找到此CDKey，请联系管理员。</h1>
        </div>
      );
    } else {
      detailedCDKey = {
        ...cdkey,
        playerName: playerDisplayName,
        gameName: gameDisplayName
      }
      
      return (<CDKeyDetail CDKey={detailedCDKey} menus={menus} />);
    }
  };

  const menus: MenuItem[] = [
    {
      name: "赠予他人",
      link: "#/index",
    },
    {
      name: "丢弃此CDKey",
      link: "#/index",
    },
  ];

  // add but menu if game not owned by logged in player

  if (cdkey) {
    doesPlayerOwnThisGame = loggedInPlayer?.games.includes(cdkey.game) || false;
    if (!doesPlayerOwnThisGame) {
      menus.unshift({
        name: "为自己激活",
        link: "#/index",
      });
    }
  }

  useEffect(() => {
    
    dispatch(setTitle(`CDKey详情`));
    dispatch(setDescription(`用于激活：${detailedCDKey.gameName}`));

  });

  return (
    <section className="CDKeyDetail">

      {
        doesPlayerOwnThisGame?
        <h1>您已拥有此游戏。</h1>
        :null
      }

      {placeCDKeyDetail()}
    </section>
  );
};
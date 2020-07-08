import React, { useEffect } from "react";
import { useRoute } from "wouter";
import { useDispatch } from "react-redux";

import CDKeyDetail from "../../components/cdkey/detail";

import { setTitle, setDescription } from "../../features/navbar";
import { MenuItem } from "../../models/menu.interface";
import { CDKey, DetailedCDKey } from "../../models/cdkey.interface";


// import "./CDKeyDetail.scss";

export default () => {

  const dispatch = useDispatch();

  const params = useRoute("/cdkeys/id/:id")[1];

  let id = params?.id || "unknown-id";

  // get cdkey
  const cdkey: CDKey = {
    // discalimer: value generated from 3rd party website
    // it is NOT actual game serial activation key!
    ID: "5f060823483666ad38510545",
    player: "player-billy",
    game: "game-deathStranding",
    value: "MX6L5-NYQYZ-Q7GXV",
    isActivated: false,
    price: 222,
  }

  // get cdkey detailed info
  // const detailedCDKey = await xxx
  const detailedCDKey: DetailedCDKey = {
    ID: "5f060823483666ad38510545",
    player: "player-billy",
    playerName: "Billy",
    game: "game-deathStranding",
    gameName: "死亡搁浅",
    value: "MX6L5-NYQYZ-Q7GXV",
    isActivated: false,
    price: 222,
  }

  useEffect(() => {
    
    dispatch(setTitle(`CDKey详情`));
    dispatch(setDescription(`用于激活：${detailedCDKey.gameName}`));
    
  });

  const menus: MenuItem[] = [
    {
      name: "为自己激活",
      link: "#/index",
    },
    {
      name: "赠予他人",
      link: "#/index",
    },
    {
      name: "删除CDKey",
      link: "#/index",
    },
  ];



  return (
    <section className="CDKeyDetail">
      {/* Each page must have at least 1 and only 1 menu */}
      <CDKeyDetail CDKey={detailedCDKey} menus={menus} />
    </section>
  );
};
import React from "react";

import { Player } from "../../models/player.interface";
import { MenuItem } from "../../models/menu.interface";

import Menu from "../menu";

import "./detail.scss";

interface playerDetailProps {
  player: Player,
  menus: MenuItem[],
}

export default (props: playerDetailProps) => {

  const placePremiumBadge = () => {
    if (props.player.isPremium) {
      return (
        <h1>黄金土豪高端会员</h1>
      );
    }
  };

  return (
    <div className="playerDetail">
      <header>
        {placePremiumBadge()}
        <h1>简介：{props.player.bio || "这个玩家太忙，没时间写简介"}</h1>
      </header>

      <Menu menus={props.menus} />
    </div>
  );
};
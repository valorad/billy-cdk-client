import React from "react";

import { DetailedCDKey } from "../../models/cdkey.interface";
import { MenuItem } from "../../models/menu.interface";

import Menu from "../menu";

import "./detail.scss";

interface cdkeyDetailProps {
  CDKey: DetailedCDKey,
  menus: MenuItem[],
}

export default (props: cdkeyDetailProps) => {

  return (
    <div className="cdkeyDetail">

      <header>
        <h1>持有玩家：{props.CDKey.playerName || props.CDKey.player || "未知"}</h1>
        <h1>激活码：{props.CDKey.value || "未知"}</h1>
        <h1>激活游戏：{props.CDKey.gameName || props.CDKey.game || "未知"}</h1>
        <h1>价格：{props.CDKey.price || "未知"}</h1>
        <h1>游戏平台：{props.CDKey.platform || "未知"}</h1>
      </header>

      <Menu menus={props.menus} />
    </div>
  );
};
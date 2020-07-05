import React from "react";

import { Game } from "../../models/game.interface";
import { MenuItem } from "../../models/menu.interface";

import Menu from "../menu";

import "./detail.scss";

interface gameDetailProps {
  game: Game,
  menus: MenuItem[],
}

export default (props: gameDetailProps) => {

  return (
    <div className="gameDetail">

      <header>
        <h1>售价：{props.game.price}</h1>
        <h1>简介：{props.game.description}</h1>
      </header>

      <Menu menus={props.menus} />
    </div>
  );
};
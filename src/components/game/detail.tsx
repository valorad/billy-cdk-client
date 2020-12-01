import React from "react";
import { Trans, t } from "@lingui/macro";

import { Game } from "../../models/game.interface";
import { MenuItem } from "../../models/menu.interface";
import Menu from "../menu";

import "./detail.scss";

interface gameDetailProps {
  game: Game,
  menus: MenuItem[],
}

const GameDetail = (props: gameDetailProps) => {

  return (
    <div className="gameDetail">

      <header>
        <h1><Trans>Price</Trans>: {props.game.price}</h1>
        <h1><Trans>Introduction</Trans>: {props.game.description || t`This game is such a masterpiece that it does not need an intro at all.`}</h1>
      </header>

      <Menu menus={props.menus} />
    </div>
  );
};

export default GameDetail;
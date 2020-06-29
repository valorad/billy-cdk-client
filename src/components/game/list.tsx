import React from "react";
import { MenuItem } from "../../models/menu.interface";

import Menu from "../menu";
import { Game } from "../../models/game.interface";

// import "./gameList.scss";

interface gameListProps {
  games: Game[],
}

export default (props: gameListProps) => {

  const gameMenuItems: MenuItem[] = [];

  for (let game of props.games) {
    gameMenuItems.push(
      {
        name: game.name,
        link: `#/store/games/${game.dbname}`
      }
    );
  }

  return (
    <div className="gameList">
      <Menu menus={gameMenuItems} isListView={true} />
    </div>
  );
};
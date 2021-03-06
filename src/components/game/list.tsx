import React from "react";

import { MenuItem } from "../../models/menu.interface";
import { Game } from "../../models/game.interface";

import Menu from "../menu";

// import "./gameList.scss";

interface gameListProps {
  games: Game[],
}

const GameList = (props: gameListProps) => {

  const gameMenuItems: MenuItem[] = [];

  for (let game of props.games) {
    gameMenuItems.push(
      {
        name: game.name || game.dbname,
        link: `#/store/games/dbname/${game.dbname}`
      }
    );
  }

  return (
    <div className="gameList">
      <Menu menus={gameMenuItems} isListView={true} />
    </div>
  );
};

export default GameList;
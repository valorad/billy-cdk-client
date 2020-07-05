import React from "react";

import { MenuItem } from "../../models/menu.interface";

import Menu from "../menu";
import { Player } from "../../models/player.interface";

// import "./gameList.scss";

interface playerListProps {
  players: Player[],
}

export default (props: playerListProps) => {

  const menuItems: MenuItem[] = [];

  for (let player of props.players) {
    menuItems.push(
      {
        name: player.name,
        link: `#/players/dbname/${player.dbname}`
      }
    );
  }

  return (
    <div className="playerList">
      <Menu menus={menuItems} isListView={true} />
    </div>
  );
};
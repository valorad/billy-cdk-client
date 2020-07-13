import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import CDKeyList from "../../components/cdkey/list";

import { setTitle, setDescription } from "../../features/navbar";
import { CDKey, DetailedCDKey } from "../../models/cdkey.interface";

// import "./Dummy.scss";

export default () => {

  const dispatch = useDispatch();

  useEffect(() => {
    
    dispatch(setTitle("Billy的CDKey库存列表"));
    dispatch(setDescription("这里是Billy库存里的CDKey"));
    
  });

  const cdkeys: CDKey[] = [
    // discalimer: values generated from 3rd party website
    // they are NOT actual game serial activation key!
    {
      id: "5f06013bdd27c4b4eb8eb930",
      game: "game-diablo4",
      player: "player-billy",
      value: "4PN3D-VAZCR-38RYW",
      isActivated: false,
    },
    {
      id: "5f060141bae59a2aa8815a88",
      game: "game-portal2",
      player: "player-billy",
      value: "WLWED-M2CWA-YWX4E",
      isActivated: false,
    },
    {
      id: "5f06014891f6aecbd1ea154b",
      game: "game-assassinsCreedValhalla",
      player: "player-billy",
      value: "VT7BX-3VV9C-ZVCBN",
      isActivated: false,
    }
  ];

  // get the names of the games
  // const gameNamedCDkeys: DetailedCDKey[] = cdkeys.map(async () => {
  //   // access DB
  // });

  // in dev
  const gameNamedCDkeys: DetailedCDKey[] = [
    {
      id: "5f06013bdd27c4b4eb8eb930",
      game: "game-diablo4",
      gameName: "大菠萝4",
      player: "player-billy",
      value: "4PN3D-VAZCR-38RYW",
      isActivated: false,
    },
    {
      id: "5f060141bae59a2aa8815a88",
      game: "game-portal2",
      gameName: "传送门2",
      player: "player-billy",
      value: "WLWED-M2CWA-YWX4E",
      isActivated: false,
    },
    {
      id: "5f06014891f6aecbd1ea154b",
      game: "game-assassinsCreedValhalla",
      gameName: "刺客信条哇啦啦",
      player: "player-billy",
      value: "VT7BX-3VV9C-ZVCBN",
      isActivated: false,
    }
  ]

  return (
    <section className="CDKeyList">
      {/* Each page must have at least 1 and only 1 menu */}
      <CDKeyList detailedCDKeys={gameNamedCDkeys} />
    </section>
  );
};
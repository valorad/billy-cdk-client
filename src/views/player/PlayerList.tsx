import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import PlayerList from "../../components/player/list";
import { setTitle, setDescription } from "../../features/navbar";
import { Player } from "../../models/player.interface";

// import "./Dummy.scss";

export default () => {

  const dispatch = useDispatch();

  const players: Player[] = [
    {
      dbname: "player-tom",
      name: "Tom",
      bio: "Tom is a little boy",
      isPremium: true,
      games: [
        "game-superAdoKitt",
      ],
    },
    {
      dbname: "player-billy",
      name: "Billy",
      bio: "Billy is a naughty boy",
      isPremium: true,
      games: [
        "game-starCraft3",
        "game-dota2",
      ],
    },
    {
      dbname: "player-angularBiter",
      name: "Angular Biter",
      bio: "Zu zu zu zu zu zu zu zu boom~",
      isPremium: false,
      games: [],
    },
  ];

  useEffect(() => {
    
    dispatch(setTitle("好友列表"));
    dispatch(setDescription("以下都是您的好友"));
    
  });

  return (
    <section className="PlayerList">
      <PlayerList players={players} />
    </section>
  );
};
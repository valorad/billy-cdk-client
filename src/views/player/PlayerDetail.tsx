import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Menu from "../../components/menu";
import { setTitle, setDescription } from "../../features/navbar";
import { MenuItem } from "../../models/menu.interface";
import { useRoute } from "wouter";
import { Player } from "../../models/player.interface";
import MicroModal from "micromodal";
import { Game } from "../../models/game.interface";

// import "./Dummy.scss";

export default () => {

  const params = useRoute("/players/dbname/:dbname")[1];

  let dbname = params?.dbname || "mr-stranger";

  const dispatch = useDispatch();

  const player: Player = {
    dbname: dbname,
    name: "Angular Biter",
    bio: "Angular biter's Ding-ding gas station: Zu zu zu zu zu!",
    isPremium: false,
    games: [],
  };

  const menus: MenuItem[] = [
    {
      name: "查看TA的游戏库",
      link: `#/players/dbname/${dbname}/games`,
    },
    {
      name: "查看TA的CDKey库存",
      link: `#/players/dbname/${dbname}/cdkeys`,
    },
    {
      name: "编辑玩家信息",
      link: "#/index",
    },
    {
      name: "删除玩家",
      link: "#/index",
    },
  ];

  // query games
  // const games: Game[] = [
  //   {
  //     dbname: "game-tesV",
  //     name: "题伊诶四威",
  //     description: "超大型奇幻bug游戏",
  //     price: 123,
  //   },
  //   {
  //     dbname: "game-halfLifeAlyx",
  //     name: "Half Life Alyx",
  //     description: "你可以用VR在白板上画一天",
  //     price: 321,
  //   }
  // ];

  const [editDialogResult, setEditDialogResult] = useState({});
  const editPlayer = () => {
    MicroModal.show("dialogInput-editPlayer");
  };

  const deletePlayer = () => {
    MicroModal.show("dialogConfirmation-deletePlayer");
  };



  useEffect(() => {
    
    dispatch(setTitle("玩家详情"));
    dispatch(setDescription(player.name));
    
  });





  return (
    <section className="PlayerDetail">
      {/* Each page must have at least 1 and only 1 menu */}
      <Menu menus={menus} />
    </section>
  );
};
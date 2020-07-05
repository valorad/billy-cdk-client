import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import Menu from "../../components/menu";
import { setTitle, setDescription } from "../../features/navbar";
import { MenuItem } from "../../models/menu.interface";

// import "./Player.scss";

export default () => {

  const dispatch = useDispatch();

  useEffect(() => {
    
    dispatch(setTitle("玩家管理"));
    dispatch(setDescription("查看玩家列表或新增一名玩家。目前所有玩家都是您的好友。"));
    
  });

  const menus: MenuItem[] = [
    {
      name: "玩家列表",
      link: "#/players",
    },
    {
      name: "新增玩家",
      link: "#/players/new",
    },
  ];

  return (
    <section className="Player">
      {/* Each page must have at least 1 and only 1 menu */}
      <Menu menus={menus} />
    </section>
  );
};
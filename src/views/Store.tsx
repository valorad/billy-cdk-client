import React, { useEffect } from "react";

// import "./Store.scss";
import { menuItem } from "../models/menu.interface";

import Menu from "../components/menu";
import { useDispatch } from "react-redux";
import { setTitle, setDescription } from "../features/navbar";

export default () => {

  const dispatch = useDispatch();

  const menus: menuItem[] = [
    {
      name: "商店游戏列表",
      link: "#/store/games",
    },
    {
      name: "发布新游戏",
      link: "#/store/games/new",
    },
  ];

  useEffect(() => {
    
    dispatch(setTitle("Billy游戏商店"));
    dispatch(setDescription("浏览游戏列表，或是发布一款新游戏"));
    
  });

  return (
    <section className="Store">
      <Menu menus={menus} />
    </section>
  );
};
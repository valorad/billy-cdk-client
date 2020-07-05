import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import Menu from "../components/menu";
import { MenuItem } from "../models/menu.interface";
import { setTitle, setDescription } from "../features/navbar";
// import "./Dummy.scss";

export default () => {

  const dispatch = useDispatch();

  useEffect(() => {
    
    dispatch(setTitle("欢迎来到Billy CDKey"));
    dispatch(setDescription("高端黑框框版"));
    
  });

  const menus: MenuItem[] = [
    {
      name: "浏览商店",
      link: "#/store",
    },
    {
      name: "我的好友",
      link: "#/players",
    },
    {
      name: "我的游戏",
      link: "#/games",
    },
    {
      name: "我的CDKey",
      link: "#/cdkeys",
    },
    {
      name: "退出",
      action: () => {
        console.log(`Clicked Exit`);
      }
    },
  ];

  return (
    <section className="Home">
      {/* Each page must have at least 1 and only 1 menu */}
      <Menu menus={menus} />
    </section>
  );
};
import React from "react";

import Menu from "../components/menu";
import { menuItem } from "../models/menu.interface";
// import "./Dummy.scss";

export default () => {

  const menus: menuItem[] = [
    {
      name: "浏览商店",
      link: "#/store",
    },
    {
      name: "我的好友",
      link: "#/friends",
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
      link: "#/exit",
      isExit: true,
    },
  ];

  return (
    <section className="Home">
      {/* Each page can only have 1 menu */}
      <Menu menus={menus} />
    </section>
  );
};
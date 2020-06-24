import React from "react";

import "./menu.scss";

interface menuProps {

}

const menuItems = [

  {
    name: "浏览商店",
    link: "##",
  },
  {
    name: "我的好友",
    link: "##",
  },
  {
    name: "我的游戏",
    link: "##",
  },
  {
    name: "我的CDKey",
    link: "##",
  },
  {
    name: "退出",
    link: "##",
    isExit: true,
  },
];

const menus = menuItems.map((ele) => {
  return (
    <li tabIndex={-1}>
      <a href={ele.link}>{ele.name}</a>
    </li>
  );
});


export default (props: menuProps) => {
  return (
    <div className="menu">
      <ul>
        {menus}
      </ul>
    </div>
  );
};
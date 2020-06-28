import React from "react";
import Menu from "../components/menu";
import { menuItem } from "../models/menu.interface";

const menus: menuItem[] = [
  {
    name: "返回首页",
    link: "#/index",
  }
];


export default () => {
  return (
    <section className="HTTP404">
      <h1>404 - Interface Error! Please report to admin.</h1>

      <Menu menus={menus} />

    </section>
  );
};
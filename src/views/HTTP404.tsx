import React, { useEffect } from "react";
import Menu from "../components/menu";
import { useDispatch } from "react-redux";
import { menuItem } from "../models/menu.interface";
import { setTitle, setDescription } from "../features/navbar";

const menus: menuItem[] = [
  {
    name: "返回首页",
    link: "#/index",
  }
];


export default () => {

  const dispatch = useDispatch();

  useEffect(() => {
    
    dispatch(setTitle("系统错误！Error 404"));
    dispatch(setDescription("别担心，回主页就好。"));
    
  });

  return (
    <section className="HTTP404">
      <Menu menus={menus} />
    </section>
  );
};
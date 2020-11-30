import React, { useEffect } from "react";
import Menu from "../components/menu";
import { useDispatch } from "react-redux";
import { MenuItem } from "../models/menu.interface";
import { setTitle, setDescription } from "../features/navbar";

const menus: MenuItem[] = [
  {
    name: "返回首页",
    link: "#/index",
  }
];

const HTTP404View = () => {

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

export default HTTP404View;
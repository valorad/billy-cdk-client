import React, { useEffect } from "react";
import { t } from "@lingui/macro";

import Menu from "../components/menu";
import { useDispatch } from "react-redux";
import { MenuItem } from "../models/menu.interface";
import { setTitle, setDescription } from "../features/navbar";


const HTTP404View = () => {

  const dispatch = useDispatch();

  const menus: MenuItem[] = [
    {
      name: t`Go Home`,
      link: "#/index",
    }
  ];


  useEffect(() => {
    
    dispatch(setTitle(t`System Error!` + ` (404)`));// "系统错误！Error 404"
    dispatch(setDescription(t`No worries, just go back to home page.`));  //"别担心，回主页就好。"
  });

  return (
    <section className="HTTP404">
      <Menu menus={menus} />
    </section>
  );
};

export default HTTP404View;
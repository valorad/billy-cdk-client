import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import Menu from "../components/menu";
import { setTitle, setDescription } from "../features/navbar";
import { MenuItem } from "../models/menu.interface";

// import "./Dummy.scss";

const DummyView = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    
    dispatch(setTitle("Dummy Page"));
    dispatch(setDescription("高端黑框框版"));
    
  });

  const menus: MenuItem[] = [
    {
      name: "返回首页",
      link: "#/index",
    },
    {
      name: "返回首页",
      link: "#/index",
    },
    {
      name: "返回首页",
      link: "#/index",
    },
  ];



  return (
    <section className="Dummy">
      {/* Each page must have at least 1 and only 1 menu */}
      <Menu menus={menus} />
    </section>
  );
};

export default DummyView;
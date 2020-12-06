import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { t } from "@lingui/macro";

import Menu from "../components/menu";
import { setTitle, setDescription } from "../features/navbar";
import { MenuItem } from "../models/menu.interface";

// import "./Dummy.scss";

const DummyView = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    
    dispatch(setTitle(t`Dummy Page`));
    dispatch(setDescription(t`High-end Terminal Version`));
    
  });

  const menus: MenuItem[] = [
    {
      name: t`Go Home`,
      link: "#/index",
    },
    {
      name: t`Go Home`,
      link: "#/index",
    },
    {
      name: t`Go Home`,
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
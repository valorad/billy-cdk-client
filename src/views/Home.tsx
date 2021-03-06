import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { t } from "@lingui/macro";

import Menu from "../components/menu";
import { MenuItem } from "../models/menu.interface";
import { setTitle, setDescription } from "../features/navbar";
import { selectLoginAsPlayer } from "../features/login";
// import "./Dummy.scss";

const HomeView = () => {

  const dispatch = useDispatch();
  const loginPlayer = useSelector(selectLoginAsPlayer);

  useEffect(() => {
    
    dispatch(setTitle(t`Welcome to Billy CDKey!`));
    dispatch(setDescription(t`High-end Terminal Version`));
    
  });

  const menus: MenuItem[] = [
    {
      name: t`Browse the store`,
      link: "#/store",
    },
    {
      name: t`My Friends`,
      link: "#/players/index",
    },
    {
      name: t`My Games`,
      link: `#/players/dbname/${loginPlayer.dbname}/games`,
    },
    {
      name: t`My CDKeys`,
      link: `#/cdkeys/index`,
    },
    {
      name: t`Change Language`,
      link: `#/settings/i18n`,
    },
    {
      name: t`Exit`,
      action: () => {
        window.location.href = "https://www.wcnexus.com";
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

export default HomeView;
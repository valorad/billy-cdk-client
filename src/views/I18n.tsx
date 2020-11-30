import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLingui } from "@lingui/react"
import { t } from "@lingui/macro";

import Menu from "../components/menu";
import { setTitle, setDescription } from "../features/navbar";
import { MenuItem } from "../models/menu.interface";

const I18nView = () => {

  const dispatch = useDispatch();

  const { i18n } = useLingui();

  const changeLanguage = (newLang: string) => {
    i18n.activate(newLang);
  };

  useEffect(() => {
    
    dispatch(setTitle(t`Change Language`));
    dispatch(setDescription(t`Switch to a new language by selecting one option below`));
    
  });

  const menus: MenuItem[] = [
    {
      name: t`English`,
      action: () => {
        changeLanguage("en");
      },
    },
    {
      name: t`French`,
      action: () => {
        changeLanguage("fr");
      },
    },
    {
      name: t`Chinese Simplified`,
      action: () => {
        changeLanguage("zh");
      },
    },
  ];



  return (
    <section className="I18nView">
      {/* Each page must have at least 1 and only 1 menu */}
      <Menu menus={menus} />
    </section>
  );
};

export default I18nView;
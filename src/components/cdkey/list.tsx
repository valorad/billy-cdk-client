import React from "react";

import { MenuItem } from "../../models/menu.interface";
import { DetailedCDKey } from "../../models/cdkey.interface";

import Menu from "../menu";

// import "./cdkeyList.scss";

interface cdkeyListProps {
  cdkeys: DetailedCDKey[],
}

export default (props: cdkeyListProps) => {


  const cdkeyMenuItems: MenuItem[] = props.cdkeys.map((ele) => {
    return {
      name: ele.gameName,
      link: `#/cdkeys/id/${ele.ID}`
    };
  });

  return (
    <div className="cdkeyList">
      <Menu menus={cdkeyMenuItems} isListView={true} />
    </div>
  );
};
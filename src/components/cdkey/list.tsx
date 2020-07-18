import React from "react";

import { MenuItem } from "../../models/menu.interface";
import { DetailedCDKey, CDKey } from "../../models/cdkey.interface";

import Menu from "../menu";

// import "./cdkeyList.scss";

interface cdkeyListProps {
  cdkeys?: CDKey[],
  detailedCDKeys?: DetailedCDKey[],
}

export default (props: cdkeyListProps) => {


  let cdkeyMenuItems: MenuItem[] = [];

  if (props.cdkeys) {
    cdkeyMenuItems = props.cdkeys.map((ele) => {
      return {
        name: ele.value,
        link: `#/cdkeys/id/${ele.id}`
      };
    });
  }
  
  if (props.detailedCDKeys) {
    cdkeyMenuItems = props.detailedCDKeys.map((ele) => {
      return {
        name: ele.gameName,
        link: `#/cdkeys/id/${ele.id}`
      };
    });
  }


  return (
    <div className="cdkeyList">
      <Menu menus={cdkeyMenuItems} isListView={true} />
    </div>
  );
};
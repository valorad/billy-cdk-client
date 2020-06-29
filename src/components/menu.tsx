import React, { useEffect, useRef, useState } from "react";

import "./menu.scss";

import { MenuItem } from "../models/menu.interface";


interface menuProps {
  menus: MenuItem[],
  isListView?: boolean,
}

export default (props: menuProps) => {

  const menuList = useRef<HTMLUListElement>(null);

  const [currentMenuIndex, setCurrentMenuIndex] = useState(0);

  const onArrowKeyDown = (e: React.KeyboardEvent) => {
    // e.preventDefault();
    switch (e.key) {
      case "ArrowUp":
      case "ArrowLeft":
        if (currentMenuIndex > 0) {
          setCurrentMenuIndex(currentMenuIndex - 1);
        } else {
          setCurrentMenuIndex(menus.length - 1);
        }

        break;
      case "ArrowDown":
      case "ArrowRight":
        setCurrentMenuIndex(currentMenuIndex + 1);

        if (currentMenuIndex >= menus.length - 1) {
          setCurrentMenuIndex(0);
        } else {
          setCurrentMenuIndex(currentMenuIndex + 1);
        }

        break;
      default:
        break;
    }
  }

  const onMenuItemHover = (e: React.MouseEvent) => {
    let a = e.currentTarget as HTMLAnchorElement;

    if (a) {
      a.focus();
      // sync current index number to state
      let index = a.dataset["indexNumber"];
      if (index) {
        setCurrentMenuIndex(parseInt(index));
      }
    }
  };
  
  
  const menus = props.menus.map((ele, index) => {
    return (
      <li key={index} tabIndex={-1}>
        <a
          href={ele.link}
          className={`menu${index}`}
          onMouseEnter={onMenuItemHover}
          data-index-number={index}
        >{ele.name}</a>
      </li>
    );
  });


  useEffect(() => {
    
    let a = menuList.current?.querySelector<HTMLAnchorElement>(`a.menu${currentMenuIndex}`);

    if (a) {
      a.focus();
    }

    
  });

  return (
    <div className="menu">
      <ul
       className={props.isListView? "listView": ""}
      //  className={"listView"}
       ref={menuList}
       onKeyDown={onArrowKeyDown}
      >
        {menus}
      </ul>
    </div>
  );
};
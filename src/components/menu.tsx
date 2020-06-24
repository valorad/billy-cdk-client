import React from "react";

import "./menu.scss";

interface menuProps {

}



export default (props: menuProps) => {
  return (
    <section className="menu">
      <ul>
        <li tabIndex={-1}><a tabIndex={0} href="##">***************************************</a></li>
        <li tabIndex={-1}><a tabIndex={0} href="##">********-----1 -管理CDK-------*********</a></li>
        <li tabIndex={-1}><a tabIndex={0} href="##">********-----2 -管理游戏-------********</a></li>
        <li tabIndex={-1}><a tabIndex={0} href="##">********-----3 -浏览商店-------********</a></li>
        <li tabIndex={-1}><a tabIndex={0} href="##">********-----4 -索要CDK-------*********</a></li>
        <li tabIndex={-1}><a tabIndex={0} href="##">********-----5 -赠送CDK-----***********</a></li>
        <li tabIndex={-1}><a tabIndex={0} href="##">***************************************</a></li>
        <li tabIndex={-1}><a tabIndex={0} href="##">*********----0 -退出----------*********</a></li>
      </ul>
    </section>
  );
};
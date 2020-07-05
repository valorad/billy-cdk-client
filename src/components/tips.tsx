import React from "react";

import "./tips.scss";

interface tipsProps {

}

export default (props: tipsProps) => {
  return (
    <div className="tips">
      <ul>
        <li> <a href="##" onClick={(e) => {e.preventDefault();window.history.back();}}><b>ESC)</b><span>返回上级</span></a></li>
        <li> <a href="##" onClick={(e) => {e.preventDefault();window.location.href = "#";}}><b>Home)</b><span>前往主页</span></a></li>
      </ul>
    </div>
  );
};
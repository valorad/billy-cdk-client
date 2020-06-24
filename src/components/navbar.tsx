import React from "react";

import "./navbar.scss";

interface navbarProps {
  title?: string,
  description?: string,
  player?: string
}

export default (props: navbarProps) => {

  return (
    <div className="navbar">

      <nav>
        <header>
          <ul>
            <li><small>Billy CDKey Remastered Edition</small></li>
            <li><small>当前主题风格：Fallout Terminal</small></li>
            <li><small>欢迎回来，{props.player}</small> {/* Player name */}</li>
          </ul>
        </header>
        <main>
          <h1>{props.title || "欢迎来到Billy CDKey！"}</h1>{/* title */}
          <h2>{props.description}</h2>{/* Description */}
        </main>
      </nav>

    </div>
  );

};
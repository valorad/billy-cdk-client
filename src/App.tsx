import React from "react";

import "./App.scss";

export default () => {
  return (
    <section className="App">
      <div className="overlay"></div>
      <div className="scanline"></div>
      <div className="wrapper">
        <div className="content">
          <section className="Home">
            <header>
              <h1>亲爱的用户 Billy:</h1>
              <h2>欢迎来到Billy CDKey</h2>
              <h2>版本：Billy CDKey 家庭豪华苹果版 Remastered Edition</h2>
              <h2>当前主题风格：Fallout Terminal</h2>
            </header>
            <main className="menu">
              <ul>
                <li><a href="##">***************************************</a></li>
                <li><a href="##">********-----1 -管理CDK-------*********</a></li>
                <li><a href="##">********-----2 -管理游戏-------********</a></li>
                <li><a href="##">********-----3 -浏览商店-------********</a></li>
                <li><a href="##">********-----4 -索要CDK-------*********</a></li>
                <li><a href="##">********-----5 -赠送CDK-----***********</a></li>
                <li><a href="##">***************************************</a></li>
                <li><a href="##">*********----0 -退出----------*********</a></li>
              </ul>
            </main>
          </section>

        </div>
      </div>
    </section>
  );
}
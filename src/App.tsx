import React from "react";
// import logo from "./logo.svg";
// import { Counter } from "./features/counter/Counter";
import "./App.scss";
import Navbar from "./components/navbar";
import { selectTitle, setTitle } from "./features/navbar";
import { useSelector, useDispatch } from "react-redux";

export default () => {

  const title = useSelector(selectTitle);
  const dispatch = useDispatch();

  return (

    <section className="App">
      <div className="overlay"></div>
      <div className="scanline"></div>
      <div className="wrapper">
        <div className="content">
          <Navbar title={title} />
          <section className="Home">
            <header>
              <h1>亲爱的用户 Billy:</h1>
              <h2>欢迎来到Error! <a href="##" onClick={() => dispatch(setTitle("SteveCDK"))}>Hack Title</a></h2>
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




    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <Counter />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <span>
    //       <span>Learn </span>
    //       <a
    //         className="App-link"
    //         href="https://reactjs.org/"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         React
    //       </a>
    //       <span>, </span>
    //       <a
    //         className="App-link"
    //         href="https://redux.js.org/"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Redux
    //       </a>
    //       <span>, </span>
    //       <a
    //         className="App-link"
    //         href="https://redux-toolkit.js.org/"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Redux Toolkit
    //       </a>
    //       ,<span> and </span>
    //       <a
    //         className="App-link"
    //         href="https://react-redux.js.org/"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         React Redux
    //       </a>
    //     </span>
    //   </header>
    // </div>
  );
}

// export default App;

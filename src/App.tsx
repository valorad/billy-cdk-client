import React from "react";
import { useSelector, useDispatch } from "react-redux";

import "./App.scss";
import Navbar from "./components/navbar";
import Menu from "./components/menu";

import { selectTitle, setTitle } from "./features/navbar";


export default () => {

  const title = useSelector(selectTitle);
  // const dispatch = useDispatch();

  return (

    <section className="App">
      <div className="overlay"></div>
      <div className="scanline"></div>
      <div className="wrapper">
        <div className="content">
          <Navbar title={title} description={"descr"} player={"Billy"} />
          <section className="Home">
            <div className="contentBox">
              <Menu />
            </div>

          </section>

        </div>
      </div>
    </section>

  );
}


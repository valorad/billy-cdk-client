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
        <div className="appHolder">
          <header>
            <div className="contentBox">
              <Navbar title={title} description={"高端黑框框版"} player={"Billy"} />
            </div>
          </header>    
          <main>
            <div className="contentBox">
              <section className="Home">
                <Menu />
              </section>
            </div>
          </main>

        </div>
      </div>
    </section>

  );
}


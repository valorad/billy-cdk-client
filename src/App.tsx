import React from "react";
import { Route, Switch, Router, Redirect } from "wouter";
import { useSelector } from "react-redux";
import MicroModal from "micromodal";

import "./App.scss";
import Navbar from "./components/navbar";
import Tips from "./components/tips";

import HomeView from "./views/Home";
import StoreView from "./views/store/Store";
import StoreGamesListView from "./views/store/GameList";
import StoreGamesDetailView from "./views/store/GameDetail";
import PlayerListView from "./views/player/PlayerList";
import PlayerDetailView from "./views/player/PlayerDetail";
import HTTP404View from "./views/HTTP404";

import { selectTitle, selectDescription } from "./features/navbar";
import useHashLocation from "./router/useHashLocation";


const placeRoutingTable = () => {
  return (
    <Switch>
      <Route path="/">
        <Redirect to="/index" />
      </Route>
      <Route path="/index" component={HomeView}></Route>
      <Route path="/store" component={StoreView}></Route>
      <Route path="/store/games" component={StoreGamesListView}></Route>
      <Route path="/store/games/dbname/:dbname" component={StoreGamesDetailView}></Route>
      <Route path="/players" component={PlayerListView}></Route>
      <Route path="/players/dbname/:dbname" component={PlayerDetailView}></Route>
      <Route path="/:rest*" component={HTTP404View}></Route>
    </Switch>
  );
};

export default () => {

  MicroModal.init();

  const title = useSelector(selectTitle);
  const description = useSelector(selectDescription);

  const onAppKeyDown = (e: React.KeyboardEvent) => {
    // e.preventDefault();
    
    switch (e.key) {
      // ESC Keys
      case "GoBack":
      case "Escape":
      case "Cancel":
      // case "Tab":
        window.history.back();
        break;

      // Home Keys
      case "Home":
        window.location.href = "#";
        break;
      default:
        break;
    }

  }


  return (

    <Router hook={useHashLocation}>

      <section className="App" tabIndex={0} onKeyDown={onAppKeyDown}>
        <div className="overlay"></div>
        <div className="scanline"></div>
        <div className="wrapper">
          <div className="appHolder">
            <header>
              <div className="contentBox">
                <Navbar title={title} description={description} player={"Billy"} />
              </div>
            </header>    
            <main>
              <div className="contentBox">

                {placeRoutingTable()}

              </div>
            </main>

          </div>
        </div>

        <Tips />
        
      </section>

    </Router>

  );
}


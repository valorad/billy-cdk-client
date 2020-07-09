import React, { useEffect, useState } from "react";
import { Route, Switch, Router, Redirect } from "wouter";
import { useSelector, useDispatch } from "react-redux";
import MicroModal from "micromodal";

import "./App.scss";
import Navbar from "./components/navbar";
import Tips from "./components/tips";

import HomeView from "./views/Home";
import StoreView from "./views/store/Store";
import StoreGamesListView from "./views/store/GameList";
import StoreGamesDetailView from "./views/store/GameDetail";
import PlayerIndexView from "./views/player/Player";
import PlayerListView from "./views/player/PlayerList";
import PlayerDetailView from "./views/player/PlayerDetail";
import PlayerGameListView from "./views/player/GameList";
import PlayerCDKeyListView from "./views/player/CDKeyList";
import CDKeyIndexView from "./views/cdkeys/CDKey";
import CDKeyDetailView from "./views/cdkeys/Detail";
import HTTP404View from "./views/HTTP404";

import { selectTitle, selectDescription } from "./features/navbar";
import useHashLocation from "./router/useHashLocation";
import { selectLoginAsPlayer, setLoginAsPlayer } from "./features/login";
import { Player } from "./models/player.interface";


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
      <Route path="/players/index" component={PlayerIndexView}></Route>
      <Route path="/players" component={PlayerListView}></Route>
      <Route path="/players/dbname/:dbname" component={PlayerDetailView}></Route>
      <Route path="/players/dbname/:dbname/games" component={PlayerGameListView}></Route>
      <Route path="/players/dbname/:dbname/cdkeys" component={PlayerCDKeyListView}></Route>
      <Route path="/cdkeys/index" component={CDKeyIndexView}></Route>
      <Route path="/cdkeys/id/:id" component={CDKeyDetailView}></Route>
      <Route path="/:rest*" component={HTTP404View}></Route>
    </Switch>
  );
};

const requestLogIn = () => {
  return new Promise<Player>((resolve, reject) => {
    setTimeout(() => {
      resolve({
        dbname: "player-billy",
        name: "Billy",
        bio: "Master of CDKey!",
        isPremium: true,
        games: [],
      })
    }, 500);
  });
}

export default () => {

  MicroModal.init();

  const dispatch = useDispatch();
  const title = useSelector(selectTitle);
  const description = useSelector(selectDescription);
  const loginPlayer = useSelector(selectLoginAsPlayer);
  const [isLoggingIn, setIsLoggingIn] = useState(true);

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

  const login = async (dbname: string, password: string) => {
    const playerToLogIn = await requestLogIn();
    dispatch(setLoginAsPlayer(playerToLogIn));
    setIsLoggingIn(false);
  };

  useEffect(() => {

    if (loginPlayer.dbname === "") {
      login("player-billy", "");
    }

  });

  return (

    <Router hook={useHashLocation}>

      <section className="App" tabIndex={0} onKeyDown={onAppKeyDown}>
        <div className="overlay"></div>
        <div className="scanline"></div>
        <div className="wrapper">
          <div className="appHolder">
            <header>
              <div className="contentBox">
                <Navbar title={title} description={description} player={loginPlayer.name || loginPlayer.dbname} />
              </div>
            </header>    
            <main>
              <div className="contentBox">

              {
                isLoggingIn?
                <div className="loggingIn"> <h1>登录中...</h1> </div>
                :placeRoutingTable()
              }

              </div>
            </main>

          </div>
        </div>

        <Tips />
        
      </section>

    </Router>

  );
}


import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePlayerDetail } from "../services/player";

import HomeView from "./Home";
import StoreView from "./store/Store";
import StoreGamesListView from "./store/GameList";
import StoreGamesDetailView from "./store/GameDetail";
import StoreGamesCDKeyIndexView from "./store/CDKey";
import StoreGamesCDKeyListView from "./store/CDKeyList";
import PlayerIndexView from "./player/Player";
import PlayerListView from "./player/PlayerList";
import PlayerDetailView from "./player/PlayerDetail";
import PlayerGameListView from "./player/GameList";
import PlayerCDKeyListView from "./player/CDKeyList";
import CDKeyIndexView from "./cdkey/CDKey";
import CDKeyDetailView from "./cdkey/Detail";
import HTTP404View from "./HTTP404";


import { Switch, Route, Redirect } from "wouter";
import { selectLoginAsPlayer, setLoginAsPlayer } from "../features/login";
import { Player } from "../models/player.interface";

// import "./Dummy.scss";


export default () => {

  const { isQueryLoading, queryError, player: playerToLogin } = usePlayerDetail(`${"player-billy"}`);

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
        <Route path="/store/games/dbname/:dbname/cdkeys/index" component={StoreGamesCDKeyIndexView}></Route>
        <Route path="/store/games/dbname/:dbname/cdkeys" component={StoreGamesCDKeyListView}></Route>
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

  const dispatch = useDispatch();
  const loginPlayer = useSelector(selectLoginAsPlayer);

  const placeMainMenu = () => {
    if (isQueryLoading) {
      return (
        <div className="statusInfo">
          <h1>登录中，请稍后...</h1>
        </div>
      );
    } else if (queryError || playerToLogin === undefined) {
      return (
        <div className="statusInfo">
          <h1>错误！无法登录。请联系管理员。</h1>
        </div>
      );
    } else if (playerToLogin === null) {
      return (
        <div className="statusInfo">
          <h1>登录失败，未找到该玩家。请联系管理员。</h1>
        </div>
      );
    } else {
      return placeRoutingTable();
    }
  }

  useEffect(() => {
    
    // dispatch(setTitle("Dummy Page"));
    // dispatch(setDescription("高端黑框框版"));
    if (loginPlayer.dbname === "") {
      
      dispatch(
        setLoginAsPlayer(playerToLogin || {dbname: "",
          name: "朋友",
          isPremium: false,
          games: [],} as Player
        )
      );
    }

  });

  return placeMainMenu();
};
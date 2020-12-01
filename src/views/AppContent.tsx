import { useEffect } from "react";
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
import I18nView from "./I18n";

import { Switch, Route, Redirect } from "react-router-dom";
import { selectLoginAsPlayer, setLoginAsPlayer } from "../features/login";
import { Player } from "../models/player.interface";

// import "./Dummy.scss";


const AppContentView = () => {

  const { isQueryLoading, queryError, player: playerToLogin } = usePlayerDetail(`${"player-billy"}`);

  const placeRoutingTable = () => {
    return (
      <Switch>
        <Route exact path="/">
          <Redirect to="/index" />
        </Route>
        <Route exact path="/index" component={HomeView}></Route>
        <Route exact path="/store" component={StoreView}></Route>
        <Route exact path="/store/games" component={StoreGamesListView}></Route>
        <Route exact path="/store/games/dbname/:dbname" component={StoreGamesDetailView}></Route>
        <Route exact path="/store/games/dbname/:dbname/cdkeys/index" component={StoreGamesCDKeyIndexView}></Route>
        <Route exact path="/store/games/dbname/:dbname/cdkeys" component={StoreGamesCDKeyListView}></Route>
        <Route exact path="/players/index" component={PlayerIndexView}></Route>
        <Route exact path="/players" component={PlayerListView}></Route>
        <Route exact path="/players/dbname/:dbname" component={PlayerDetailView}></Route>
        <Route exact path="/players/dbname/:dbname/games" component={PlayerGameListView}></Route>
        <Route exact path="/players/dbname/:dbname/cdkeys" component={PlayerCDKeyListView}></Route>
        <Route exact path="/cdkeys/index" component={CDKeyIndexView}></Route>
        <Route exact path="/cdkeys/id/:id" component={CDKeyDetailView}></Route>
        <Route exact path="/settings/i18n" component={I18nView}></Route>
        <Route component={HTTP404View}></Route>
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
    
    if (loginPlayer.dbname === "" && playerToLogin) {

      dispatch(
        setLoginAsPlayer(playerToLogin)
      );
    }

  });

  return placeMainMenu();
};

export default AppContentView;
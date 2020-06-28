import React from "react";
import { Route, Switch, Router, Redirect } from "wouter";
import { useSelector, useDispatch } from "react-redux";

import "./App.scss";
import Navbar from "./components/navbar";

import HomeView from "./views/Home";
import HTTP404View from "./views/HTTP404";

import { selectTitle, setTitle } from "./features/navbar";
import useHashLocation from "./router/useHashLocation";

const placeRoutingTable = () => {
  return (
    <Switch>
      <Route path="/">
        <Redirect to="/index" />
      </Route>
      <Route path="/index" component={HomeView}></Route>
      {/* <Route path="/users" component={UserListView}></Route>
      <Route path="/users/:dbname" component={UserDetailView}></Route> */}
      <Route path="/:rest*" component={HTTP404View}></Route>
    </Switch>
  );
};

export default () => {

  const title = useSelector(selectTitle);

  const onESCKeyDown = (e: React.KeyboardEvent) => {
    // e.preventDefault();

    switch (e.key) {
      case "GoBack":
      case "Escape":
      case "Cancel":
      case "Tab":
        window.history.back();
        break;
      default:
        break;
    }
  }


  return (

    <Router hook={useHashLocation}>

      <section className="App" tabIndex={0} onKeyDown={onESCKeyDown}>
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

                {placeRoutingTable()}

              </div>
            </main>

          </div>
        </div>
      </section>

    </Router>

  );
}


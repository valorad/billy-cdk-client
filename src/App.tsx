import React, { useEffect } from "react";
import { HashRouter as Router } from "react-router-dom";
import { useSelector } from "react-redux";
import MicroModal from "micromodal";

import "./App.scss";
import Navbar from "./components/navbar";
import Tips from "./components/tips";

import AppContentView from "./views/AppContent";

import { selectTitle, selectDescription } from "./features/navbar";
import useHashLocation from "./router/useHashLocation";
import { selectLoginAsPlayer } from "./features/login";
import { ApolloProvider } from "@apollo/client";
import GraphQLClient from "./app/graph";

const App = () => {

  // const { isQueryLoading, queryError, player: playerToLogin } = usePlayerDetail(`${"player-billy"}`);
  // const playerDisplayName = playerToLogin?.name || playerToLogin?.dbname;

  MicroModal.init();

  // const dispatch = useDispatch();
  const title = useSelector(selectTitle);
  const description = useSelector(selectDescription);
  const loginPlayer = useSelector(selectLoginAsPlayer);
  // const [isLoggingIn, setIsLoggingIn] = useState(true);

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

    <ApolloProvider client={GraphQLClient}>
      <Router>

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

                  <AppContentView />

                </div>
              </main>

            </div>
          </div>

          <Tips />
          
        </section>

      </Router>
    </ApolloProvider>

  );
}

export default App;
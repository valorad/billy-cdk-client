import React, { useEffect } from "react";
import { Router } from "wouter";
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

// const placeRoutingTable = () => {
//   return (
//     <Switch>
//       <Route path="/">
//         <Redirect to="/index" />
//       </Route>
//       <Route path="/index" component={HomeView}></Route>
//       <Route path="/store" component={StoreView}></Route>
//       <Route path="/store/games" component={StoreGamesListView}></Route>
//       <Route path="/store/games/dbname/:dbname" component={StoreGamesDetailView}></Route>
//       <Route path="/store/games/dbname/:dbname/cdkeys/index" component={StoreGamesCDKeyIndexView}></Route>
//       <Route path="/store/games/dbname/:dbname/cdkeys" component={StoreGamesCDKeyListView}></Route>
//       <Route path="/players/index" component={PlayerIndexView}></Route>
//       <Route path="/players" component={PlayerListView}></Route>
//       <Route path="/players/dbname/:dbname" component={PlayerDetailView}></Route>
//       <Route path="/players/dbname/:dbname/games" component={PlayerGameListView}></Route>
//       <Route path="/players/dbname/:dbname/cdkeys" component={PlayerCDKeyListView}></Route>
//       <Route path="/cdkeys/index" component={CDKeyIndexView}></Route>
//       <Route path="/cdkeys/id/:id" component={CDKeyDetailView}></Route>
//       <Route path="/:rest*" component={HTTP404View}></Route>
//     </Switch>
//   );
// };

// const requestLogIn = () => {
//   return new Promise<Player>((resolve, reject) => {
//     setTimeout(() => {
//       resolve({
//         dbname: "player-billy",
//         name: "Billy",
//         bio: "Master of CDKey!",
//         isPremium: true,
//         games: [
//           "game-cyberpunk2077"
//         ],
//       })
//     }, 500);
//   });
// }

export default () => {

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

  // const login = async (dbname: string, password: string) => {
  //   const playerToLogIn = await requestLogIn();
  //   dispatch(setLoginAsPlayer(playerToLogIn));
  //   setIsLoggingIn(false);
  // };

  // const placeMainMenu = () => {
  //   if (isQueryLoading) {
  //     return (
  //       <div className="statusInfo">
  //         <h1>登录中，请稍后...</h1>
  //       </div>
  //     );
  //   } else if (queryError || playerToLogin === undefined) {
  //     return (
  //       <div className="statusInfo">
  //         <h1>错误！无法登录。请联系管理员。</h1>
  //       </div>
  //     );
  //   } else if (playerToLogin === null) {
  //     return (
  //       <div className="statusInfo">
  //         <h1>登录失败，未找到该玩家。请联系管理员。</h1>
  //       </div>
  //     );
  //   } else {
  //     return placeRoutingTable();
  //   }
  // }

  useEffect(() => {

    // if (loginPlayer.dbname === "") {
    //   console.log("login");
      
    //   dispatch(
    //     setLoginAsPlayer(playerToLogin || {dbname: "",
    //       name: "朋友",
    //       isPremium: false,
    //       games: [],} as Player
    //     )
    //   );
    // }

  });

  return (

    <ApolloProvider client={GraphQLClient}>
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


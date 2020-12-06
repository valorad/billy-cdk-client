import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MicroModal from "micromodal";
import { t, Trans } from "@lingui/macro";

import GameDetail from "../../components/game/detail";
import DialogConfirmation from "../../components/modal/dialogConfirmation";
import DialogInput from "../../components/modal/dialogInput";

import { setTitle, setDescription } from "../../features/navbar";
import { MenuItem } from "../../models/menu.interface";
import { Game } from "../../models/game.interface";
import { useGameUpdate, useGameDeletion, useGameDetail } from "../../services/game";
import { InputDialogResult } from "../../models/dialog.interface";
import { selectLoginAsPlayer, setLoginAsPlayer } from "../../features/login";
import { usePlayerGameAddition } from "../../services/player";
import { CUDMessage } from "../../models/cudmessage.interface";


const GameDetailView = () => {

  const params: any = useParams();

  let dbname = params?.dbname || "game:non-existance";
  const name0 = t`A game of non-existence`;

  const dispatch = useDispatch();
  const { isQueryLoading, queryError, game } = useGameDetail(dbname);
  const gameDisplayName = game?.name || game?.dbname || name0;

  // logged in player
  const loggedInPlayer = useSelector(selectLoginAsPlayer);

  const [playerAddGame, { loading: isAddGameExecuting }] = usePlayerGameAddition(loggedInPlayer.dbname, game?.dbname || "");



  // test data
  // const game: Game = {
  //   dbname: dbname || "Game of Non-existance",
  //   description: "反正是个游戏，是个超级好玩的游戏。这里是一段简介，而且这段简介可不一般了，它：\n超级得长\n超级得宽\n超级得高",
  //   name: "某个游戏",
  //   price: 100,
  // };

  const purchasePopUp = () => {
    MicroModal.show("dialogConfirmation-purchaseAGame");
  };

  const editGamePopUp = () => {
    MicroModal.show("dialogInput-editGame");
  };

  const deleteGamePopUp = () => {
    MicroModal.show("dialogConfirmation-deleteGame");
  };

  let updatedGame = {} as Game;
  const [updateGame, { loading: isUpdateExecuting }] = useGameUpdate(updatedGame);
  const [deleteGame, { loading: isDeleteExecuting }] = useGameDeletion();

  const menus: MenuItem[] = [
    {
      name: t`Edit Game Information`, //"修改游戏信息"
      action: editGamePopUp,
    },
    {
      name: t`Delete From Store`, //"从商店删除"
      action: deleteGamePopUp,
    },
    {
      name: t`Manage the CDKeys of ${gameDisplayName}`, //`管理${gameDisplayName}的CDKey`
      link: `#/store/games/dbname/${dbname}/cdkeys/index`,
    },
  ];

  const doesPlayerOwnThisGame = loggedInPlayer?.games.includes(dbname) || false;

  // add but menu if game not owned by logged in player
  if (!doesPlayerOwnThisGame) {
    menus.unshift({
      name: t`Buy For Yourself`, //"为自己购买"
      action: purchasePopUp,
    });
  }

  const [addGameResponse, setAddGameResponse] = useState({} as CUDMessage);

  useEffect(() => {
    dispatch(setTitle(t`Game Details`)); //"游戏详情"
    dispatch(setDescription(gameDisplayName));
  });

  const placeGameDetail = () => {

    if (isQueryLoading) {
      return (
        <div className="statusInfo">
          <h1> <Trans>Loading</Trans>, <Trans>please wait</Trans>...</h1>
        </div>
      );
    } else if (queryError || game === undefined) {
      return (
        <div className="statusInfo">
          <h1><Trans>Error</Trans>! <Trans>Failed to retrieve game information.</Trans> <Trans>Please contact the administrator.</Trans></h1>
        </div>
      );
    } else if (game === null) {
      return (
        <div className="statusInfo">
          <h1><Trans>Error</Trans>! <Trans>Unable to find the game.</Trans> <Trans>Please contact the administrator.</Trans></h1>
        </div>
      );
    } else {
      return (
        <section className="GameDetail">

          {
            doesPlayerOwnThisGame?
            <h1><Trans>You have already owned this game.</Trans></h1>
            :null
          }

          <GameDetail game={game} menus={menus} />

          {
            isAddGameExecuting?
            <DialogConfirmation
              dialogID="dialogConfirmation-purchasingGame"
              mode="INFO"
              title={t`Purchasing` + `...`} //"购买中..."
              description={t`Purchasing the game for you` + `, ` + t`please wait` + `...`} //"正在为您购买游戏中，请稍后..."
              isAutoShown={true}
            />
            :null
          }

          {
            isUpdateExecuting?
            <DialogConfirmation
              dialogID="dialogConfirmation-updatingGame"
              mode="INFO"
              title={t`Updating` + `...`} //"修改中..."
              description={t`Updating the game information from the store` + `, ` + t`please wait` + `...`} //"正在修改商店游戏信息中，请稍后..."
              isAutoShown={true}
            />
            :null
          }

          {
            isDeleteExecuting?
            <DialogConfirmation
              dialogID="dialogConfirmation-deletingGame"
              mode="INFO"
              title={t`Deleting` + `...`} //"删除中..."
              description={t`Deleting the game from the store` + `, ` + t`please wait` + `...`} //"正在删除商店游戏中，请稍后..."
              isAutoShown={true}
            />
            :null
          }

          <DialogConfirmation
            dialogID="dialogConfirmation-failedToPurchaseAGame"
            mode="OKAY"
            title={t`Failure`}
            description={t`Failed to purchase the game, please try again later.` + ` ` + t`If in doubt, please do not hesitate to contact your administrator.`} //"购买游戏失败，请重试。如有疑问请联系管理员。"
            onFinish={() => {
              MicroModal.close("dialogConfirmation-failedToPurchaseAGame");
            }}
          />

          {
            !addGameResponse.ok && addGameResponse.message?
            <DialogConfirmation
              dialogID="dialogConfirmation-failedToPurchaseAGameOther"
              mode="OKAY"
              title={t`Failure`}
              description={`Failed to purchase the game, the reason is: ${addGameResponse.message}`} //`购买游戏失败，原因:${addGameResponse.message}`
              isAutoShown={true}
              onFinish={() => {
                MicroModal.close("dialogConfirmation-failedToPurchaseAGameOther");
              }}
            />:null
          }

          <DialogConfirmation
            dialogID="dialogConfirmation-failedToUpdateGame"
            mode="OKAY"
            title={t`Failure`}
            description={t`Failed to update the game information from the store, please try again later.` + ` ` + t`Please refer to the console or server logs for more details.`} //"修改商店游戏信息失败，请重试。更多详情请查阅控制台或后台记录。"
            onFinish={() => {
              MicroModal.close("dialogConfirmation-failedToUpdateGame");
              MicroModal.show("dialogInput-editGame");
            }}
          />

          <DialogConfirmation
            dialogID="dialogConfirmation-failedToDeleteGame"
            mode="OKAY"
            title={t`Failure`}
            description={t`Failed to delete the game from the store, please try again later.` + ` ` + t`Please refer to the console or server logs for more details.`} //"删除商店游戏失败，请重试。更多详情请查阅控制台或后台记录。"
            onFinish={() => {
              MicroModal.close("dialogConfirmation-failedToDeleteGame");
            }}
          />

          <DialogConfirmation
            dialogID="dialogConfirmation-purchaseAGame"
            mode="YESNO"
            title={t`Purchase ${gameDisplayName}`} //购买${gameDisplayName}
            description={t`You are about to purchase ${gameDisplayName} for yourself.` + ` ` + t`Do you wish to proceed?`} // 即将为您自己购买${gameDisplayName}，是否继续？
            onFinish={async () => {

              MicroModal.close("dialogConfirmation-purchaseAGame");

              let mutationTuple: any = {};
              try {
                mutationTuple = await playerAddGame({variables: {
                  player: loggedInPlayer.dbname,
                  game: dbname,
                }});
              } catch (error) {
                MicroModal.show("dialogConfirmation-failedToPurchaseAGame");
                console.error(error);
                return;
              }

              if (!mutationTuple.data.playerAddGame) {
                MicroModal.show("dialogConfirmation-failedToPurchaseAGame");
                return;
              }

              setAddGameResponse({...mutationTuple.data.playerAddGame})

              if (mutationTuple.data.playerAddGame.ok) {
                

                // sync local store
                dispatch(
                  setLoginAsPlayer(
                    {
                      ...loggedInPlayer,
                      games: [
                        ...loggedInPlayer.games,
                        dbname,
                      ]
                    }
                  )
                );

                window.location.href = `#/players/dbname/${loggedInPlayer.dbname}/games`;
              }

            }}
          />

          <DialogInput
            dialogID="dialogInput-editGame"
            title={t`Edit information: ${gameDisplayName}`} // 编辑信息: ${gameDisplayName}
            description="Please fill in the information below."
            items={[
              {
                propName: "name",
                name: t`Game Name`, //"游戏名称"
                value: gameDisplayName,
                isRequired: true,
              },
              {
                propName: "description",
                name: t`Game Description`, //"游戏简介"
                value: game.description || "",
                type: "textArea",
              },
              {
                propName: "price",
                name: t`Game Price`, //"游戏售价"
                value: game.price,
                type: "number",
                isRequired: true,
              },
            ]}
            onFinish={async (result: InputDialogResult<any>) => {
              
              if (!result.ok) {
                return;
              }
    
              MicroModal.close("dialogInput-editGame");
              
              // edit game
              const updateToken = JSON.stringify({
                  $set: result.data
              })

              try {
                await updateGame({variables: {
                  dbname: dbname,
                  token: updateToken,
                }});
              } catch (error) {
                console.error(error);
                MicroModal.show("dialogConfirmation-failedToUpdateGame");
                return;
              }
    
              window.location.href = `#/store/games/dbname/${dbname}`;

            }}
          />

          <DialogConfirmation
            dialogID="dialogConfirmation-deleteGame"
            title={t`Delete Game From Store: ${gameDisplayName}`} // `删除商店游戏: ${gameDisplayName}`
            description={t`Warning! This cannot be undone!`}
            onFinish={async () => {
              MicroModal.close("dialogConfirmation-deleteGame");

              // update user
              try {
                await deleteGame({variables: {
                  dbname: dbname
                }});
              } catch (error) {
                console.error(error);
                MicroModal.show("dialogConfirmation-failedToDeleteGame");
                return;
              }

              window.location.href = `#/store/games`;

            }}
          />

        </section>
      );
    }

  };



  return (
    <section className="StoreGameDetail">

      {placeGameDetail()}

      {/* {dialogComponents} */}

      

    </section>
  );
};

export default GameDetailView;
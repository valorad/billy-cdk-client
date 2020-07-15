import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRoute } from "wouter";
import MicroModal from "micromodal";

import GameDetail from "../../components/game/detail";
import DialogConfirmation from "../../components/modal/dialogConfirmation";
import DialogInput from "../../components/modal/dialogInput";

import { setTitle, setDescription } from "../../features/navbar";
import { MenuItem } from "../../models/menu.interface";
import { Game } from "../../models/game.interface";
import { useGameUpdate, useGameDeletion, useGameDetail } from "../../services/game";
import { InputDialogResult } from "../../models/dialog.interface";
import { selectLoginAsPlayer } from "../../features/login";


export default () => {

  const params = useRoute("/store/games/dbname/:dbname")[1];

  let dbname = params?.dbname || "game:non-existance";
  const name0 = "不存在的游戏";

  const dispatch = useDispatch();
  const { isQueryLoading, queryError, game } = useGameDetail(dbname);
  const gameDisplayName = game?.name || game?.dbname || name0;

  // logged in player
  const loggedInPlayer = useSelector(selectLoginAsPlayer);



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
      name: "修改游戏信息",
      action: editGamePopUp,
    },
    {
      name: "从商店删除",
      action: deleteGamePopUp,
    },
    {
      name: `管理${gameDisplayName}的CDKey`,
      link: `#/store/games/dbname/${dbname}/cdkeys/index`,
    },
  ];

  const doesPlayerOwnThisGame = loggedInPlayer?.games.includes(dbname) || false;

  // add but menu if game not owned by logged in player
  if (!doesPlayerOwnThisGame) {
    menus.unshift({
      name: "为自己购买",
      action: purchasePopUp,
    });
  }

  useEffect(() => {

    dispatch(setTitle("游戏详情"));
    dispatch(setDescription(gameDisplayName));
    
  });

  const placeGameDetail = () => {

    if (isQueryLoading) {
      return (
        <div className="statusInfo">
          <h1>载入中，请稍后...</h1>
        </div>
      );
    } else if (queryError || game === undefined) {
      return (
        <div className="statusInfo">
          <h1>错误！无法进行游戏查询。请联系管理员。</h1>
        </div>
      );
    } else if (game === null) {
      return (
        <div className="statusInfo">
          <h1>错误！未找到该游戏。请联系管理员。</h1>
        </div>
      );
    } else {
      return (
        <section className="GameDetail">

          {
            doesPlayerOwnThisGame?
            <h1>您已拥有此游戏。</h1>
            :null
          }

          <GameDetail game={game} menus={menus} />

          {
            isUpdateExecuting?
            <DialogConfirmation
              dialogID="dialogConfirmation-updatingGame"
              mode="INFO"
              title="修改中..."
              description="正在修改商店游戏信息中，请稍后..."
              isAutoShown={true}
            />
            :null
          }

          {
            isDeleteExecuting?
            <DialogConfirmation
              dialogID="dialogConfirmation-deletingGame"
              mode="INFO"
              title="删除中..."
              description="正在删除商店游戏中，请稍后..."
              isAutoShown={true}
            />
            :null
          }

          <DialogConfirmation
            dialogID="dialogConfirmation-failedToUpdateGame"
            mode="OKAY"
            title="失败"
            description="修改商店游戏信息失败，请重试。更多详情请查阅控制台或后台记录。"
            onFinish={() => {
              MicroModal.close("dialogConfirmation-failedToUpdateGame");
              MicroModal.show("dialogInput-editGame");
            }}
          />

          <DialogConfirmation
            dialogID="dialogConfirmation-failedToDeleteGame"
            mode="OKAY"
            title="失败"
            description="删除商店游戏失败，请重试。更多详情请查阅控制台或后台记录。"
            onFinish={() => {
              MicroModal.close("dialogConfirmation-failedToDeleteGame");
            }}
          />

          <DialogConfirmation
            dialogID="dialogConfirmation-purchaseAGame"
            mode="YESNO"
            title={`购买${gameDisplayName}`}
            description={`即将为您自己购买${gameDisplayName}，是否继续？`}
            onFinish={async () => {
              console.log(`Purchase game ${gameDisplayName} for player ${"Billy"} success`);
              MicroModal.close(`dialogConfirmation-purchaseAGame`);
            }}
          />

          <DialogInput
            dialogID="dialogInput-editGame"
            title={`编辑信息: ${gameDisplayName}`}
            description="请填写以下信息"
            items={[
              {
                propName: "name",
                name: "游戏名称",
                value: gameDisplayName,
                isRequired: true,
              },
              {
                propName: "description",
                name: "游戏简介",
                value: game.description || "",
                type: "textArea",
              },
              {
                propName: "price",
                name: "游戏售价",
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
            title={`删除商店游戏: ${gameDisplayName}`}
            description={"警告！此操作无法回滚！"}
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
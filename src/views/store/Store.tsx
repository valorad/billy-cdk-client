import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import MicroModal from "micromodal";

// import "./Store.scss";
import { MenuItem } from "../../models/menu.interface";

import Menu from "../../components/menu";
import DialogInput from "../../components/modal/dialogInput";
import DialogConfirmation from "../../components/modal/dialogConfirmation";

import { setTitle, setDescription } from "../../features/navbar";
import { InputDialogResult } from "../../models/dialog.interface";
import { Game } from "../../models/game.interface";
import { useGameAddition } from "../../services/game";


export default () => {

  const dispatch = useDispatch();

  const createGamePopUp = () => {
    MicroModal.show("dialogInput-createGame");
  };

  const menus: MenuItem[] = [
    {
      name: "商店游戏列表",
      link: "#/store/games",
    },
    {
      name: "发布新游戏",
      action: createGamePopUp,
    },
  ];

  useEffect(() => {
    
    dispatch(setTitle("Billy游戏商店"));
    dispatch(setDescription("浏览游戏列表，或是发布一款新游戏"));
    
  });

  let newGame = {} as Game;

  const [addGame, { loading: isAddExecuting, error: addError }] = useGameAddition(newGame);

  return (
    <section className="Store">
      <Menu menus={menus} />

      <DialogConfirmation
        dialogID="dialogConfirmation-failedToCreateGame"
        mode="OKAY"
        title="失败"
        description="创建新游戏失败，请重试。更多详情请查阅控制台或后台记录。"
        onFinish={() => {
          MicroModal.close("dialogConfirmation-failedToCreateGame");
          MicroModal.show("dialogInput-createGame");
        }}
      />

      {
        isAddExecuting?
        <DialogConfirmation
          dialogID="dialogConfirmation-creatingGame"
          mode="INFO"
          title="创建中..."
          description="正在创建新游戏中，请稍后..."
          isAutoShown={true}
        />
        :null
      }

      <DialogInput
        dialogID="dialogInput-createGame"
        title={`创建新游戏`}
        description="请填写以下信息"
        items={[
          {
            propName: "dbname",
            name: "游戏ID",
            value: "game-<请替换英文ID>",
            isRequired: true,
          },
          {
            propName: "name",
            name: "游戏名称",
            value: "",
            isRequired: true,
          },
          {
            propName: "description",
            name: "游戏简介",
            value: "",
            type: "textArea",
          },
          {
            propName: "price",
            name: "游戏售价",
            value: 0,
            type: "number",
            isRequired: true,
          },
        ]}
        onFinish={async (result: InputDialogResult<any>) => {

          newGame = {
            price: 0,
            ...result.data
          };
          if (!result.ok) {
            return;
          }

          MicroModal.close("dialogInput-createGame");

          try {
            await addGame({variables: {
              newGame: newGame
            }});
          } catch (error) {
            MicroModal.show("dialogConfirmation-failedToCreateGame");
            console.error(error);
            return;
          }

          window.location.href = `#/store/games/dbname/${newGame.dbname}`;
        }}

      />


    </section>
  );
};
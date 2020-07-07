import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRoute } from "wouter";
import MicroModal from "micromodal";

import GameDetail from "../../components/game/detail";
import DialogConfirmation from "../../components/modal/dialogConfirmation";
import DialogInput from "../../components/modal/dialogInput";

import { setTitle, setDescription } from "../../features/navbar";
import { MenuItem } from "../../models/menu.interface";
import { Game } from "../../models/game.interface";


export default () => {

  const params = useRoute("/store/games/dbname/:dbname")[1];

  let dbname = params?.dbname;

  const dispatch = useDispatch();

  const game: Game = {
    dbname: dbname || "Game of Non-existance",
    description: "反正是个游戏，是个超级好玩的游戏。这里是一段简介，而且这段简介可不一般了，它：\n超级得长\n超级得宽\n超级得高",
    name: "某个游戏",
    price: 100,
  };

  const [editDialogResult, setEditDialogResult] = useState({});

  const purchase = () => {
    MicroModal.show("dialogConfirmation-purchase");
  };

  const editGame = () => {
    MicroModal.show("dialogInput-edit");
  };

  const deleteGame = () => {
    MicroModal.show("dialogConfirmation-delete");
  };

  const dialogs = [
    {
      dialogID: "dialogConfirmation-purchase",
      type: "confirmation",
      title: `购买${game.dbname}`,
      description: "是否要继续？",
      onFinish: () => {
        console.log(`Purchase game ${game.dbname} for player "Billy" success`);
        MicroModal.close(`dialogConfirmation-purchase`);
      },
    },
    {
      dialogID: "dialogInput-edit",
      type: "input",
      title: `编辑${game.dbname}`,
      description: "请填写以下信息",
      items: [
        {
          propName: "gameName",
          name: "游戏名称",
          value: game.name,
        },
        {
          propName: "gameDescription",
          name: "游戏简介",
          value: game.description,
          type: "textArea",
        },
        {
          propName: "gamePrice",
          name: "游戏售价",
          value: game.price,
          type: "number",
        },
      ],
      onFinish: (data: any) => {
        setEditDialogResult({...editDialogResult, data});
        console.log(data);
      },
    },
    {
      dialogID: "dialogConfirmation-delete",
      type: "confirmation",
      title: `删除${game.dbname}`,
      description: "警告！操作将无法恢复！",
      onFinish: () => {
        console.log(`Delete boom boom boom`);
        MicroModal.close("dialogConfirmation-delete");
      },
    }
  ];

  const menus: MenuItem[] = [
    {
      name: "为自己购买",
      action: purchase,
    },
    {
      name: "修改游戏信息",
      action: editGame,
    },
    {
      name: "从商店删除",
      action: deleteGame,
    },
  ];

  const dialogComponents = dialogs.map((ele: any) => {

    switch (ele.type) {
      case "confirmation":
        return (
          <DialogConfirmation
            key={ele.dialogID}
            dialogID={ele.dialogID}
            title={ele.title}
            description={ele.description}
            onFinish={ele.onFinish}
          />
        );
      case "input":
        return (
          <DialogInput
            key={ele.dialogID}
            dialogID={ele.dialogID}
            title={ele.title}
            description={ele.description}
            items={ele.items}
            onFinish={ele.onFinish}
          />
        );
      default:
        return null;
    }
    
  });

  useEffect(() => {

    dispatch(setTitle("游戏详情"));
    dispatch(setDescription(game.name));
    

  });

  return (
    <section className="StoreGameDetail">

      <GameDetail game={game} menus={menus} />

      {dialogComponents}

    </section>
  );
};
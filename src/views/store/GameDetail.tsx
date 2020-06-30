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

  const params = useRoute("/store/games/:dbname")[1];

  let dbname = params?.dbname;

  const dispatch = useDispatch();

  const game: Game = {
    dbname: dbname || "Game of Non-existance",
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
      dialogID: "purchase",
      type: "confirmation",
      title: "Are you sure purchase?",
      description: "Yes / No",
      onFinish: () => {
        console.log(`Purchase game ${game.dbname} for player "Billy" success`);
        MicroModal.close("dialogConfirmation-purchase");
      },
    },
    {
      dialogID: "edit",
      type: "input",
      title: `Editting ${game.dbname}`,
      description: "Fill out the form below",
      onFinish: (data: any) => {
        setEditDialogResult({...editDialogResult, data});
        console.log(data);
      },
    },
    {
      dialogID: "delete",
      type: "confirmation",
      title: "Are you sure delete?",
      description: "Yes / No",
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
            onFinish={ele.onFinish}
          />
        );
      default:
        return null;
    }
    
  });

  useEffect(() => {

    dispatch(setTitle(game.name));
    dispatch(setDescription(`dbname: ${game.dbname}`));
    

  });

  return (
    <section className="StoreGameDetail">

      <GameDetail game={game} menus={menus} />

      {dialogComponents}

    </section>
  );
};
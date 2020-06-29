import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRoute } from "wouter";
import MicroModal from "micromodal";

import GameDetail from "../../components/game/detail";
import DialogConfirmation from "../../components/modal/dialogConfirmation";
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

  const purchase = () => {
    MicroModal.show("dialogConfirmation-purchase");
  };

  const editGame = () => {
    MicroModal.show("dialogConfirmation-edit");
  };

  const deleteGame = () => {
    MicroModal.show("dialogConfirmation-delete");
  };

  const dialogs = [
    {
      dialogID: "purchase",
      title: "Are you sure purchase?",
      content: "Yes / No",
      onResultOkay: () => {
        console.log(`Purchase game ${game.dbname} for player "Billy" success`);
        MicroModal.close("dialogConfirmation-purchase");
      },
    },
    {
      dialogID: "edit",
      title: "Are you sure edit?",
      content: "Yes / No",
      onResultOkay: () => {
        console.log(`edit boom boom boom`);
        MicroModal.close("dialogConfirmation-edit");
      },
    },
    {
      dialogID: "delete",
      title: "Are you sure delete?",
      content: "Yes / No",
      onResultOkay: () => {
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

  const dialogComponents = dialogs.map((ele) => {
    return (
      <DialogConfirmation
        key={ele.dialogID}
        dialogID={ele.dialogID}
        title={ele.title}
        content={ele.content}
        onResultOkay={ele.onResultOkay}
      />
    );
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
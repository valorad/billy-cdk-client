import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import MicroModal from "micromodal";

import { setTitle, setDescription } from "../../features/navbar";
import { MenuItem } from "../../models/menu.interface";
import { useRoute } from "wouter";
import { Player } from "../../models/player.interface";


import PlayerDetail from "../../components/player/detail";
import DialogConfirmation from "../../components/modal/dialogConfirmation";
import DialogInput from "../../components/modal/dialogInput";

// import "./Dummy.scss";

export default () => {

  const params = useRoute("/players/dbname/:dbname")[1];

  let dbname = params?.dbname || "mr-stranger";

  const dispatch = useDispatch();

  const player: Player = {
    dbname: dbname,
    name: "Angular Biter",
    bio: "Angular biter's Ding-ding gas station: Zu zu zu zu zu!",
    isPremium: false,
    games: [],
  };

  const [editDialogResult, setEditDialogResult] = useState({});
  const editPlayer = () => {
    MicroModal.show("dialogInput-editPlayer");
  };

  const deletePlayer = () => {
    MicroModal.show("dialogConfirmation-deletePlayer");
  };

  const menus: MenuItem[] = [
    {
      name: "查看TA的游戏库",
      link: `#/players/dbname/${dbname}/games`,
    },
    {
      name: "查看TA的CDKey库存",
      link: `#/players/dbname/${dbname}/cdkeys`,
    },
    {
      name: "编辑玩家信息",
      action: editPlayer,
    },
    {
      name: "删除玩家",
      action: deletePlayer,
    },
  ];

  useEffect(() => {
    
    dispatch(setTitle("玩家详情"));
    dispatch(setDescription(player.name));
    
  });


  return (
    <section className="PlayerDetail">
      <PlayerDetail player={player} menus={menus} />

      <DialogInput
        dialogID="dialogInput-editPlayer"
        title={`编辑信息:${player.dbname}`}
        description="请填写以下信息"
        items={[
          {
            propName: "name",
            name: "玩家名称",
            value: player.name,
          },
        ]}
        onFinish={(data: any) => {
          setEditDialogResult({...editDialogResult, data});
          console.log(data);
        }}
      />

      <DialogConfirmation
        dialogID="dialogConfirmation-deletePlayer"
        title={`删除玩家:${player.dbname}`}
        description={"警告！此操作无法回滚！"}
        onFinish={() => {
          console.log(`Delete boom boom boom`);
          MicroModal.close("dialogConfirmation-deletePlayer");
        }}
      />


    </section>
  );
};
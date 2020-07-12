import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import MicroModal from "micromodal";

import Menu from "../../components/menu";
import DialogInput from "../../components/modal/dialogInput";
import DialogConfirmation from "../../components/modal/dialogConfirmation";

import { setTitle, setDescription } from "../../features/navbar";
import { MenuItem } from "../../models/menu.interface";
import { InputDialogResult, DialogInputItem } from "../../models/dialog.interface";
import { usePlayerAddition } from "../../services/player";
import { Player } from "../../models/player.interface";

// import "./Player.scss";

export default () => {

  const dispatch = useDispatch();

  useEffect(() => {
    
    dispatch(setTitle("玩家管理"));
    dispatch(setDescription("查看玩家列表或新增一名玩家。目前所有玩家都是您的好友。"));
    
  });

  // const [createDialogResult, setCreateDialogResult] = useState({});

  const createPlayer = () => {
    MicroModal.show("dialogInput-createPlayer");
  };

  const menus: MenuItem[] = [
    {
      name: "玩家列表",
      link: "#/players",
    },
    {
      name: "新增玩家",
      action: createPlayer,
    },
  ];

  const inputItems: DialogInputItem[] = [
    {
      propName: "dbname",
      name: "玩家ID",
      value: "player-<请替换英文ID>",
      isRequired: true,
    },
    {
      propName: "name",
      name: "玩家名称",
      value: "",
      isRequired: true,
    },
    {
      propName: "bio",
      name: "玩家简介",
      value: "",
      type: "textArea",
    },
    {
      propName: "isPremium",
      name: "任命玩家为黄金高端土豪会员",
      value: false,
      type: "checkBox",
    },
  ];

  let newPlayer = {} as Player;

  const [addPlayer, { loading: isAddExecuting, error: addError }] = usePlayerAddition(newPlayer);

  // const onCreatePlayerFinish = async (result: InputDialogResult<any>) => {
    

  //   newPlayer = {
  //     isPremium: false,
  //     ...result.data
  //   };
  //   if (!result.ok) {
  //     return;
  //   }

  //   MicroModal.close("dialogInput-createPlayer");
    
  //   // create new user
  //   await addPlayer({variables: {
  //     newPlayer: newPlayer
  //   }});

  //   // <- will stop here automatically if addPlayer fails

  //   window.location.href = `#/players/dbname/${newPlayer.dbname}`;


  // };

  
  


  return (
    <section className="Player">
      {/* Each page must have at least 1 and only 1 menu */}
      <Menu menus={menus} />

      <DialogConfirmation
        dialogID="dialogConfirmation-failedToCreatePlayer"
        mode="OKAY"
        title="添加玩家"
        description="添加玩家失败，请重试。更多详情请查阅控制台或后台记录。"
        onFinish={() => {
          MicroModal.close("dialogConfirmation-failedToCreatePlayer");
          MicroModal.show("dialogInput-createPlayer");
        }}
      />

      {
        isAddExecuting?
        <DialogConfirmation
          dialogID="dialogConfirmation-creatingPlayer"
          mode="INFO"
          title="添加玩家"
          description="正在添加玩家中，请稍后..."
          isAutoShown={true}
        />
        :null
      }

      <DialogInput
        dialogID="dialogInput-createPlayer"
        title={`添加新玩家`}
        description="请填写以下信息"
        items={inputItems}
        onFinish={async (result: InputDialogResult<any>) => {

          newPlayer = {
            isPremium: false,
            ...result.data
          };
          if (!result.ok) {
            return;
          }

          MicroModal.close("dialogInput-createPlayer");

          try {
            await addPlayer({variables: {
              newPlayer: newPlayer
            }});
          } catch (error) {
            MicroModal.show("dialogConfirmation-failedToCreatePlayer");
            console.log(addError);
            return;
          }

          window.location.href = `#/players/dbname/${newPlayer.dbname}`;
          
        }}
      />

    </section>
  );
};
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import MicroModal from "micromodal";
import { t } from "@lingui/macro";

import Menu from "../../components/menu";
import DialogInput from "../../components/modal/dialogInput";
import DialogConfirmation from "../../components/modal/dialogConfirmation";

import { setTitle, setDescription } from "../../features/navbar";
import { MenuItem } from "../../models/menu.interface";
import { InputDialogResult, DialogInputItem } from "../../models/dialog.interface";
import { usePlayerAddition } from "../../services/player";
import { Player } from "../../models/player.interface";

// import "./Player.scss";

const PlayerView = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    
    dispatch(setTitle(t`Player Management`)); //"玩家管理"
    dispatch(setDescription(t`You can take a look at the player list, or add a new player.` + t`Currently all the players are your friends.`)); //"查看玩家列表或新增一名玩家。目前所有玩家都是您的好友。"
    
  });

  const createPlayer = () => {
    MicroModal.show("dialogInput-createPlayer");
  };

  const menus: MenuItem[] = [
    {
      name: t`Player List`, //"玩家列表",
      link: "#/players",
    },
    {
      name: t`Add a new player`, //"新增玩家",
      action: createPlayer,
    },
  ];

  const inputItems: DialogInputItem[] = [
    {
      propName: "dbname",
      name: t`Player ID`, //"玩家ID",
      value: `player-<` + t`replace w/ alphabetic ID` + `>`, // "player-<请替换英文ID>",
      isRequired: true,
    },
    {
      propName: "name",
      name: t`Player Name`, //"玩家名称",
      value: "",
      isRequired: true,
    },
    {
      propName: "bio",
      name: t`Player Biography`, //"玩家简介",
      value: "",
      type: "textArea",
    },
    {
      propName: "isPremium",
      name: t`Nominate as Tuhao Premium Member`, //"任命玩家为黄金高端土豪会员",
      value: false,
      type: "checkBox",
    },
  ];

  let newPlayer = {} as Player;

  const [addPlayer, { loading: isAddExecuting }] = usePlayerAddition(newPlayer);

  return (
    <section className="Player">
      {/* Each page must have at least 1 and only 1 menu */}
      <Menu menus={menus} />

      <DialogConfirmation
        dialogID="dialogConfirmation-failedToCreatePlayer"
        mode="OKAY"
        title={t`Failure`}
        description={t`Failed to add the player, please retry.` + ` ` + t`Please refer to the console or server logs for more details.`} //"添加玩家失败，请重试。更多详情请查阅控制台或后台记录。"
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
          title={t`Adding` + `...`} //"添加中..."
          description={t`Adding a new player` + `, ` + t`please wait` + "..."}  // "正在添加玩家中，请稍后..."
          isAutoShown={true}
        />
        :null
      }

      <DialogInput
        dialogID="dialogInput-createPlayer"
        title={t`Add A New Player`} // `添加新玩家`
        description={t`Please fill in the information below.`} // "请填写以下信息"
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
            console.error(error);
            return;
          }

          window.location.href = `#/players/dbname/${newPlayer.dbname}`;
          
        }}
      />

    </section>
  );
};

export default PlayerView;
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import MicroModal from "micromodal";
import { t, Trans } from "@lingui/macro";

import { setTitle, setDescription } from "../../features/navbar";
import { MenuItem } from "../../models/menu.interface";
import { useParams } from "react-router-dom";
import { Player } from "../../models/player.interface";


import PlayerDetail from "../../components/player/detail";
import DialogConfirmation from "../../components/modal/dialogConfirmation";
import DialogInput from "../../components/modal/dialogInput";
import { usePlayerDetail, usePlayerUpdate, usePlayerDeletion } from "../../services/player";
import { InputDialogResult } from "../../models/dialog.interface";

const PlayerDetailView = () => {

  const params: any = useParams();

  let dbname = params?.dbname || "mr-stranger";
  const name0 = t`Mr. Stranger`;

  const dispatch = useDispatch();
  const { isQueryLoading, queryError, player } = usePlayerDetail(dbname);
  const playerDisplayName = player?.name || player?.dbname || name0;

  // test data
  // const player: Player = {
  //   dbname: dbname,
  //   name: "Angular Biter",
  //   bio: "Angular biter's Ding-ding gas station: Zu zu zu zu zu!",
  //   isPremium: true,
  //   games: [],
  // };

  const editPlayerPopUp = () => {
    MicroModal.show("dialogInput-editPlayer");
  };

  const deletePlayerPopUp = () => {
    MicroModal.show("dialogConfirmation-deletePlayer");
  };

  const menus: MenuItem[] = [
    {
      name: t`View His/Her Game Inventory`, //"查看TA的游戏库",
      link: `#/players/dbname/${dbname}/games`,
    },
    {
      name: t`View His/Her CDKey Inventory`, //"查看TA的CDKey库存",
      link: `#/players/dbname/${dbname}/cdkeys`,
    },
    {
      name: t`Edit Player`, //"编辑玩家信息",
      action: editPlayerPopUp,
    },
    {
      name: t`Delete Player`, //"删除玩家",
      action: deletePlayerPopUp,
    },
  ];

  useEffect(() => {
    
    dispatch(setTitle(t`Player Details`)); // "玩家详情"
    dispatch(setDescription(playerDisplayName));
    
  });

  // during test
  // const placePlayerList = () => {
  //   return (
        // <section className="PlayerDetail">
        //   <PlayerDetail player={player} menus={menus} />

        //   <DialogInput
        //     dialogID="dialogInput-editPlayer"
        //     title={`编辑信息:${player.dbname}`}
        //     description="请填写以下信息"
        //     items={[
        //       {
        //         propName: "name",
        //         name: "玩家名称",
        //         value: player.name || player.dbname,
        //         isRequired: true,
        //       },
        //       {
        //         propName: "isPremium",
        //         name: "是黄金高端土豪会员",
        //         value: player.isPremium,
        //         type: "checkBox",
        //       },
        //     ]}
        //     onFinish={(data: any) => {
        //       setEditDialogResult({...editDialogResult, data});
        //       console.log(data);
        //     }}
        //   />

        //   <DialogConfirmation
        //     dialogID="dialogConfirmation-deletePlayer"
        //     title={`删除玩家:${player.dbname}`}
        //     description={"警告！此操作无法回滚！"}
        //     onFinish={() => {
        //       console.log(`Delete boom boom boom`);
        //       MicroModal.close("dialogConfirmation-deletePlayer");
        //     }}
        //   />

        // </section>
  //   );
  // };

  let updatedPlayer = {} as Player;
  const [updatePlayer, { loading: isUpdateExecuting }] = usePlayerUpdate(updatedPlayer);
  const [deletePlayer, { loading: isDeleteExecuting }] = usePlayerDeletion();

  const placePlayerDetail = () => {

    if (isQueryLoading) {
      return (
        <div className="statusInfo">
          <h1><Trans>Loading</Trans>, <Trans>please wait</Trans>...</h1>
        </div>
      );
    } else if (queryError || player === undefined) {
      return (
        <div className="statusInfo">
          <h1><Trans>Error</Trans>! <Trans>Failed to load player data.</Trans> <Trans>Please contact the administrator.</Trans> </h1>
        </div>
      );
    } else if (player === null) {
      return (
        <div className="statusInfo">
          <h1><Trans>Error</Trans>! <Trans>Unable to find the player.</Trans> <Trans>Please contact the administrator.</Trans></h1>
        </div>
      );
    } else {
      return (
        <section className="PlayerDetail">
          <PlayerDetail player={player} menus={menus} />

          {
            isUpdateExecuting?
            <DialogConfirmation
              dialogID="dialogConfirmation-updatingPlayer"
              mode="INFO"
              title={t`Updating` + `...`} //"修改中..."
              description={t`Updating player information` + `, ` + t`please wait` + `...`} //"正在修改玩家信息中，请稍后..."
              isAutoShown={true}
            />
            :null
          }

          {
            isDeleteExecuting?
            <DialogConfirmation
              dialogID="dialogConfirmation-deletingPlayer"
              mode="INFO"
              title={t`Deleting` + `...`}
              description={t`Deleting player` + `, ` + t`please wait` + `...`} // "正在删除玩家中，请稍后..."
              isAutoShown={true}
            />
            :null
          }

          <DialogConfirmation
            dialogID="dialogConfirmation-failedToUpdatePlayer"
            mode="OKAY"
            title={t`Failure`}
            description={t`Failed to edit the player, please retry.` + ` ` + t`Please refer to the console or server logs for more details.`} // "修改玩家信息失败，请重试。更多详情请查阅控制台或后台记录。"
            onFinish={() => {
              MicroModal.close("dialogConfirmation-failedToUpdatePlayer");
              MicroModal.show("dialogInput-editPlayer");
            }}
          />

          <DialogConfirmation
            dialogID="dialogConfirmation-failedToDeletePlayer"
            mode="OKAY"
            title={t`Failure`}
            description={t`Failed to delete the player, please retry.` + ` ` + t`Please refer to the console or server logs for more details.`} //"删除玩家失败，请重试。更多详情请查阅控制台或后台记录。"
            onFinish={() => {
              MicroModal.close("dialogConfirmation-failedToDeletePlayer");
            }}
          />

          <DialogInput
            dialogID="dialogInput-editPlayer"
            title={t`Edit information: ${playerDisplayName}`} //`编辑信息: ${playerDisplayName}`
            description={t`Please fill in the information below.`} //"请填写以下信息"
            items={[
              {
                propName: "name",
                name: t`Player Name`, //"玩家名称",
                value: playerDisplayName,
                isRequired: true,
              },
              {
                propName: "bio",
                name: t`Player Biography`, //"玩家简介",
                value: player.bio || "",
                type: "textArea",
              },
              {
                propName: "isPremium",
                name: t`Is Tuhao Premium Member`, //"是黄金高端土豪会员",
                value: player.isPremium,
                type: "checkBox",
              },
            ]}
            onFinish={async (result: InputDialogResult<any>) => {
              
              if (!result.ok) {
                return;
              }
    
              MicroModal.close("dialogInput-editPlayer");
              
              // edit player
              const updateToken = JSON.stringify({
                  $set: result.data
              })

              try {
                await updatePlayer({variables: {
                  dbname: dbname,
                  token: updateToken,
                }});
              } catch (error) {
                console.error(error);
                MicroModal.show("dialogConfirmation-failedToUpdatePlayer");
                return;
              }
    
              window.location.href = `#/players/dbname/${dbname}`;

            }}
          />

          <DialogConfirmation
            dialogID="dialogConfirmation-deletePlayer"
            title={t`Delete Player: ${playerDisplayName}`} //`删除玩家: ${playerDisplayName}`
            description={t`Warning! This cannot be undone!`} //"警告！此操作无法回滚！"
            onFinish={async () => {
              MicroModal.close("dialogConfirmation-deletePlayer");

              // update user
              try {
                await deletePlayer({variables: {
                  dbname: dbname
                }});
              } catch (error) {
                console.error(error);
                MicroModal.show("dialogConfirmation-failedToDeletePlayer");
                return;
              }

              window.location.href = `#/players`;

            }}
          />

        </section>
      );
    }

  };

  return placePlayerDetail();
};

export default PlayerDetailView;
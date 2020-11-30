import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import MicroModal from "micromodal";

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
  const name0 = "神秘的陌生人";

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
      name: "查看TA的游戏库",
      link: `#/players/dbname/${dbname}/games`,
    },
    {
      name: "查看TA的CDKey库存",
      link: `#/players/dbname/${dbname}/cdkeys`,
    },
    {
      name: "编辑玩家信息",
      action: editPlayerPopUp,
    },
    {
      name: "删除玩家",
      action: deletePlayerPopUp,
    },
  ];

  useEffect(() => {
    
    dispatch(setTitle("玩家详情"));
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
          <h1>载入中，请稍后...</h1>
        </div>
      );
    } else if (queryError || player === undefined) {
      return (
        <div className="statusInfo">
          <h1>错误！无法进行玩家查询。请联系管理员。</h1>
        </div>
      );
    } else if (player === null) {
      return (
        <div className="statusInfo">
          <h1>错误！未找到该玩家。请联系管理员。</h1>
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
              title="修改中..."
              description="正在修改玩家信息中，请稍后..."
              isAutoShown={true}
            />
            :null
          }

          {
            isDeleteExecuting?
            <DialogConfirmation
              dialogID="dialogConfirmation-deletingPlayer"
              mode="INFO"
              title="删除中..."
              description="正在删除玩家中，请稍后..."
              isAutoShown={true}
            />
            :null
          }

          <DialogConfirmation
            dialogID="dialogConfirmation-failedToUpdatePlayer"
            mode="OKAY"
            title="失败"
            description="修改玩家信息失败，请重试。更多详情请查阅控制台或后台记录。"
            onFinish={() => {
              MicroModal.close("dialogConfirmation-failedToUpdatePlayer");
              MicroModal.show("dialogInput-editPlayer");
            }}
          />

          <DialogConfirmation
            dialogID="dialogConfirmation-failedToDeletePlayer"
            mode="OKAY"
            title="失败"
            description="删除玩家失败，请重试。更多详情请查阅控制台或后台记录。"
            onFinish={() => {
              MicroModal.close("dialogConfirmation-failedToDeletePlayer");
            }}
          />

          <DialogInput
            dialogID="dialogInput-editPlayer"
            title={`编辑信息: ${playerDisplayName}`}
            description="请填写以下信息"
            items={[
              {
                propName: "name",
                name: "玩家名称",
                value: playerDisplayName,
                isRequired: true,
              },
              {
                propName: "bio",
                name: "玩家简介",
                value: player.bio || "",
                type: "textArea",
              },
              {
                propName: "isPremium",
                name: "是黄金高端土豪会员",
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
            title={`删除玩家: ${playerDisplayName}`}
            description={"警告！此操作无法回滚！"}
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
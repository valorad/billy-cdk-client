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
import { usePlayerDetail, usePlayerUpdate, usePlayerDeletion } from "../../services/player";
import { InputDialogResult } from "../../models/dialog.interface";

// import "./Dummy.scss";

export default () => {

  const params = useRoute("/players/dbname/:dbname")[1];

  let dbname = params?.dbname || "mr-stranger";

  const dispatch = useDispatch();
  const { isQueryLoading, queryError, player } = usePlayerDetail(dbname, {bio: true});

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
    dispatch(setDescription(player?.name || player?.dbname || "神秘的陌生人"));
    
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
  const [updatePlayer, { loading: isUpdateExecuting, error: updateError }] = usePlayerUpdate(updatedPlayer);
  const [deletePlayer, { loading: isDeleteExecuting, error: deleteError }] = usePlayerDeletion();

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
              title="编辑玩家"
              description="正在修改玩家信息中，请稍后..."
              isAutoShow={true}
            />
            :null
          }

          {
            updateError?
            <DialogConfirmation
              dialogID="dialogConfirmation-failedToUpdatePlayer"
              mode="OKAY"
              title="编辑玩家"
              description="修改玩家信息失败，请重试。更多详情请查阅控制台或后台记录。"
              isAutoShow={true}
              onFinish={() => {
                MicroModal.close("dialogConfirmation-failedToUpdatePlayer");
                MicroModal.show("dialogInput-editPlayer");
              }}
            />
            :null
          }

          {
            isDeleteExecuting?
            <DialogConfirmation
              dialogID="dialogConfirmation-deletingPlayer"
              mode="INFO"
              title="删除玩家"
              description="正在删除玩家中，请稍后..."
              isAutoShow={true}
            />
            :null
          }

          {
            deleteError?
            <DialogConfirmation
              dialogID="dialogConfirmation-failedToDeletePlayer"
              mode="OKAY"
              title="删除玩家"
              description="删除玩家失败，请重试。更多详情请查阅控制台或后台记录。"
              isAutoShow={true}
              onFinish={() => {
                MicroModal.close("dialogConfirmation-failedToDeletePlayer");
              }}
            />
            :null
          }

          <DialogInput
            dialogID="dialogInput-editPlayer"
            title={`编辑信息:${player.dbname}`}
            description="请填写以下信息"
            items={[
              {
                propName: "name",
                name: "玩家名称",
                value: player.name || player.dbname,
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

              await updatePlayer({variables: {
                dbname: dbname,
                token: updateToken,
              }});
    
              // <- will stop here automatically if fails
    
              window.location.href = `#/players/dbname/${dbname}`;

            }}
          />

          <DialogConfirmation
            dialogID="dialogConfirmation-deletePlayer"
            title={`删除玩家:${player.dbname}`}
            description={"警告！此操作无法回滚！"}
            onFinish={async () => {
              MicroModal.close("dialogConfirmation-deletePlayer");

              // update user
              await deletePlayer({variables: {
                dbname: dbname
              }});

              // <- will stop here automatically if fails
              window.location.href = `#/players`;

            }}
          />

        </section>
      );
    }

  };

  return placePlayerDetail();
};
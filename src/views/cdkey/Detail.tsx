import React, { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { useDispatch, useSelector } from "react-redux";

import CDKeyDetail from "../../components/cdkey/detail";
import DialogInput from "../../components/modal/dialogInput";
import DialogConfirmation from "../../components/modal/dialogConfirmation";

import { setTitle, setDescription } from "../../features/navbar";
import { MenuItem } from "../../models/menu.interface";
import { DetailedCDKey, CDKey } from "../../models/cdkey.interface";
import { useCDKeyDetail, useCDKeyUpdate, useCDKeyDeletion, useCDKeyActivation } from "../../services/cdkey";
import { useGameDetail } from "../../services/game";
import { usePlayerDetail } from "../../services/player";
import { selectLoginAsPlayer } from "../../features/login";
import { InputDialogResult } from "../../models/dialog.interface";
import MicroModal from "micromodal";
import { CDKeyCUDMessage } from "../../models/instanceCUDMessage.interface";


// import "./CDKeyDetail.scss";

interface CDKeyMutationStatus {
  update: {
    isPerformed: boolean,
    ok: boolean,
  },
  activate: {
    isPerformed: boolean,
    cudMessage: CDKeyCUDMessage
  },
}

export default () => {

  const dispatch = useDispatch();
  const loginPlayer = useSelector(selectLoginAsPlayer);

  const params = useRoute("/cdkeys/id/:id")[1];

  let id = params?.id || "unknown-id";

  // logged in player
  const loggedInPlayer = useSelector(selectLoginAsPlayer);

  const { isQueryLoading: isCDKeyQueryLoading, queryError: cdkeyQueryError, cdkey } = useCDKeyDetail({id});
  const gameName0 = "不存在的游戏";
  const { game } = useGameDetail(cdkey?.game || "");
  const gameDisplayName = game?.name || game?.dbname || gameName0;

  const playerName0 = "神秘的陌生人";
  const { player } = usePlayerDetail(cdkey?.player || "");
  const playerDisplayName = player?.name || player?.dbname || playerName0;


  const cdkeyMutationINITStatus: CDKeyMutationStatus = {
    update: {
      isPerformed: false,
      ok: false,
    },
    activate: {
      isPerformed: false,
      cudMessage: {} as CDKeyCUDMessage,
    }
  } 

  const [cdkeyMutationStatus, setCDKeyMutationStatus] = useState<CDKeyMutationStatus>(cdkeyMutationINITStatus);

  const resetCDKeyMutationStatus = () => {
    setCDKeyMutationStatus(cdkeyMutationINITStatus);
  };

  const updateCDKeyPopUp = () => {
    resetCDKeyMutationStatus();
    MicroModal.show("dialogInput-updateCDKey");

  };

  const deleteCDKeyPopUp = () => {
    resetCDKeyMutationStatus();
    MicroModal.show("dialogConfirmation-deleteCDKey");
  };

  const activateCDKeyPopUp = () => {
    resetCDKeyMutationStatus();
    MicroModal.show("dialogConfirmation-activateCDKey");
  };

  // get cdkey
  // const cdkey: CDKey = {
  //   // discalimer: value generated from 3rd party website
  //   // it is NOT actual game serial activation key!
  //   id: "5f060823483666ad38510545",
  //   player: "player-billy",
  //   game: "game-deathStranding",
  //   value: "MX6L5-NYQYZ-Q7GXV",
  //   isActivated: false,
  //   price: 222,
  // }


  // get cdkey detailed info
  let detailedCDKey = {  } as DetailedCDKey;
  let doesPlayerOwnThisGame = false;

  // test data
  // const detailedCDKey: DetailedCDKey = {
  //   id: "5f060823483666ad38510545",
  //   player: "player-billy",
  //   playerName: "Billy",
  //   game: "game-deathStranding",
  //   gameName: "死亡搁浅",
  //   value: "MX6L5-NYQYZ-Q7GXV",
  //   isActivated: false,
  //   price: 222,
  // }

  const placeCDKeyDetail = () => {

    if (isCDKeyQueryLoading) {
      return (
        <div className="statusInfo">
          <h1>获取CDKey信息中，请稍后...</h1>
        </div>
      );
    } else if (cdkeyQueryError || cdkey === undefined) {
      return (
        <div className="statusInfo">
          <h1>错误！无法进行CDKey查询。请联系管理员。</h1>
        </div>
      );
    } else if (cdkey === null) {
      return (
        <div className="statusInfo">
          <h1>错误！未找到此CDKey，请联系管理员。</h1>
        </div>
      );
    } else {
      detailedCDKey = {
        ...cdkey,
        playerName: playerDisplayName,
        gameName: gameDisplayName
      }
      
      return (<CDKeyDetail CDKey={detailedCDKey} menus={menus} />);
    }
  };

  const menus: MenuItem[] = [
    {
      name: "赠予他人",
      action: updateCDKeyPopUp,
    },
    {
      name: "丢弃此CDKey",
      action: deleteCDKeyPopUp,
    },
  ];

  // add activate menu if game not owned by logged-in player
  if (cdkey) {
    doesPlayerOwnThisGame = loggedInPlayer?.games.includes(cdkey.game) || false;
    if (!doesPlayerOwnThisGame) {
      menus.unshift({
        name: "为自己激活",
        action: activateCDKeyPopUp,
      });
    }
  }

  let updatedCDKey = {} as CDKey;

  const [updateCDKey, { loading: isUpdateExecuting }] = useCDKeyUpdate(updatedCDKey);
  const [deleteCDKey, { loading: isDeleteExecuting }] = useCDKeyDeletion();
  const [activateCDKey, { loading: isActivateExecuting }] = useCDKeyActivation(loginPlayer.dbname, cdkey?.value || "");

  useEffect(() => {
    
    dispatch(setTitle(`CDKey详情`));
    dispatch(setDescription(`用于激活：${gameDisplayName}`));

  });


  return (
    <section className="CDKeyDetail">

      {
        isUpdateExecuting?
        <DialogConfirmation
          dialogID="dialogConfirmation-updatingCDKey"
          mode="INFO"
          title="修改中..."
          description="正在修改CDKey信息中，请稍后..."
          isAutoShown={true}
        />
        :null
      }

      {
        isDeleteExecuting?
        <DialogConfirmation
          dialogID="dialogConfirmation-deletingCDKey"
          mode="INFO"
          title="删除中..."
          description="正在删除CDKey中，请稍后..."
          isAutoShown={true}
        />
        :null
      }

      {
        isActivateExecuting?
        <DialogConfirmation
          dialogID="dialogConfirmation-activatingCDKey"
          mode="INFO"
          title="激活中..."
          description="正在激活CDKey中，请稍后..."
          isAutoShown={true}
        />
        :null
      }

      {
        cdkeyMutationStatus.update.isPerformed && cdkeyMutationStatus.update.ok?
        <DialogConfirmation
          dialogID="dialogConfirmation-updateSuccess"
          mode="OKAY"
          title="成功"
          description="成功将CDKey赠予他人"
          isAutoShown={true}
        />
        :null
      }

      {
        cdkeyMutationStatus.activate.isPerformed && 
        cdkeyMutationStatus.activate.cudMessage && cdkeyMutationStatus.activate.cudMessage.ok?
        <DialogConfirmation
          dialogID="dialogConfirmation-activateSuccess"
          mode="OKAY"
          title="成功"
          description={`恭喜您成功地为自己激活了游戏：${cdkeyMutationStatus.activate.cudMessage.instance?.game || gameDisplayName} `}
          isAutoShown={true}
        />
        :null
      }

      <DialogConfirmation
        dialogID="dialogConfirmation-failedToUpdateCDKey"
        mode="OKAY"
        title="失败"
        description="赠予玩家操作失败，请重试。如有疑问，请联系管理员。"
        onFinish={() => {
          MicroModal.close("dialogConfirmation-failedToUpdateCDKey");
          MicroModal.show("dialogInput-editCDKey");
        }}
      />

      <DialogConfirmation
        dialogID="dialogConfirmation-failedToDeleteCDKey"
        mode="OKAY"
        title="失败"
        description="删除CDKey失败，请重试。如有疑问，请联系管理员。"
        onFinish={() => {
          MicroModal.close("dialogConfirmation-failedToDeleteCDKey");
        }}
      />

      <DialogConfirmation
        dialogID="dialogConfirmation-failedToActivateCDKey"
        mode="OKAY"
        title="失败"
        description="激活CDKey失败，请查看网络连接并重试。"
        onFinish={() => {
          MicroModal.close("dialogConfirmation-failedToActivateCDKey");
        }}
      />

      {
        cdkeyMutationStatus.activate.isPerformed && !cdkeyMutationStatus.activate.cudMessage.ok?
        <DialogConfirmation
          dialogID="dialogConfirmation-failedToActivateCDKey2"
          mode="OKAY"
          title="失败"
          description={`激活CDKey失败，原因: ${cdkeyMutationStatus.activate.cudMessage.message}`}
          isAutoShown={true}
          onFinish={() => {
            MicroModal.close("dialogConfirmation-failedToActivateCDKey2");
          }}
        />
        :null
      }

      <DialogInput
        dialogID="dialogInput-updateCDKey"
        title={`赠予其他玩家`}
        description={`请准确填写玩家的数据库ID。不知道ID？请访问玩家页面，查看网址中"dbname"后的字段`}
        items={[
          {
            propName: "player",
            name: "玩家ID",
            value: loggedInPlayer.dbname || "player-XXXXXX",
            isRequired: true,
          },
        ]}
        onFinish={async (result: InputDialogResult<any>) => {

          if (!result.ok) {
            return;
          }

          MicroModal.close("dialogInput-updateCDKey");

          try {
            
            let updateToken = {$set: {player: result.data.player || loggedInPlayer.dbname }};

            await updateCDKey({variables: {
              id: cdkey?.id,
              token: JSON.stringify(updateToken),
            }});

            setCDKeyMutationStatus(
              {
                ...cdkeyMutationStatus,
                update: {
                  isPerformed: true,
                  ok: true,
                }
              }
            );
          } catch (error) {
            MicroModal.show("dialogConfirmation-failedToUpdateCDKey");
            console.error(error);
            return;
          }
          
        }}
      />

      <DialogConfirmation
        dialogID="dialogConfirmation-deleteCDKey"
        title={`删除CDKey`}
        description={"如果您不再需要此CDKey（例如Key已被手动激活），可以删除此CDKey。是否继续？"}
        onFinish={async () => {
          MicroModal.close("dialogConfirmation-deleteCDKey");

          try {
            await deleteCDKey({variables: {
              id: cdkey?.id
            }});

          } catch (error) {
            console.error(error);
            MicroModal.show("dialogConfirmation-failedToDeleteCDKey");
            return;
          }

          window.location.href = `#/players/dbname/${loggedInPlayer.dbname}`;

        }}
      />

      <DialogConfirmation
        dialogID="dialogConfirmation-activateCDKey"
        title={`为自己激活CDKey`}
        description={"是否要为自己激活此CDKey？"}
        onFinish={async () => {
          MicroModal.close("dialogConfirmation-activateCDKey");

          let mutationTuple: any = {};

          // activate cdkey
          try {
            mutationTuple = await activateCDKey({variables: {
              playerDBName: loginPlayer.dbname,
              value: cdkey?.value,
            }});
            
          } catch (error) {
            console.error(error);
            MicroModal.show("dialogConfirmation-failedToActivateCDKey");
          }

          setCDKeyMutationStatus(
            {
              ...cdkeyMutationStatus,
              activate: {
                isPerformed: true,
                cudMessage: mutationTuple.data.activateCDKey
              }
            }
          );

          return;

        }}
      />

      {
        doesPlayerOwnThisGame?
        <h1>您已拥有此游戏。</h1>
        :null
      }

      {placeCDKeyDetail()}

    </section>
  );
};
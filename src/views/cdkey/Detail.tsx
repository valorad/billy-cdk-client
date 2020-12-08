import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Trans, t } from "@lingui/macro";

import CDKeyDetail from "../../components/cdkey/detail";
import DialogInput from "../../components/modal/dialogInput";
import DialogConfirmation from "../../components/modal/dialogConfirmation";

import { setTitle, setDescription } from "../../features/navbar";
import { MenuItem } from "../../models/menu.interface";
import { DetailedCDKey, CDKey } from "../../models/cdkey.interface";
import { useCDKeyDetail, useCDKeyUpdate, useCDKeyDeletion, useCDKeyActivation } from "../../services/cdkey";
import { useGameDetail } from "../../services/game";
import { usePlayerDetail } from "../../services/player";
import { selectLoginAsPlayer, setLoginAsPlayer } from "../../features/login";
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

export const CDKeyDetailView = () => {

  const dispatch = useDispatch();
  const loginPlayer = useSelector(selectLoginAsPlayer);

  const params: any = useParams();

  let id = params?.id || "unknown-id";

  // logged in player
  const loggedInPlayer = useSelector(selectLoginAsPlayer);

  const { isQueryLoading: isCDKeyQueryLoading, queryError: cdkeyQueryError, cdkey } = useCDKeyDetail({id});
  const gameName0 = t`A game of non-existence`;
  const { game } = useGameDetail(cdkey?.game || "");
  const gameDisplayName = game?.name || game?.dbname || gameName0;

  const playerName0 = t`Mr. Stranger`; // "神秘的陌生人";
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
  // let doesPlayerOwnThisGame = false;

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
          <h1><Trans>Retrieving CDKey info</Trans>, <Trans>please wait</Trans></h1>
        </div>
      );
    } else if (cdkeyQueryError || cdkey === undefined) {
      return (
        <div className="statusInfo">
          <h1><Trans>Error</Trans>! <Trans>Unable to obtain the CDKey information.</Trans> <Trans>Please contact the administrator.</Trans></h1>
        </div>
      );
    } else if (cdkey === null) {
      return (
        <div className="statusInfo">
          <h1><Trans>Error</Trans>! <Trans>Unable to find this CDKey</Trans>,  <Trans>Please contact the administrator.</Trans></h1>
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

  let menus: MenuItem[] = [

    {
      name: t`Drop the CDKey`, //"丢弃此CDKey",
      action: deleteCDKeyPopUp,
    },
  ];

  // add activate menu if game not owned by logged-in player
  if (cdkey) {

    if (!cdkey.isActivated) {
      menus = [
        {
          name: t`Gift the CDKey to a friend`,
          action: updateCDKeyPopUp,
        },
        ...menus
      ]
    }

    if (!loggedInPlayer?.games.includes(cdkey.game) || false) {
      menus = [
        {
          name: t`Activate for yourself`, // "为自己激活"
          action: activateCDKeyPopUp,
        },
        ...menus
      ]

    }
  }

  let updatedCDKey = {} as CDKey;

  const [updateCDKey, { loading: isUpdateExecuting }] = useCDKeyUpdate(updatedCDKey);
  const [deleteCDKey, { loading: isDeleteExecuting }] = useCDKeyDeletion();
  const [activateCDKey, { loading: isActivateExecuting }] = useCDKeyActivation(loginPlayer.dbname, cdkey?.value || "");

  useEffect(() => {
    
    dispatch(setTitle(t`CDKey Details`));
    dispatch(setDescription(t`Activate for: ${gameDisplayName}`));

  });


  return (
    <section className="CDKeyDetail">

      {
        isUpdateExecuting?
        <DialogConfirmation
          dialogID="dialogConfirmation-updatingCDKey"
          mode="INFO"
          title={t`Modifying`+ "..."}
          description={t`Modifying CDKey`+ ", " + t`please wait`+ "..."} //"正在修改CDKey信息中，请稍后..."
          isAutoShown={true}
        />
        :null
      }

      {
        isDeleteExecuting?
        <DialogConfirmation
          dialogID="dialogConfirmation-deletingCDKey"
          mode="INFO"
          title={t`Deleting`+ "..."}
          description={t`Deleting CDKey`+ ", " + t`please wait`+ "..."} //"正在删除CDKey中，请稍后..."
          isAutoShown={true}
        />
        :null
      }

      {
        isActivateExecuting?
        <DialogConfirmation
          dialogID="dialogConfirmation-activatingCDKey"
          mode="INFO"
          title={t`Activating`+ "..."}
          description={t`Activating CDKey`+ ", " + t`please wait`+ "..."} //"正在激活CDKey中，请稍后..."
          isAutoShown={true}
        />
        :null
      }

      {
        cdkeyMutationStatus.update.isPerformed && cdkeyMutationStatus.update.ok?
        <DialogConfirmation
          dialogID="dialogConfirmation-updateSuccess"
          mode="OKAY"
          title={t`Success`}
          description={t`Successfully sent your gift CDKey`} //"成功将CDKey赠予他人"
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
          title={t`Success`}
          description={t`Congratulations! You have successfully activated the game: ${cdkeyMutationStatus.activate.cudMessage.instance?.game || gameDisplayName} `}
          isAutoShown={true}
        />
        :null
      }

      <DialogConfirmation
        dialogID="dialogConfirmation-failedToUpdateCDKey"
        mode="OKAY"
        title={t`Failure`}
        description={t`Failed to send your gift CDKey. Please try again later.` + " " + t`If in doubt, please do not hesitate to contact your administrator.`} //"赠予玩家操作失败，请重试。如有疑问，请联系管理员。"
        onFinish={() => {
          MicroModal.close("dialogConfirmation-failedToUpdateCDKey");
          MicroModal.show("dialogInput-editCDKey");
        }}
      />

      <DialogConfirmation
        dialogID="dialogConfirmation-failedToDeleteCDKey"
        mode="OKAY"
        title={t`Failure`}
        description={t`Failed to delete the CDKey.` + " " + t`If in doubt, please do not hesitate to contact your administrator.`} //"删除CDKey失败，请重试。如有疑问，请联系管理员。"
        onFinish={() => {
          MicroModal.close("dialogConfirmation-failedToDeleteCDKey");
        }}
      />

      <DialogConfirmation
        dialogID="dialogConfirmation-failedToActivateCDKey"
        mode="OKAY"
        title={t`Failure`}
        description={t`Failed to activate the CDKey. Please check your Internet conenction and try again later.`} //"激活CDKey失败，请查看网络连接并重试。"
        onFinish={() => {
          MicroModal.close("dialogConfirmation-failedToActivateCDKey");
        }}
      />

      {
        cdkeyMutationStatus.activate.isPerformed && !cdkeyMutationStatus.activate.cudMessage.ok?
        <DialogConfirmation
          dialogID="dialogConfirmation-failedToActivateCDKey2"
          mode="OKAY"
          title={t`Failure`}
          description={t`Failed to activate the CDKey. The reason is: ${cdkeyMutationStatus.activate.cudMessage.message}`}
          isAutoShown={true}
          onFinish={() => {
            MicroModal.close("dialogConfirmation-failedToActivateCDKey2");
          }}
        />
        :null
      }

      <DialogInput
        dialogID="dialogInput-updateCDKey"
        title={t`Send a gift CDKey`} //赠予其他玩家
        description={t`Please carefully fill in the database ID of a player. No idea about the ID? You may go visit the player page, and check the url segment after "dbname"`} //请准确填写玩家的数据库ID。不知道ID？请访问玩家页面，查看网址中"dbname"后的字段
        items={[
          {
            propName: "player",
            name: t`Player ID`, //"玩家ID",
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
        title={t`Delete CDKey`}
        description={t`If you no longer need this CDKey (e.g. The CDKey has been activated manually), you may delete it.` + ` ` + t`Do you wish to proceed?`} // "如果您不再需要此CDKey（例如Key已被手动激活），可以删除此CDKey。是否继续？"
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
        title={t`Activate a CDKey for yourself`} //为自己激活CDKey
        description={t`Do you wish to activate this CDKey for yourself?`} // "是否要为自己激活此CDKey？"
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

          if (mutationTuple.data.activateCDKey.instance) {
            // sync local store
            dispatch(
              setLoginAsPlayer(
                {
                  ...loginPlayer,
                  games: [
                    ...loginPlayer.games,
                    mutationTuple.data.activateCDKey.instance.dbname,
                  ]
                }
              )
            );
          }

          return;

        }}
      />

      {
        loggedInPlayer?.games.includes(cdkey?.game || "") || false?
        <h1> <Trans>You have already owned this game.</Trans></h1>
        :null
      }

      {placeCDKeyDetail()}

    </section>
  );
};

export default CDKeyDetailView;
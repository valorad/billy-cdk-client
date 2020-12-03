import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MicroModal from "micromodal";
import { t } from "@lingui/macro";

import Menu from "../../components/menu";
import DialogConfirmation from "../../components/modal/dialogConfirmation";
import DialogInput from "../../components/modal/dialogInput";

import { setTitle, setDescription } from "../../features/navbar";
import { MenuItem } from "../../models/menu.interface";
import { selectLoginAsPlayer, setLoginAsPlayer } from "../../features/login";
import { InputDialogResult } from "../../models/dialog.interface";
import { useCDKeyActivation } from "../../services/cdkey";
import { CDKey } from "../../models/cdkey.interface";
import { CDKeyCUDMessage } from "../../models/instanceCUDMessage.interface";
import { useLazyGameDetail } from "../../services/game";

const CDKeyView = () => {

  const dispatch = useDispatch();
  const loginPlayer = useSelector(selectLoginAsPlayer);

  let cdkeyToActivate = {
    value: ""
  } as CDKey;
  const [activateCDKey, { loading: isActivateExecuting }] = useCDKeyActivation(loginPlayer.dbname, cdkeyToActivate.value);

  const [activateCUDMessage, setActivateCUDMessage] = useState({} as CDKeyCUDMessage);

  const activateCDKeyPopUp = () => {
    // first clear previous activation state
    setActivateCUDMessage({} as CDKeyCUDMessage);
    MicroModal.show("dialogInput-activateCDKey");
  };

  const menus: MenuItem[] = [
    {
      name: t`Manage My CDKey Inventory`, // "管理我的CDKey库存"
      link: `#/players/dbname/${loginPlayer.dbname}/cdkeys`,
    },
    {
      name: t`Enter and Activate a New CDKey`, // "输入新的CDKey并激活"
      action: activateCDKeyPopUp,
    },
  ];

  const name0 = t`A game of non-existence`; // "不存在的游戏"
  const { data: _gameData, getGameDetail } = useLazyGameDetail();
  const [gameActivated, setGameActivated] = useState(_gameData?.game);

  useEffect(() => {
    
    dispatch(setTitle(t`CDKey Management`)); // "CDKey 管理"
    dispatch(setDescription(t`Activate a CDKey for youself, or manage your CDKey incentory`)); // "为自己激活CDKey，或是管理CDKey库存"

    if (_gameData && _gameData.game) {
      setGameActivated({..._gameData.game});
    }
    
  }, [dispatch, _gameData]);

  return (
    <section className="CDKeyIndex">

      <Menu menus={menus} />

      {
        isActivateExecuting?
        <DialogConfirmation
          dialogID="dialogConfirmation-activatingCDKey"
          mode="INFO"
          title={t`Activating`+ "..."}
          description={t`Activating the CDKey` + ", " + t`please wait`+ "..."} //"正在激活CDKey中，请稍后..."
          isAutoShown={true}
        />
        :null
      }

      <DialogConfirmation
        dialogID="dialogConfirmation-failedToActivateCDKey"
        mode="OKAY"
        title={t`Failure`} //"失败"
        description={t`Failed to activate CDKey. Please Check your Internet connection, double-check the input value and retry`} // "激活CDKey失败，请查看网络连接，检查输入值并重试。"
        onFinish={() => {
          MicroModal.close("dialogConfirmation-failedToActivateCDKey");
          MicroModal.show("dialogInput-activateCDKey");
        }}
      />

      {
        !activateCUDMessage.ok && activateCUDMessage.message?
        <DialogConfirmation
          dialogID="dialogConfirmation-failedToActivateCDKey2"
          mode="OKAY"
          title={t`Failure`}
          description={t`Failed to activate CDKey. The reason is: ${activateCUDMessage.message}`}
          isAutoShown={true}
          onFinish={() => {
            MicroModal.close("dialogConfirmation-failedToActivateCDKey2");
            MicroModal.show("dialogInput-activateCDKey");
          }}
        />
        :null
      }

      {
        activateCUDMessage.ok && !gameActivated?
        <DialogConfirmation
          dialogID="dialogConfirmation-activateCDKeySuccess1"
          mode="OKAY"
          title={t`Success`}
          description={t`Successfully activated the game: ${activateCUDMessage.instance?.game || "(retrieving info...)"}`}
          isAutoShown={true}
          onFinish={() => {
            MicroModal.close("dialogConfirmation-activateCDKeySuccess1");
          }}
        />
        :null
      }

      {
        activateCUDMessage.ok && gameActivated?
        <DialogConfirmation
          dialogID="dialogConfirmation-activateCDKeySuccess2"
          mode="OKAY"
          title={t`Success`}
          description={t`Successfully activated the game: ${gameActivated.name || gameActivated.dbname || name0}`}
          isAutoShown={true}
          onFinish={() => {
            MicroModal.close("dialogConfirmation-activateCDKeySuccess2");
          }}
        />
        :null
      }

      <DialogInput
        dialogID="dialogInput-activateCDKey"
        title={t`Activate a game`} //激活游戏
        description={t`Please enter your CDKey carefully`} // "请仔细填写CDKey"
        items={[
          {
            propName: "value",
            name: "CDKey",
            value: "",
            isRequired: true,
          },
        ]}
        onFinish={async (result: InputDialogResult<any>) => {

          if (!result.ok) {
            return;
          }

          cdkeyToActivate = result.data;

          MicroModal.close("dialogInput-activateCDKey");

          let mutationTuple: any = {};

          // activate cdkey
          try {
            mutationTuple = await activateCDKey({variables: {
              playerDBName: loginPlayer.dbname,
              value: cdkeyToActivate.value,
            }});

          } catch (error) {
            console.error(error);
            MicroModal.show("dialogConfirmation-failedToActivateCDKey");
            return;
          }
          
          setActivateCUDMessage({...activateCUDMessage, ...mutationTuple.data.activateCDKey});
          
          // activation successful
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

            getGameDetail({ variables: { dbname: mutationTuple.data.activateCDKey.instance.dbname } })

          }

        }}
      />


    </section>
  );
};

export default CDKeyView;
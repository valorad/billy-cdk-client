import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MicroModal from "micromodal";

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


// import "./CDKey.scss";

export default () => {

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
      name: "管理我的CDKey库存",
      link: `#/players/dbname/${loginPlayer.dbname}/cdkeys`,
    },
    {
      name: "输入新的CDKey并激活",
      action: activateCDKeyPopUp,
    },
  ];

  const name0 = "不存在的游戏";
  const { data: _gameData, getGameDetail } = useLazyGameDetail();
  const [gameActivated, setGameActivated] = useState(_gameData?.game);

  useEffect(() => {
    
    dispatch(setTitle("CDKey 管理"));
    dispatch(setDescription("为自己激活CDKey，或是管理CDKey库存"));

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
          title="激活中..."
          description="正在激活CDKey中，请稍后..."
          isAutoShown={true}
        />
        :null
      }

      <DialogConfirmation
        dialogID="dialogConfirmation-failedToActivateCDKey"
        mode="OKAY"
        title="失败"
        description="激活CDKey失败，请查看网络连接，检查输入值并重试。"
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
          title="失败"
          description={`激活CDKey失败，原因: ${activateCUDMessage.message}`}
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
          title="成功"
          description={`成功激活游戏: ${activateCUDMessage.instance?.game || "(获取游戏信息中...)"}`}
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
          title="成功"
          description={`成功激活CDKey: ${gameActivated.name || gameActivated.dbname || name0}`}
          isAutoShown={true}
          onFinish={() => {
            MicroModal.close("dialogConfirmation-activateCDKeySuccess2");
          }}
        />
        :null
      }

      <DialogInput
        dialogID="dialogInput-activateCDKey"
        title={`激活游戏`}
        description="请仔细填写CDKey"
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
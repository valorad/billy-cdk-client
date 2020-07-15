import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRoute } from "wouter";
import MicroModal from "micromodal";

import Menu from "../../components/menu";
import DialogInput from "../../components/modal/dialogInput";
import DialogConfirmation from "../../components/modal/dialogConfirmation";

import { setTitle, setDescription } from "../../features/navbar";

import { MenuItem } from "../../models/menu.interface";
import { DialogInputItem, InputDialogResult } from "../../models/dialog.interface";
import { CDKey } from "../../models/cdkey.interface";

import { useCDKeyAddition } from "../../services/cdkey";
import { useGameDetail } from "../../services/game";
// import "./Dummy.scss";

export default () => {

  const params = useRoute("/store/games/dbname/:dbname/cdkeys/index")[1];
  let dbname = params?.dbname || "game:non-existance";
  const name0 = "不存在的游戏";
  const { isQueryLoading: isGameQueryLoading, queryError: gameQueryError, game } = useGameDetail(dbname);
  const gameDisplayName = game?.name || game?.dbname || name0;

  const dispatch = useDispatch();

  useEffect(() => {
    
    dispatch(setTitle(`${gameDisplayName}的CDKey管理`));
    dispatch(setDescription(`查看${gameDisplayName}的CDKey列表，或签发一条新的CDKey`));
    
  });

  const issueCDKeyPopUp = () => {
    MicroModal.show("dialogInput-createCDKey");
  };



  const menus: MenuItem[] = [
    {
      name: `${gameDisplayName}的CDKey列表`,
      link: `#/store/games/dbname/${dbname}/cdkeys`,
    },
    {
      name: "签发新的CDKey",
      action: issueCDKeyPopUp,
    },
  ];

  const inputItems: DialogInputItem[] = [
    {
      propName: "value",
      name: "CDKey",
      value: "XXXXX-XXXXX-XXXXX",
      isRequired: true,
    },
    {
      propName: "price",
      name: "CDKey价格",
      value: game?.price || 0,
      type: "number",
    },
    {
      propName: "platform",
      name: "游戏平台",
      value: "Steam",
    },
  ];

  let newCDKey = {} as CDKey;

  const [addCDKey, { loading: isAddExecuting }] = useCDKeyAddition(newCDKey);

  const placeGameCDKeyIndex = () => {
    if (isGameQueryLoading) {
      return (
        <div className="statusInfo">
          <h1>获取游戏信息中，请稍后...</h1>
        </div>
      );
    } else if (gameQueryError || game === undefined) {
      return (
        <div className="statusInfo">
          <h1>错误！无法进行游戏查询。请查看控制台或后台日志。</h1>
        </div>
      );
    } else if (game === null) {
      return (
        <div className="statusInfo">
          <h1>错误！未找到该游戏。请查看控制台或后台日志。</h1>
        </div>
      );
    } else {
      return (
        <section className="StoreGameCDKeyIndex">

        {/* Each page must have at least 1 and only 1 menu */}
        <Menu menus={menus} />
  
        <DialogConfirmation
          dialogID="dialogConfirmation-failedToCreateCDKey"
          mode="OKAY"
          title="失败"
          description="新CDKey签发失败，请重试。更多详情请查阅控制台或后台记录。"
          onFinish={() => {
            MicroModal.close("dialogConfirmation-failedToCreateCDKey");
            MicroModal.show("dialogInput-createCDKey");
          }}
        />
  
        {
          isAddExecuting?
          <DialogConfirmation
            dialogID="dialogConfirmation-creatingCDKey"
            mode="INFO"
            title="创建中..."
            description="正在签发新CDKey中，请稍后..."
            isAutoShown={true}
          />
          :null
        }
  
        <DialogInput
          dialogID="dialogInput-createCDKey"
          title={`签发新CDKey`}
          description="请填写以下信息"
          items={inputItems}
          onFinish={async (result: InputDialogResult<any>) => {
  
            if (!result.ok) {
              return;
            }
  
            newCDKey = {
              game: dbname,
              price: game.price,
              isActivated: false,
              platform: "Steam",
              ...result.data,
            };
  
            MicroModal.close("dialogInput-createCDKey");
  
            try {
              await addCDKey({variables: {
                newCDKey: newCDKey
              }});
            } catch (error) {
              MicroModal.show("dialogConfirmation-failedToCreateCDKey");
              console.error(error);
              return;
            }
  
            window.location.href = `#/store/games/dbname/${dbname}/cdkeys`;
          }}
  
        />
      </section>
      )
    }

  };

  return placeGameCDKeyIndex();
};
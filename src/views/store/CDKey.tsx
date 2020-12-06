import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import MicroModal from "micromodal";
import { t, Trans } from "@lingui/macro";

import Menu from "../../components/menu";
import DialogInput from "../../components/modal/dialogInput";
import DialogConfirmation from "../../components/modal/dialogConfirmation";

import { setTitle, setDescription } from "../../features/navbar";

import { MenuItem } from "../../models/menu.interface";
import { DialogInputItem, InputDialogResult } from "../../models/dialog.interface";
import { CDKey } from "../../models/cdkey.interface";

import { useCDKeyAddition } from "../../services/cdkey";
import { useGameDetail } from "../../services/game";

const StoreGameCDKeyIndexView = () => {

  const params: any = useParams();
  let dbname = params?.dbname || "game:non-existance";
  const name0 = t`A game of non-existence`;
  const { isQueryLoading: isGameQueryLoading, queryError: gameQueryError, game } = useGameDetail(dbname);
  const gameDisplayName = game?.name || game?.dbname || name0;

  const dispatch = useDispatch();

  useEffect(() => {
    
    dispatch(setTitle(t`${gameDisplayName} CDKey Management`)); //${gameDisplayName}的CDKey管理
    dispatch(setDescription(t`View the CDKey list of ${gameDisplayName}, or issue a new CDKey`)); //查看${gameDisplayName}的CDKey列表，或签发一条新的CDKey
    
  });

  const issueCDKeyPopUp = () => {
    MicroModal.show("dialogInput-createCDKey");
  };



  const menus: MenuItem[] = [
    {
      name: t`CDKey list of ${gameDisplayName}`, //${gameDisplayName}的CDKey列表
      link: `#/store/games/dbname/${dbname}/cdkeys`,
    },
    {
      name: t`Issue A New CDKey`, // "签发新的CDKey"
      action: issueCDKeyPopUp,
    },
  ];

  const inputItems: DialogInputItem[] = [
    {
      propName: "value",
      name: t`CDKey`, //"CDKey"
      value: "XXXXX-XXXXX-XXXXX",
      isRequired: true,
    },
    {
      propName: "price",
      name: t`CDKey Price`, //"CDKey价格"
      value: game?.price || 0,
      type: "number",
    },
    {
      propName: "platform",
      name: t`Game Platform`, //"游戏平台"
      value: "Steam",
    },
  ];

  let newCDKey = {} as CDKey;

  const [addCDKey, { loading: isAddExecuting }] = useCDKeyAddition(newCDKey);

  const placeGameCDKeyIndex = () => {
    if (isGameQueryLoading) {
      return (
        <div className="statusInfo">
          <h1><Trans>Retrieving game information</Trans>, <Trans>please wait</Trans>...</h1>
        </div>
      );
    } else if (gameQueryError || game === undefined) {
      return (
        <div className="statusInfo">
          <h1><Trans>Error</Trans>! <Trans>Failed to retrieve game information.</Trans> <Trans>Please refer to the console or server logs for more details.</Trans></h1>
        </div>
      );
    } else if (game === null) {
      return (
        <div className="statusInfo">
          <h1><Trans>Error</Trans>! <Trans>Unable to find the game.</Trans> <Trans>Please refer to the console or server logs for more details.</Trans></h1>
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
          title={t`Failure`}
          description={t`Failed to issue the new CDKey, please try again.` + ` ` + t`Please refer to the console or server logs for more details.`} //"新CDKey签发失败，请重试。更多详情请查阅控制台或后台记录。"
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
            title={t`Creating` + `...`} //"创建中..."
            description={t`Issuing the new CDKey` + `, ` + t`please wait` + `...`} //"正在签发新CDKey中，请稍后..."
            isAutoShown={true}
          />
          :null
        }
  
        <DialogInput
          dialogID="dialogInput-createCDKey"
          title={t`Issue the new CDKey`} //签发新CDKey
          description={t`Please fill in the information below.`}
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

export default StoreGameCDKeyIndexView;
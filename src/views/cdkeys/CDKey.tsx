import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import MicroModal from "micromodal";

import Menu from "../../components/menu";
import DialogInput from "../../components/modal/dialogInput";

import { setTitle, setDescription } from "../../features/navbar";
import { MenuItem } from "../../models/menu.interface";


// import "./CDKey.scss";

export default () => {

  const dispatch = useDispatch();

  useEffect(() => {
    
    dispatch(setTitle("CDKey 管理"));
    dispatch(setDescription("为自己激活CDKey，或是管理CDKey库存"));
    
  });

  const [activateCDKeyDialogResult, setActivateCDKeyDialogResult] = useState({});
  const activateCDKey = () => {
    MicroModal.show("dialogInput-activateCDKey");
  };

  const menus: MenuItem[] = [
    {
      name: "管理我的CDKey库存",
      link: `#/players/dbname/${"player-billy"}/cdkeys`,
    },
    {
      name: "输入新的CDKey并激活",
      action: activateCDKey,
    },
  ];

  return (
    <section className="CDKeyIndex">
      {/* Each page must have at least 1 and only 1 menu */}
      <Menu menus={menus} />

      <DialogInput
        dialogID="dialogInput-activateCDKey"
        title={`激活游戏`}
        description="请仔细填写CDKey"
        items={[
          {
            propName: "cdkey",
            name: "CDKey",
            value: "",
            isRequired: true,
          },
        ]}
        onFinish={(data: any) => {
          // -> if (data.ok)
          setActivateCDKeyDialogResult({...activateCDKeyDialogResult, data});
          data.data.player = "player-billy";
          console.log(data);
        }}
      />


    </section>
  );
};
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import MicroModal from "micromodal";

import Menu from "../../components/menu";
import DialogInput from "../../components/modal/dialogInput";

import { setTitle, setDescription } from "../../features/navbar";
import { MenuItem } from "../../models/menu.interface";

// import "./Player.scss";

export default () => {

  const dispatch = useDispatch();



  useEffect(() => {
    
    dispatch(setTitle("玩家管理"));
    dispatch(setDescription("查看玩家列表或新增一名玩家。目前所有玩家都是您的好友。"));
    
  });

  const [createDialogResult, setCreateDialogResult] = useState({});

  const createPlayer = () => {
    MicroModal.show("dialogInput-createPlayer");
  };

  const menus: MenuItem[] = [
    {
      name: "玩家列表",
      link: "#/players",
    },
    {
      name: "新增玩家",
      action: createPlayer,
    },
  ];

  return (
    <section className="Player">
      {/* Each page must have at least 1 and only 1 menu */}
      <Menu menus={menus} />

      <DialogInput
        dialogID="dialogInput-createPlayer"
        title={`添加新玩家`}
        description="请填写以下信息"
        items={[
          {
            propName: "dbname",
            name: "玩家ID",
            value: "player-[InputID]",
            isRequired: true,
          },
          {
            propName: "name",
            name: "玩家名称",
            value: "",
            isRequired: true,
          },
          {
            propName: "bio",
            name: "玩家简介",
            value: "",
            type: "textArea",
          },
          {
            propName: "isPremium",
            name: "任命玩家为黄金高端土豪会员",
            value: false,
            type: "checkBox",
          },
        ]}
        onFinish={(data: any) => {
          // -> if (data.ok)
          setCreateDialogResult({...createDialogResult, data});
          console.log(data);
        }}
      />

    </section>
  );
};
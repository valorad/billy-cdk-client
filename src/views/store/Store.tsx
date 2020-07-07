import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import MicroModal from "micromodal";

// import "./Store.scss";
import { MenuItem } from "../../models/menu.interface";

import Menu from "../../components/menu";
import DialogInput from "../../components/modal/dialogInput";

import { setTitle, setDescription } from "../../features/navbar";


export default () => {

  const dispatch = useDispatch();

  const [createDialogResult, setCreateDialogResult] = useState({});

  const createGame = () => {
    MicroModal.show("dialogInput-createGame");
  };

  const menus: MenuItem[] = [
    {
      name: "商店游戏列表",
      link: "#/store/games",
    },
    {
      name: "发布新游戏",
      action: createGame,
    },
  ];

  useEffect(() => {
    
    dispatch(setTitle("Billy游戏商店"));
    dispatch(setDescription("浏览游戏列表，或是发布一款新游戏"));
    
  });

  return (
    <section className="Store">
      <Menu menus={menus} />

      <DialogInput
        dialogID="dialogInput-createGame"
        title={`添加新游戏`}
        description="请填写以下信息"
        items={[
          {
            propName: "dbname",
            name: "游戏ID",
            value: "game-[InputID]",
            isRequired: true,
          },
          {
            propName: "name",
            name: "游戏名称",
            value: "",
            isRequired: true,
          },
          {
            propName: "description",
            name: "游戏简介",
            value: "",
            type: "textArea",
          },
          {
            propName: "price",
            name: "游戏售价",
            value: 0,
            type: "number",
            isRequired: true,
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
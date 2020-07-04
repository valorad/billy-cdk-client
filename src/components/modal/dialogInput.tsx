import React, { useState } from "react";

import "./dialog.scss";
import "./dialogInput.scss";

import Menu from "../menu";
import { MenuItem } from "../../models/menu.interface";
import MicroModal from "micromodal";

interface InputItem {
  id: string,
  name: string,
}

interface dialogInputProps {
  dialogID: string,
  title: string,
  description: string,
  items: InputItem[],
  onFinish: (data: any) => any,
}

export default (props: dialogInputProps) => {

  const dialogID = `${props.dialogID}`;

  const formMap = {} as any;

  // init form Map based on inputs
  for (let item of props.items) {
    formMap[item.id] = {};
    formMap[item.id]["name"] = item.name;
    formMap[item.id]["value"] = "";
  }

  const [formData, setFormData] = useState<any>(formMap);

  const result = {
    ok: false,
    data: formData,
  }

  const returnResult = (data: any) => {
    props.onFinish(data);
  };

  const menus: MenuItem[] = [
    {
      name: "完成",
      action: () => {
        returnResult(result);
      },
    },
    {
      name: "取消",
      action: () => {
        MicroModal.close(dialogID);
      },
    }
  ];

  const placeFormGroups = () => {
    let formGroups = [];
    for (let key in formMap) {
      formGroups.push(
        <label key={key}>
          {formMap[key].name}
          <input
            type="text"
            value={formData[key]["value"]}
            onChange={
              (e) => {
                setFormData(
                  {
                    ...formData,
                    [key]:{
                      ...formMap[key],
                      value: e.target.value
                    }
                  }
                )
              }
            }/>
        </label>
      );
    }
    return formGroups;
  };

  return (
    <div className="dialogInput dialog">
      <div className="modal micromodal-slide" id={dialogID} aria-hidden="true">
        <div className="modal__overlay" tabIndex={-1} data-micromodal-close>
          <div className="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-1-title">
            <form onSubmit={(e) => {e.preventDefault();}}>
              <header className="modal__header">
                <h2 className="modal__title" id="modal-1-title">
                  {props.title}
                </h2>
                <div className="flexSpacer"></div>
                <button className="modal__close" aria-label="Close modal" data-micromodal-close></button>
              </header>
              <main className="modal__content">
                <header>
                  <p>{props.description}</p>
                </header>
                <main>
                  {placeFormGroups()}
                </main>
                
              </main>
              <footer className="modal__footer">
                <Menu menus={menus} isAutoFocus={false} />
              </footer>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
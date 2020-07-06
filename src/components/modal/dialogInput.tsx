import React, { useState } from "react";

import "./dialog.scss";
import "./dialogInput.scss";

import Menu from "../menu";
import { MenuItem } from "../../models/menu.interface";
import MicroModal from "micromodal";

interface ItemStore {
  name: string,
  value: string,
}

interface InputItem extends ItemStore {
  propName: string, // the name of the field holding the property value
  type?: "text" | "textArea" | "checkBox",
}

interface FormStore {
  [index: string]: InputItem,
}

interface OutputStore {
  [index: string]: string | number | boolean | undefined,
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

  // const inputFormStore = {} as InputFormStore;

  // const formMap = {} as any;
  const formStoreInitState = {} as FormStore;
  const outputStore = {} as OutputStore;

  // init form Map based on inputs
  // for (let item of props.items) {
  //   formMap[item.id] = {};
  //   formMap[item.id]["name"] = item.name;
  //   formMap[item.id]["value"] = "";
  // }
  // for (let item of props.items) {
  //   inputFormStore[item.id] = {
  //     name: item.name,
  //     value: item.value,
  //   };
  // }

  // init formStore
  for (let item of props.items) {
    formStoreInitState[item.propName] = {
      propName: item.propName,
      name: item.name,
      value: item.value,
    };
  }


  const [formStore, setFormStore] = useState({...formStoreInitState});
  const [outputData, setOutputData] = useState(outputStore);
  // outputData contains only the inputs that have been altered.
  // e.g. output: {
  //   "description": "No you will never get a single CDKey from me hahaha!",
  //   "price": 666666
  // } 

  const result = {
    ok: false,
    data: outputData,
  }

  const returnResult = (data: any) => {
    props.onFinish(data);
  };

  const menus: MenuItem[] = [
    {
      name: "完成",
      action: () => {
        // -> if success
        returnResult(result);
        setOutputData({});
        setFormStore({...formStoreInitState});
        // for (let key in formStore) {
        //   delete formStore[key];
        // }
      },
    },
    {
      name: "取消",
      action: () => {
        setOutputData({});
        setFormStore({...formStoreInitState});
        MicroModal.close(dialogID);
      },
    }
  ];

  const placeInputElement = (input: InputItem) => {
    switch (input.type) {
      case "textArea":
        break;
      case "checkBox":
        break;
      default:
        // default is an one-line text input
        return (
          <input
            type="text"
            value={input.value}
            onChange={
              (e) => {
                setOutputData(
                  {
                    ...outputData,
                    [input.propName]: e.target.value,
                  }
                )
                setFormStore(
                  {
                    ...formStore,
                    [input.propName]: {
                      ...formStore[input.propName],
                      value: e.target.value,
                    }
                  }
                )
              }
            }/>
        );
    }
  };

  const placeFormGroups = () => {
    let formGroups = [];
    for (let key in formStore) {
      formGroups.push(
        <label key={key}>
          {formStore[key].name}
          {placeInputElement(formStore[key])}
        </label>
      );
    }
    // for (let key in inputFormStore) {
    //   formGroups.push(
    //     <label key={key}>
    //       {inputFormStore[key].name}
    //       {placeInputElement()}

    //     </label>
    //   );
    // }
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
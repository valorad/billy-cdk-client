import React, { useState } from "react";

import "./dialog.scss";
import "./dialogInput.scss";

import Menu from "../menu";
import { MenuItem } from "../../models/menu.interface";
import MicroModal from "micromodal";
import { DialogInputItem } from "../../models/dialog.interface";

// interface ItemStore {
//   name: string,
//   value: string | number | boolean,
// }

// interface InputItem extends ItemStore {
//   propName: string, // the name of the field holding the property value
//   type?: "text" | "textArea" | "checkBox" | "number",
//   isRequired?: boolean,
// }

interface FormStore {
  [index: string]: DialogInputItem,
}

interface OutputStore {
  [index: string]: string | number | boolean | undefined,
}

interface dialogInputProps {
  dialogID: string,
  title: string,
  description: string,
  items: DialogInputItem[],
  onFinish: (data: any) => any,
}

export default (props: dialogInputProps) => {

  const dialogID = `${props.dialogID}`;

  // const inputFormStore = {} as InputFormStore;

  // const formMap = {} as any;
  const formStoreInitState = {} as FormStore;
  const outputStore = {} as OutputStore;

  // init formStore
  for (let item of props.items) {
    formStoreInitState[item.propName] = {
      // set default values for input items
      isRequired: false,
      
      ...item,
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
    ok: true,
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
        // if (result.ok) {
        //   setOutputData({});
        //   setFormStore({...formStoreInitState});
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

  const placeInputElement = (input: DialogInputItem) => {
    switch (input.type) {
      case "textArea":
        return (
          <textarea
            name={input.propName}
            value={input.value as string}
            required={input.isRequired}
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
            }
          ></textarea>
        );
      case "checkBox":
        return (
          <input
            type="checkbox"
            name={input.propName}
            checked={input.value as boolean}
            onChange={
              (e) => {
                setOutputData(
                  {
                    ...outputData,
                    [input.propName]: e.target.checked,
                  }
                )
                setFormStore(
                  {
                    ...formStore,
                    [input.propName]: {
                      ...formStore[input.propName],
                      value: e.target.checked,
                    }
                  }
                )
              }
            }
          />
        );
        case "number":
          return (
            <input
              type="number"
              name={input.propName}
              value={input.value as number}
              required={input.isRequired}
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
              }
            />
          );
      default:
        // default is an one-line text input
        return (
          <input
            type="text"
            value={input.value as string}
            required={input.isRequired}
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
        <label key={key} className={formStore[key].type === "checkBox"?"checkBox":""}>
          {formStore[key].name}
          {placeInputElement(formStore[key])}
          <span className="checkMark"></span>
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
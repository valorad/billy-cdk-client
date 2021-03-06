import React, { useEffect } from "react";
import { t } from "@lingui/macro";

import Menu from "../menu";
import { MenuItem } from "../../models/menu.interface";
import MicroModal from "micromodal";

import "./dialog.scss";

interface dialogConfirmationProps {
  dialogID: string,
  title?: string,
  description?: string,
  mode?: "YESNO" | "OKAY" | "INFO",
  isAutoShown?: boolean,
  onFinish?: () => any,
}

const DialogConfirmation = (props: dialogConfirmationProps) => {

  props = {
    // set default values
    mode: "YESNO",
    isAutoShown: false,
    
    ...props,
    
  }

  const dialogID = `${props.dialogID}`;

  const setupMenu = () => {
    let menus: MenuItem[] = [];
    switch (props.mode) {
      case "YESNO":
        menus = [
          {
            name: t`Confirm`,
            action: props.onFinish || (() => {}),
          },
          {
            name: t`Cancel`,
            action: () => {
              MicroModal.close(dialogID);
            },
          },
        ];
        break;
      case "OKAY":
        menus = [
          {
            name: t`Okay`,
            action: props.onFinish || (() => {
              MicroModal.close(dialogID);
            }),
          }
        ]
        break;
      default:
        // no button will be displayed if no mode set (intentionally undefined)
        break;
    }
    return menus;
  };

  useEffect(() => {
    if (props.isAutoShown) {
      MicroModal.show(dialogID);
    }
  });

  return (
    <div className={`dialogConfirmation dialog`}>
      <div className="modal micromodal-slide" id={dialogID} aria-hidden="true">
        <div className="modal__overlay" tabIndex={-1} data-micromodal-close>
          <div className="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-1-title">
            <header className="modal__header">
              <h2 className="modal__title" id="modal-1-title">
                {props.title || "Confirmation"}
              </h2>
              <div className="flexSpacer"></div>
              <button className="modal__close" aria-label="Close modal" data-micromodal-close></button>
            </header>
            <main className="modal__content" id="modal-1-content">
              <p>{props.description || "Please confirm."}</p>
            </main>
            <footer className="modal__footer">
              <Menu menus={setupMenu()} />
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogConfirmation;
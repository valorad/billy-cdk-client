import React from "react";

import Menu from "../menu";
import { MenuItem } from "../../models/menu.interface";
import MicroModal from "micromodal";

import "./dialog.scss";

interface dialogConfirmationProps {
  dialogID: string,
  title?: string,
  description?: string,
  onFinish: () => any,
}

export default (props: dialogConfirmationProps) => {

  const dialogID = `${props.dialogID}`;

  const menus: MenuItem[] = [
    {
      name: "确定",
      action: props.onFinish,
    },
    {
      name: "取消",
      action: () => {
        MicroModal.close(dialogID);
      },
    }
  ];

  return (
    <div className="dialogConfirmation dialog">
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
              <Menu menus={menus} />
              {/* <button className="modal__btn modal__btn-primary" onClick={props.onFinish}>Okay</button>
              <button className="modal__btn" data-micromodal-close aria-label="Close this dialog window">Cancel</button> */}
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};
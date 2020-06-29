import React from "react";

// import "./dummy.scss";

interface dialogConfirmationProps {
  dialogID: string,
  title: string,
  content: string,
  onResultOkay: () => any,
}

export default (props: dialogConfirmationProps) => {
  return (
    <div className="dialogConfirmation">
      <div className="modal micromodal-slide" id={`dialogConfirmation-${props.dialogID}`} aria-hidden="true">
        <div className="modal__overlay" tabIndex={-1} data-micromodal-close>
          <div className="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-1-title">
            <header className="modal__header">
              <h2 className="modal__title" id="modal-1-title">
                {props.title}
              </h2>
              <button className="modal__close" aria-label="Close modal" data-micromodal-close></button>
            </header>
            <main className="modal__content" id="modal-1-content">
              <p>{props.content}</p>
            </main>
            <footer className="modal__footer">
              <button className="modal__btn modal__btn-primary" onClick={props.onResultOkay}>Okay</button>
              <button className="modal__btn" data-micromodal-close aria-label="Close this dialog window">Cancel</button>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};
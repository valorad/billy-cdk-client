import React, { useState } from "react";

// import "./dummy.scss";

interface InputItem {
  id: string,
}

interface dialogInputProps {
  dialogID: string,
  title: string,
  description: string,
  // items: InputItem[],
  onFinish: (data: any) => any,
}

export default (props: dialogInputProps) => {

  const formMap = {} as any;

  // // init form Map based on inputs
  // for (let item of props.items) {
  //   formMap[item.id] = {};
  // }

  formMap["input1"] = "";
  formMap["input2"] = "";

  const [formData, setFormData] = useState<any>(formMap);

  const result = {
    ok: false,
    data: formData,
  }

  const returnResult = (data: any) => {
    props.onFinish(data);
  };

  return (
    <div className="dialogInput">
      <div className="modal micromodal-slide" id={`dialogInput-${props.dialogID}`} aria-hidden="true">
        <div className="modal__overlay" tabIndex={-1} data-micromodal-close>
          <div className="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-1-title">
            <form onSubmit={(e) => {e.preventDefault();}}>
              <header className="modal__header">
                <h2 className="modal__title" id="modal-1-title">
                  {props.title}
                </h2>
                <button className="modal__close" aria-label="Close modal" data-micromodal-close></button>
              </header>
              <main className="modal__content" id="modal-1-content">
                <header>
                  <p>{props.description}</p>
                </header>
                <main>
                  <label>
                    Input 1
                    <input type="text" value={formData["input1"]} onChange={(e) => {setFormData({...formData, "input1": e.target.value})}}/>
                  </label>
                  <label>
                    Input 2
                    <input type="text" value={formData["input2"]} onChange={(e) => {setFormData({...formData, "input2": e.target.value})}}/>
                  </label>
                </main>
                
              </main>
              <footer className="modal__footer">
                <button type="submit" className="modal__btn modal__btn-primary" onClick={(e) => {returnResult(result)}}>Okay</button>
                <button className="modal__btn" data-micromodal-close aria-label="Close this dialog window">Cancel</button>
              </footer>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
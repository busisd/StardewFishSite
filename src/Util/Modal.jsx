import React from "react";
import "./Modal.css";

const Modal = ({ visible, onClickBackground, children }) => (
  <div
    className={
      visible ? "react-modal-background" : "react-modal-background hidden"
    }
    onClick={e => {
      if (e.target.className.includes("react-modal-background")) {
        onClickBackground();
      }
    }}
  >
    <div className={visible ? "react-modal" : "react-modal hidden"}>
      {children}
    </div>
  </div>
);

export default Modal;

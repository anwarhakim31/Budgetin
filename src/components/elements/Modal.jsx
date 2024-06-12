import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const BackdropOverlay = ({ onClose }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <div
      className="modal-backdrop-overlay"
      role="presentation"
      onClick={onClose}
    ></div>
  );
};

const ModalOverlay = ({ onClose, showModal, children }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <div
      className={`${showModal ? "modal-active" : ""} modal-overlay`}
      role="presentation"
      onClick={handleClose}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
      ;
    </div>
  );
};

const Modal = ({ onClose, children }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowModal(true);
    }, 10);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {ReactDOM.createPortal(
        <BackdropOverlay onClose={onClose} />,
        document.getElementById("root-modal")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay showModal={showModal} onClose={onClose}>
          {children}
        </ModalOverlay>,
        document.getElementById("root-modal")
      )}
    </>
  );
};

export default Modal;

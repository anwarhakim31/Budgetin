import React from "react";
import Modal from "../../elements/Modal";

const TransactionModal = ({ onClose, setIsDelete }) => {
  const handleDelete = () => {
    setIsDelete(true);
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <h1 className="fw-bold fs-3">
        Are you sure you want to delete this transaction data?
      </h1>
      <p className="fs-2 mt-1">
        Data that has been deleted cannot be restored. Make sure the data to be
        deleted is correct.
      </p>

      <div className="button-modal">
        <button
          aria-label="Cancel Delete"
          onClick={onClose}
          className="button bg-primary-500"
        >
          Cancel
        </button>
        <button
          aria-label="Cancel Delete"
          onClick={handleDelete}
          className="button "
        >
          Delete
        </button>
      </div>
    </Modal>
  );
};

export default TransactionModal;

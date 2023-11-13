import React from "react";
import '../../style/components/modal.css';
import PropTypes from 'prop-types';

function Modal({ setOpenModal }) {
  return (
    <div className="modal-background">
      <div className="modal-container">
        <div className="title-close-btn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="modal-title">
          <h1>Are You Sure You Want to Continue?</h1>
        </div>
        <div className="modal-body">
          <p>The next page looks amazing. Hope you want to go there!</p>
        </div>
        <div className="modal-footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button>Continue</button>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
    setOpenModal: PropTypes.func
}

export default Modal;
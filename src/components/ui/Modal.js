import React from "react";
import '../../style/components/modal.css';
import PropTypes from 'prop-types';
import Button from "../Button";

function Modal({ setOpenModal, title, bodytext, onConfirm }) {
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
          <h1>{title}</h1>
        </div>

        <div className="modal-body">
          <p>{bodytext}</p>
        </div>

        <div className="modal-footer">
          <Button
            textColor="white" 
            bgColor="#BF1B1B"
            borderColor="#BF1B1B"
            onClick={() => {
              setOpenModal(false);
            }}
          >

            Cancelar
          </Button>

          <Button
            textColor="white"
            bgColor="#036"
            borderColor="#036"
            onClick={onConfirm}
          >
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  setOpenModal: PropTypes.func,
  title: PropTypes.string
}
Modal.propTypes = {
  setOpenModal: PropTypes.func,
  bodytext: PropTypes.string
}
Modal.propTypes = {
  setOpenModal: PropTypes.func,
  onConfirm: PropTypes.func
}

export default Modal;
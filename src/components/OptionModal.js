import React from 'react';
import Modal from 'react-modal';

const OptionModal = props => (
  <div>
    <Modal
      onRequestClose={props.handleClearSelectedOption}
      isOpen={!!props.selectedOption}
      contentLabel={'Selected Option'}
      closeTimeoutMS={300}
      className="modal"
    >
      <h3 className="modal__title">Selected Option</h3>
      {props.selectedOption && (
        <p className="modal__body">{props.selectedOption}</p>
      )}
      <button className="button" onClick={props.handleClearSelectedOption}>
        okay
      </button>
    </Modal>
  </div>
);

export default OptionModal;

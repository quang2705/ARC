import React, { Component } from 'react';
import { render } from 'react-dom';

import Modal from '../../DefaultUI/Modal/modal';
import TutorContractForm from './TutorContractForm/tutor-contract-form';

import css from './tutor-contracts.module.css';

export default class TutorContracts extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false, };
  }

  toggleModal = () => {
    this.setState((prevState) => {
      return {...prevState, showModal: !prevState.showModal };
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.toggleModal}>Create a contract</button>
        <Modal isVisible={this.state.showModal} toggle={this.toggleModal}
               title={'Create new contract a very long title for this modal to handle lol'}>

          <TutorContractForm/>
        </Modal>
      </div>
    );
  }
}

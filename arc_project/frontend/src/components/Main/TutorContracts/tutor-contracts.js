import React, { Component } from 'react';
import { render } from 'react-dom';
import TutorContractForm from './TutorContractForm/tutor-contract-form';

import css from './tutor-contracts.module.css';

export default class TutorContracts extends Component {

  render() {
    return (
      <TutorContractForm/>
    );
  }
}

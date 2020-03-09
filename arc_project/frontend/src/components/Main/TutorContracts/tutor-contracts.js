import React, { Component } from 'react';
import { render } from 'react-dom';

import Modal from '../../DefaultUI/Modal/modal';
import TutorContractForm from './TutorContractForm/tutor-contract-form';
import css from './tutor-contracts.module.css';
import TutorContractItem from './TutorContractItem/tutor-contract-item';
import MyAPI from '../../Api'

export default class TutorContracts extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false,
                   data: [], };
  }

  toggleModal = () => {
    this.setState((prevState) => {
      return {...prevState, showModal: !prevState.showModal };
    });
  }

  componentDidMount() {
		//get all the contract of this user, then put it
		//into this.state.data. Check MyAPI class for more
		//functionality
		MyAPI.get_contract()
		.then((response) => {
			//TODO: check for error response here
			return response.json();
		})
		.then((data) => {
			//set this.state.data
			return this.setState(() => {
				return ({data: data.results});
			});
		});
  }

  render() {
		//pass the contract data from this.state.data to the TutorContractItem
		//child, the data can be accessed through this.props.contract in
		//TutorContractItem
		let contracts = this.state.data.map((contract, index) => {
			return(
				<TutorContractItem key={index} contract={contract}/>
			);
		});
    return (
      <div>
        <button onClick={this.toggleModal}>Create a contract</button>
        <Modal isVisible={this.state.showModal} toggle={this.toggleModal}
               title={'Create new contract a very long title for this modal to handle lol'}>

          <TutorContractForm/>
        </Modal>
			  {contracts}
      </div>
    );
  }
}

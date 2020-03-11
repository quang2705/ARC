import React, { Component } from 'react';
import { render } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Modal from '../../DefaultUI/Modal/modal';
import TutorContractForm from './TutorContractForm/tutor-contract-form';
import TutorContractItem from './TutorContractItem/tutor-contract-item';
import MyAPI from '../../Api';

import css from './tutor-contracts.module.css';
import cssSession from '../TutorSessions/tutor-sessions.module.css';

export default class TutorContracts extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false,
                   data: [], };
  }

  componentDidMount() {
		// Get all the contract of this user, then put it
		// into this.state.data. Check MyAPI class for more
		// functionality
		MyAPI.get_contract()
		.then((response) => {
			//TODO: check for error response here
			return response.json();
		})
		.then((data) => {
			//set this.state.data
			this.setState({
				data: data.results,
			});
		});
  }

  toggleModal = () => {
    this.setState((prevState) => {
      return { ...prevState, showModal: !prevState.showModal };
    });
  }

  render() {
		// Pass the contract data from this.state.data to the TutorContractItem
		// child, the data can be accessed through this.props.contract in
		// TutorContractItem
		let contracts = this.state.data.map((contract, index) => {
			return(
				<TutorContractItem key={index} contract={contract}/>
			);
		});

    return (
      <div className={css.container}>
        <div className={cssSession.buttonWrapper}>
          <span className={cssSession.addButton} onClick={this.toggleModal}>
            <FontAwesomeIcon icon='plus'/>
            &nbsp; new contract
          </span>
        </div>
        <Modal isVisible={this.state.showModal} toggle={this.toggleModal}
               title={'Create new contract'}>
          <TutorContractForm/>
        </Modal>

        <div className={cssSession.list}>
  			  {contracts}
        </div>
      </div>
    );
  }
}

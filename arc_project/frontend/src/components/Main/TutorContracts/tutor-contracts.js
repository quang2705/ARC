import React, { Component } from 'react';
import { render } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from '../../Auth/auth'

import Modal from '../../DefaultUI/Modal/modal';
import TutorContractForm from './TutorContractForm/tutor-contract-form';
import TutorContractItem from './TutorContractItem/tutor-contract-item';
import MyAPI from '../../Api';

import css from './tutor-contracts.module.css';
import cssSession from '../TutorSessions/tutor-sessions.module.css';

export default class TutorContracts extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
        showModal: false,
        data: [], };
  }
  componentDidMount() {
		// Get all the contract of this user, then put it
		// into this.state.data. Check MyAPI class for more
		// functionality
		MyAPI.get_contract(null, this.context.access_token)
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

  rerenderContract = (data) => {
      this.setState (() => {
          var new_data = this.state.data;
          new_data.push(data);
          return { data: new_data };
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

          <AuthContext.Consumer>
              {value => <TutorContractForm auth={value} rerenderContract={this.rerenderContract}/>}
          </AuthContext.Consumer>
        </Modal>

        <div className={cssSession.list}>
  			  {contracts}
        </div>
      </div>
    );
  }
}

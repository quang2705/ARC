import React, { Component } from 'react';
import { render } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from '../../Auth/auth'

import Modal from '../../DefaultUI/Modal/modal';
import TutorContractForm from './TutorContractForm/tutor-contract-form';
import TutorContractItem from './TutorContractItem/tutor-contract-item';
import MyAPI from '../../Api';
import Button from '../../DefaultUI/Button/button';
import Collapsible from '../../DefaultUI/Collapsible/collapsible';

import css from './tutor-contracts.module.css';
import cssSession from '../TutorSessions/tutor-sessions.module.css';

export default class TutorContracts extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      data: [],
      showEditContract: false,
      currentEditContract: null
    };

    this.getMeetingsFuncs = {};
  }

  componentDidMount() {
		// Get all the contract of this user, then put it
		// into this.state.data. Check MyAPI class for more
		// functionality
		this.getContracts();
  }

  getContracts = (contract_id=null) => {
    MyAPI.get_contract(null, this.context.access_token,
                        {'position': this.props.position})
		.then((response) => {
			//TODO: check for error response here
			return response.json();
		})
		.then((data) => {
			this.setState({
				data: data,
			}, () => {
        if (contract_id)
          this.getMeetingsFuncs[contract_id]();
      });
		});
  }

  getMeetFunc = (id, func) => {
    this.getMeetingsFuncs[id] = func;
  }

  toggleModal = () => {
    this.setState(prevState => {
      return { showModal: !prevState.showModal };
    });
  }

  rerenderContract = (data) => {
      this.setState (() => {
          var new_data = this.state.data;
          new_data.push(data);
          return { data: new_data };
      });
  }

  onDeleteContract = (contract_id) => {
      MyAPI.delete_contract(contract_id, this.context.access_token)
      .then((res) => {
         return res.json();
     }).then((data) => {
         this.getContracts();
     });
  }

  onEditContract = (data) => {
    this.setState({ currentEditContract: data,
                    showEditContract: true });
  }

  toggleEditContract = () => {
    this.setState(prevState => {
      return { showEditContract: !prevState.showEditContract };
    });
  }

  render() {
		// Pass the contract data from this.state.data to the TutorContractItem
		// child, the data can be accessed through this.props.contract in
		// TutorContractItem
		let contracts = this.state.data.map((contract, index) => {
			return (
				<TutorContractItem key={index} contract={contract}
                           getMeetFunc={this.getMeetFunc}
                           originalMeetings={contract.contract_meetings}
                           onDeleteContract={this.onDeleteContract}
                           onEditContract={this.onEditContract}
                           position ={this.props.position}/>
			);
		});

    let header = (
      <div className={css.header}>
        <div>Tutor</div>
        <div>Tutee</div>
      </div>
    );

    if (this.state.showModal || this.state.showEditContract)
      document.body.style.overflow = 'hidden';
    else
      document.body.style.overflow = 'auto';

    return (
      <div className={css.container}>
        <div className={cssSession.buttonWrapper}>
          <Button onClick={this.toggleModal} color='red'
                  text={<><FontAwesomeIcon icon='plus'/>&nbsp; new contract</>}/>

        </div>
        <Modal isVisible={this.state.showModal} toggle={this.toggleModal}
               title={'Create new contract'}>
          {this.state.showModal &&
          <AuthContext.Consumer>
              {value => <TutorContractForm auth={value} rerenderContract={this.rerenderContract} close={this.toggleModal}/>}
          </AuthContext.Consumer>}
        </Modal>

        <Modal isVisible={this.state.showEditContract} toggle={this.toggleEditContract} title={'Edit contract'}>
          {this.state.showEditContract &&
          <AuthContext.Consumer>
              {value => <TutorContractForm auth={value} data={this.state.currentEditContract} close={this.toggleEditContract} refresh={this.getContracts}/>}
          </AuthContext.Consumer>}
        </Modal>

        <div className={cssSession.list}>
          <Collapsible main={header} hideIcon={true}/>
  			  {contracts}
        </div>
      </div>
    );
  }
}

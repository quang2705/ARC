import React, { Component } from 'react';
import { render } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import TutorSessionItem from './TutorSessionItem/tutor-session-item';
import TutorSessionForm from './TutorSessionForm/tutor-session-form';
import MyAPI from '../../Api';
import Modal from '../../DefaultUI/Modal/modal';

import css from './tutor-sessions.module.css';

export default class TutorSessions extends Component {
  constructor(props){
    super(props);
    this.state = {
			data: [],
      showModal: false,
		};
  }

  componentDidMount(){
		// Get all the session of this user, then put it
		// into this.state.data. Check MyAPI class for more
		// functionality
		MyAPI.get_session()
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
      return { showModal: !prevState.showModal };
    });
  }

  render() {
		// Pass the session data from this.state.data to the tutorSessionItem
		// child, the data can be accessed through this.props.session in
		// tutorSessionItem
		let sessions = this.state.data.map((session, index) => {
			return(
				<TutorSessionItem key={index} session={session}/>
			);
		});
    return (
      <div className={css.container}>
        <div className={css.buttonWrapper}>
          <span className={css.addButton} onClick={this.toggleModal}>
            <FontAwesomeIcon icon='plus'/>
            &nbsp; new session
          </span>
        </div>
        <Modal isVisible={this.state.showModal} toggle={this.toggleModal}
               title={'Create a new session'}>

          <TutorSessionForm/>
        </Modal>

        <div className={css.list}>
  				{sessions}
        </div>
      </div>
    );
  }
}

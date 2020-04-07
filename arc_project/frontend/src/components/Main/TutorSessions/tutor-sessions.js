import React, { Component } from 'react';
import { render } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from '../../Auth/auth'

import TutorSessionItem from './TutorSessionItem/tutor-session-item';
import TutorSessionForm from './TutorSessionForm/tutor-session-form';
import MyAPI from '../../Api';
import Modal from '../../DefaultUI/Modal/modal';

import css from './tutor-sessions.module.css';

export default class TutorSessions extends Component {
  static contextType = AuthContext;
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
		MyAPI.get_session(null, this.context.access_token)
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

  rerenderSession = (data) => {
      this.setState(() => {
          var new_data = this.state.data.slice();
          new_data.push(data);
          return {data: new_data};
      });
  }

  onDeleteSession = (session_id) => {
      MyAPI.delete_session(session_id, this.context.access_token)
      .then((res) => {
         return res.json();
     }).then((data) => {
         this.setState(() => {
             var new_data  = this.state.data.slice();
             for (let i = 0; i < new_data.length; i++){
                 if (new_data[i].id === Number(data.id)){
                     new_data.splice(i, 1);
                     break;
                 }
             }
             return {data:new_data};
         })
     });
  }

  render() {
		// Pass the session data from this.state.data to the tutorSessionItem
		// child, the data can be accessed through this.props.session in
		// tutorSessionItem
		let sessions = this.state.data.map((session, index) => {
			return(
				<TutorSessionItem key={index} session={session} onDeleteSession={this.onDeleteSession}/>
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

          <TutorSessionForm rerenderSession = {this.rerenderSession}/>
        </Modal>

        <div className={css.list}>
  				{sessions}
        </div>
      </div>
    );
  }
}

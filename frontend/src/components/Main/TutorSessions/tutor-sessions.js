import React, { Component } from 'react';
import { render } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from '../../Auth/auth';

import TutorSessionItem from './TutorSessionItem/tutor-session-item';
import TutorSessionForm from './TutorSessionForm/tutor-session-form';
import MyAPI from '../../Api';
import Modal from '../../DefaultUI/Modal/modal';
import Button from '../../DefaultUI/Button/button';

import css from './tutor-sessions.module.css';

export default class TutorSessions extends Component {
  static contextType = AuthContext;
  constructor(props){
    super(props);
    this.state = {
        data: [],
        showModal: false,
        sending: {},
       };
  }

  componentDidMount(){
		// Get all the session of this user, then put it
		// into this.state.data. Check MyAPI class for more
		// functionality
		this.getSessions();
  }

  getSessions = () => {
    MyAPI.get_session(null, this.context.access_token)
		.then((data) => {
			//set this.state.data
			this.setState({
				data: data,
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
          return { data: new_data, showModal: false };
      });
  }

  onDeleteSession = (session_id) => {
      MyAPI.delete_session(session_id, this.context.access_token)
      .then((res) => {
         return res.json();
     }).then((data) => {
         this.getSessions();
     });
  }

  onSendVerification = (session_id) => {
    this.setState(prevState => {
      let newSending = prevState.sending;
      newSending[session_id] = 'sending';
      return { sending: newSending };
    });

    MyAPI.get_session(session_id, this.context.access_token)
    .then((data) => {
        let tutee_email = data.contract.tutee.email;
        let tutee_firstname = data.contract.tutee.first_name;
        let date = data.date;
        let start = data.start;
        let end = data.end;

        MyAPI.get_encrypted_string({'encode_string': session_id}, this.context.access_token)
        .then((data) =>{
            let encrypted_string = data.encrypted_string;
            let link = `${window.location.href}verify/sessions/?secret=${encrypted_string}`;
            const message =
                "From: me \r\n" +
                `To: ${tutee_email} \r\n` +
                "Subject: Tutoring Session Verification \r\n\r\n" +
                `Hi ${tutee_firstname},\n`+
                `Please verify the tutoring session on ${date} from ${start} to ${end} with this link\n ${link}`;

            const encodedMessage = btoa(message).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

            gapi.client.gmail.users.messages.send({
                userId: 'me',
                resource: {
                    // same response with any of these
                    raw: encodedMessage
                }
            }).then((data) => {
              this.setState(prevState => {
                let newSending = prevState.sending;
                newSending[session_id] = 'done';
                return { sending: newSending };
              });
            });
        });
    });




  }
  render() {
		// Pass the session data from this.state.data to the tutorSessionItem
		// child, the data can be accessed through this.props.session in
		// tutorSessionItem
		let sessions = this.state.data.map((session, index) => {
			return(
				<TutorSessionItem key={index} session={session}
                          onDeleteSession={this.onDeleteSession}
                          onSendVerification={this.onSendVerification}
                          sendStatus={this.state.sending[session.id]}/>
			);
		});

    if (this.state.showModal)
      document.body.style.overflow = 'hidden';
    else
      document.body.style.overflow = 'auto';

    return (
      <div className={css.container}>
        <div className={css.buttonWrapper}>
          <Button onClick={this.toggleModal} color='red'
                  text={<><FontAwesomeIcon icon='plus'/>&nbsp; new session</>}/>
        </div>
        <Modal isVisible={this.state.showModal} toggle={this.toggleModal}
               title={'Add a new session'}>
          {this.state.showModal &&
          <TutorSessionForm rerenderSession={this.rerenderSession}/>}
        </Modal>

        <div className={css.list}>
  				{sessions}
        </div>
      </div>
    );
  }
}

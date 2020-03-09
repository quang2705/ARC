import React, { Component } from 'react';
import { render } from 'react-dom';
import css from './tutor-sessions.module.css';
import TutorSessionItem from './TutorSessionItem/tutor-session-item';
import MyAPI from '../../Api'

export default class TutorSessions extends Component {
  constructor(props){
    super(props);
    this.state = {
			data:[]
		};
  }

  componentDidMount(){
		//get all the session of this user, then put it
		//into this.state.data. Check MyAPI class for more
		//functionality
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


  render() {
		//pass the session data from this.state.data to the tutorSessionItem
		//child, the data can be accessed through this.props.session in
		//tutorSessionItem
		let sessions = this.state.data.map((session, index) => {
			return(
				<TutorSessionItem key={index} session={session}/>
			);
		});
    return (
      <>
				{sessions}
      </>
    );
  }
}

import React, { Component } from 'react';
import { render } from 'react-dom';
import MyAPI from '../../../Api'


import css from './tutor-contract-item.module.css';

export default class TutorContractItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: {
        class: '',
        tutee: '',
        phone: '',
        email: '',
        heademail: '',
        meetings:
        []
      },
      meetings: [],
    };
  }

  componentDidMount(){
    for (var i = 0; i < this.props.contract.contract_meetings.length; i++) {
      var index = this.props.contract.contract_meetings[i].id;
      MyAPI.get_contractmeeting(index)
      .then((response) => {
        //TODO: check for error response here
        return response.json();
      })
      .then((data) => {
        //set this.state.data
        var newMeetings = this.state.meetings;
        newMeetings.push(data);
        this.setState({ meetings: newMeetings });
      });
    }
  }

  render() {
    console.log('meetingss',this.meetingss)

    let data = {class_name: this.props.contract.class_name,
                tutee: this.props.contract.tutee.first_name + " " + this.props.contract.tutee.last_name,
								tutor: this.props.contract.tutor.first_name + " " + this.props.contract.tutor.last_name,
                tutor_phone: '740 281 9394',
								tutee_phone: '740 123 1231',
                tutee_email:this.props.contract.tutor.email,
								tutor_email:this.props.contract.tutor.email,
                heademail:' ',
                meetings: this.state.meetings,
								subject: this.props.contract.subject,
								professor_name: this.props.contract.professor_name,
                };

    let meetings = data.meetings.map((meeting, index) => {
      return (
        <div key={index}>
          <div>Location: {meeting.location}</div>
          <div>Day: {meeting.date}</div>
          <div>Start time: {meeting.start}</div>
          <div>End time: {meeting.end}</div>
        </div>
      );
    });
 console.log(data.meetings.length)
    return (
    <div>
      <div>Class: {data.class_name}</div>
      <div>Tutor: {data.tutor}</div>
			<div>Tutee: {data.tutee}</div>
      <div>Tutor Phone: {data.tutor_phone}</div>
			<div>Tutee Phone: {data.tutee_phone}</div>
			<div>Tutor Email: {data.tutor_email}</div>
      <div>Tutee Email: {data.tutee_email}</div>
      <div>Head Tutor Email: {data.heademail}</div>
      <div>Professor Name: {data.professor_name}</div>
    	{meetings}
    </div>
    );
  }
}

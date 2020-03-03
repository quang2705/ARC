import React, { Component } from 'react';
import { render } from 'react-dom';

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
    };
  }

  componentDidMount(){
  }

  render() {
		console.log("inside contact item", this.props.contract);
		var class_name = this.props.contract.class_name;
		var professor_name = this.props.contract.professor_name;
		var subject = this.props.contract.subject;
		var tutor = this.props.contract.tutor.first_name + " " + this.props.contract.tutor.last_name;
		var tutee = this.props.contract.tutee.first_name + " " + this.props.contract.tutee.last_name;
		var tutor_email = this.props.contract.tutor.email;
		var tutee_email = this.props.contract.tutee.email;

    let data = {class_name: class_name,
                tutee: tutee,
								tutor: tutor,
                tutor_phone: '740 281 9394',
								tutee_phone: '740 123 1231',
                tutee_email:tutee_email,
								tutor_email:tutor_email,
                heademail:' ',
                meetings:
                [
                  {loc: 'Knapp',
                  day: 'Monday',
                  starttime : '09:00 pm',
                  endtime: '09:30 pm'},
                  {loc: 'Olin',
                  day: 'Tuesday',
                  starttime : '10:00 pm',
                  endtime: '10:30 pm'}
                ],
								subject: subject,
								professor_name: professor_name,
                };

    let meetings = data.meetings.map((meeting, index) => {
      return (
        <div key={index}>
          <div>Location: {meeting.loc}</div>
          <div>Day: {meeting.day}</div>
          <div>Start time: {meeting.starttime}</div>
          <div>End time: {meeting.endtime}</div>
        </div>
      );
    });

    return (
    <div>
      <div>Class: {data.class_name}</div>
      <div>Tutee: {data.tutee}</div>
			<div>Tutee: {data.tutor}</div>
      <div>Tutor Phone: {data.tutee_phone}</div>
			<div>Tutee Phone: {data.tutor_phone}</div>
      <div>Tutee Email: {data.tutee_email}</div>
			<div>Tutor Email: {data.tutor_email}</div>
      <div>Head Tutor Email: {data.heademail}</div>
			<div>Professor Name: {data.professor_name}</div>

			{meetings}
    </div>
    );
  }
}

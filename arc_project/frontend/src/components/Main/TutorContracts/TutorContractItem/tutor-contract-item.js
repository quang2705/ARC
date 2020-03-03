import React, { Component } from 'react';
import { render } from 'react-dom';

import css from './tutor-contract-item.module.css';

export default class TutorContractItem extends Component {

  render() {
    let data = {class: 'CS 111',
                tutee: 'Khue Le',
                phone: '740 281 9394',
                email: 'le_k1@denison.edu',
                heademail: '',
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
      <div>Class: {data.class}</div>
      <div>Tutee: {data.tutee}</div>
      <div>Phone: {data.phone}</div>
      <div>Email: {data.email}</div>
      <div>Head Tutor Email: {data.heademail}</div>
      {meetings}
    </div>
    );
  }
}

import React, { Component } from 'react';
import { render } from 'react-dom';

import css from './tutor-session-item.module.css';

export default class TutorSessionItem extends Component {

  render() {

    let session =
      {
        class: 'MATH 145',
        tutee: 'Hiep Phan',
        date: '10-22-2020',
        starttime : '02:00 pm',
        endtime: '03:00 pm',
        status: 'verified'
      }

    return (
    <div>
    <br/>
     <div>Class: {session.class}</div>
     <div>Tutee: {session.tutee}</div>
     <div>Date: {session.date}</div>
     <div>Start time: {session.starttime}</div>
     <div>End time: {session.endtime}</div>
    <br/>
    </div>
    );
  }
}

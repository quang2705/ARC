import React, { Component } from 'react';
import { render } from 'react-dom';

import css from './admin-summary-item.module.css';

import MyAPI from '../../../Api';

export default class AdminSummaryItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            tutor_id : this.props.tutor.id,
            tutor_first_name: this.props.tutor.first_name,
            tutor_last_name: this.props.tutor.last_name,
            tutor_phone: this.props.tutor.phone,
            tutor_email: this.props.tutor.email,
            tutor_sessions: []
        };
    }

    total_hours = (sessions) => {
        var hours = 0;
        var minutes = 0;
        sessions.map((session, index) => {
            var start = new Date(session.date + " " + session.start);
            var end = new Date(session.date + " " + session.end);
            var sec = Math.abs(start - end) / 1000;
            hours += Math.floor(sec/3600);
            minutes += Math.floor(sec/60);
        });
        hours = hours % 24;
        minutes = minutes % 60;
        return [hours, minutes].join(':');
    }
    
    componentDidMount(){
        MyAPI.get_user_session(this.state.tutor_id)
        .then((response) => {
            return response.json();
        }).then((data) => {
            this.setState({tutor_sessions: data});
        });
    }

  render() {
      var index = this.props.index;
      var tutor_first_name = this.state.tutor_first_name;
      var tutor_last_name = this.state.tutor_last_name;
      var tutor_email = this.state.tutor_email;
      var tutor_phone = this.state.tutor_phone;
      var tutor_sessions = this.state.tutor_sessions;
      var total_hours = this.total_hours(tutor_sessions);
      var total_verified_hours = 0;
    return (
        <tr key={index}>
           <td>{tutor_first_name}</td>
           <td>{tutor_last_name}</td>
           <td>{tutor_email}</td>
           <td>{tutor_phone}</td>
           <td>{total_verified_hours}</td>
           <td>{total_hours}</td>
       </tr>
    );
  }
}

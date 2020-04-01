import React, { Component } from 'react';
import { render } from 'react-dom';
import { AuthContext } from '../../../Auth/auth';

import css from './admin-summary-item.module.css';

import MyAPI from '../../../Api';

export default class AdminSummaryItem extends Component {
    static contextType = AuthContext;
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

    get_verified_session = (sessions) => {
        var tutor_verified_sessions = []
        for (let i = 0; i < sessions.length; i++){
            let session = sessions[i];
            if (session.is_verified == true){
                tutor_verified_sessions.push(session);
            }
        }
        return tutor_verified_sessions;
    }
    componentDidMount(){
        MyAPI.get_user_session(this.state.tutor_id, this.context.access_token)
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
      var tutor_verified_sessions = this.get_verified_session(tutor_sessions);
      var total_verified_hours = this.total_hours(tutor_verified_sessions);
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

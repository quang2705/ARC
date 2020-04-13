import React, { Component } from 'react';
import { render } from 'react-dom';
import { AuthContext } from '../../../Auth/auth';

import css from '../admin-summary.module.css';

import MyAPI from '../../../Api';

export default class AdminSummaryItem extends Component {
  static contextType = AuthContext;
  constructor(props){
      super(props);
  }

  total_hours = (sessions) => {
      var hours = 0;
      var minutes = 0;
      if (sessions == undefined) {
          return [0,0].join(':');
      }
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
      if (sessions == undefined){
          return []
      }
      var tutor_verified_sessions = []
      for (let i = 0; i < sessions.length; i++){
          let session = sessions[i];
          if (session.is_verified == true){
              tutor_verified_sessions.push(session);
          }
      }
      return tutor_verified_sessions;
  }

  render() {
      var tutor_first_name = this.props.tutor.first_name;
      var tutor_last_name = this.props.tutor.last_name;
      var tutor_email = this.props.tutor.email;
      var tutor_phone = this.props.tutor.phone;
      var tutor_sessions = this.props.sessions;
      var total_hours = this.total_hours(tutor_sessions);
      var tutor_verified_sessions = this.get_verified_session(tutor_sessions);
      var total_verified_hours = this.total_hours(tutor_verified_sessions);

      let data = [tutor_first_name, tutor_last_name, tutor_email, total_verified_hours, total_hours];
      let row = data.map((item, index) => {
        return (
          <td key={index} title={item}
               style={{ flex: this.props.flex[index] }} className={css.dataCell}>
            {item}
          </td>
        );
      });

    return (
        <tr className={css.row}>
          {row}
        </tr>
    );
  }
}

import React, { Component } from 'react';
import { render } from 'react-dom';

import Collapsible from '../../../DefaultUI/Collapsible/collapsible';
import Button from '../../../DefaultUI/Button/button';

import css from './tutor-session-item.module.css';

export default class TutorSessionItem extends Component {

  getTime = (time) => {
    let timeRegex = /^\d\d\:\d\d/;
    time = timeRegex.exec(time)[0];
    let hour = parseInt(time[0]+time[1]);
    let min = parseInt(time[3]+time[4]);
    let period = hour >= 12 ? "pm" : "am";
    if (hour > 12)
      hour = hour % 12;
    return hour+':'+min+' '+period;
  }

  render() {
    let data = {
                session_id : this.props.session.id,
                class_name: this.props.session.contract.class_name,
                tutee_name: this.props.session.contract.tutee.first_name + " " + this.props.session.contract.tutee.last_name,
                tutee_email: this.props.session.contract.tutee.email,
                date: this.props.session.date,
                start: this.props.session.start,
                end: this.props.session.end,
                is_verified: this.props.session.is_verified,
                is_waiting: this.props.session.is_waiting,
                summary: this.props.session.summary
             };

    let mainInfo = (
<<<<<<< HEAD
      <>
        <div>Tutte Name: {data.tutee_name}</div>
        <div>Tutee Email: {data.tutee_email}</div>
        <div>Class: {data.class_name}</div>
        <div>Date: {data.date}</div>
        <div>Waiting for Tutee: {data.is_waiting}</div>
        <div>Session Verified: {data.is_verified}</div>
        <input type="submit" value="delete" onClick={() => this.props.onDeleteSession(data.session_id)}/>
        <br/>
        <input type="submit" value="verify" onClick={() => this.props.onSendVerification(data.session_id)}/>
      </>
=======
      <div className={css.main}>
        <div className={css.left}>
          <div style={{ fontWeight: 600 }}>{data.tutee_name}</div>
          <div style={{ fontStyle: 'italic' }}>{data.tutee_email}</div>
          <div>Class: {data.class_name}</div>
          <div className={css.statusBar}>
            {data.is_verified?
            <div className={css.verified+' '+css.status}>Verified</div> :
            <div className={css.unverified+' '+css.status}>Unverified</div>
            }
            {!data.is_verified && <Button text='Send reminder' color='green' className={css.status}/>}
          </div>
        </div>
        <div className={css.right}>
          <div>{data.date}</div>
          <span style={{ textAlign: 'right', fontStyle: 'italic', fontSize: 12 }}>
            {this.getTime(data.start)} - {this.getTime(data.end)}
          </span>
        </div>
      </div>
>>>>>>> 1a04221083c1b7a6d78f2a1f200c164dc68c6d78
    );

    let details = (
      <div className={css.details}>
        <div><span style={{ fontWeight: 700 }}>Summary: </span>{data.summary}</div>
        <div className={css.deleteWrapper}>
          <Button text='Delete session' color='red' className={css.deleteButton} reverse={true}
                  onClick={() => this.props.onDeleteSession(data.session_id)}/>
        </div>
      </div>
    )
    return (
      <Collapsible main={mainInfo} details={details} className={css.container}/>
    );
  }
}

import React, { Component } from 'react';
import { render } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Collapsible from '../../../DefaultUI/Collapsible/collapsible';
import Button from '../../../DefaultUI/Button/button';
import Popup from '../../../DefaultUI/Popup/popup';

import css from './tutor-session-item.module.css';

export default class TutorSessionItem extends Component {
  constructor(props) {
    super(props);
    this.state = { showDeletePopup: false };
  }

  getTime = (time) => {
    let timeRegex = /^\d\d\:\d\d/;
    time = timeRegex.exec(time)[0];
    let hour = parseInt(time[0]+time[1]);
    let min = parseInt(time[3]+time[4]);
    let period = hour >= 12 ? "pm" : "am";
    if (hour > 12)
      hour = hour % 12;
    if (min < 10)
        min = time[3]+time[4];
    return hour+':'+min+' '+period;
  }

  toggleDeletePopup = () => {
    this.setState(prevState => {
      return { showDeletePopup: !prevState.showDeletePopup };
    });
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

    let loadIcon = <span className={css.loadIcon}><FontAwesomeIcon icon='sync-alt'/></span>

    let mainInfo = (
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
            {!data.is_verified && !this.props.isAdmin &&
            <Button text={this.props.sendStatus !== 'sending' ? 'Send reminder' : loadIcon} color='green' className={css.status} onClick={() => this.props.onSendVerification(data.session_id)}/>}
            {this.props.sendStatus === 'done' && <div className={css.statusText}>Verification sent!</div>}
          </div>
        </div>
        <div className={css.right}>
          <div>{data.date}</div>
          <span style={{ textAlign: 'right', fontStyle: 'italic', fontSize: 12 }}>
            {this.getTime(data.start)} - {this.getTime(data.end)}
          </span>
        </div>
      </div>
    );

    let details = (
      <div className={css.details}>
        <div><span style={{ fontWeight: 700 }}>Summary: </span>{data.summary}</div>
        <div className={css.deleteWrapper}>
          {!this.props.isAdmin &&
          <Button text='Delete session' color='red' className={css.deleteButton} reverse={true}
                  onClick={this.toggleDeletePopup}/>}
        </div>

        {this.state.showDeletePopup &&
        <Popup isVisible={true}
               toggle={this.toggleDeletePopup}
               title='Delete session'
               message='This action is permanent and cannot be undone.'
               yes={() => this.props.onDeleteSession(data.session_id)}
               no={this.toggleDeletePopup}/>}
      </div>
    )
    return (
      <Collapsible main={mainInfo} details={details} className={css.container}/>
    );
  }
}

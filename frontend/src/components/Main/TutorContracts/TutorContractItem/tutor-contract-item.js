import React, { Component } from 'react';
import { render } from 'react-dom';
import { AuthContext } from '../../../Auth/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import MyAPI from '../../../Api';
import Collapsible from '../../../DefaultUI/Collapsible/collapsible';
import Button from '../../../DefaultUI/Button/button';

import css from './tutor-contract-item.module.css';
import cssSession from '../../TutorSessions/TutorSessionItem/tutor-session-item.module.css';

export default class TutorContractItem extends Component {
  static contextType = AuthContext;
  constructor(props){
    super(props);
    this.state = { meetings: [] };
  }

  componentDidMount(){
    for (var i = 0; i < this.props.contract.contract_meetings.length; i++) {
      var index = this.props.contract.contract_meetings[i].id;
      MyAPI.get_contractmeeting(index, this.context.access_token,
                                {'position': this.props.position})
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

  formatString = (s) => {
   return typeof(s) === typeof('') && s.trim() !== '' ? s : 'N/A';
  }

  onEditContract = () => {
    let meetings = this.state.meetings.map((item, index) => {
      return { ...item, day: item.date, start: item.start.substr(0,5), end: item.end.substr(0,5) };
    });

    let data = {contract_id: this.props.contract.id,
                tutorPhone: this.props.contract.tutor.phone,
                tuteeFirstName: this.props.contract.tutee.first_name,
                tuteeLastName: this.props.contract.tutee.last_name,
                tuteeEmail: this.props.contract.tutee.email,
                tuteePhone: this.props.contract.tutee.phone,
                heademail: '',
                meetings: meetings,
                subject: this.props.contract.subject.subject_name,
                class: this.props.contract.class_name,
                instructor: this.props.contract.professor_name};

    this.props.onEditContract(data);
  }

  render() {
    let data = {contract_id: this.props.contract.id,
                class_name: this.props.contract.class_name,
                tutee: this.props.contract.tutee.first_name + " " + this.props.contract.tutee.last_name,
                tutor: this.props.contract.tutor.first_name + " " + this.props.contract.tutor.last_name,
                tutor_phone: this.props.contract.tutor.phone,
                tutee_phone: this.props.contract.tutee.phone,
                tutee_email: this.props.contract.tutee.email,
                tutor_email: this.props.contract.tutor.email,
                heademail: ' ',
                meetings: this.state.meetings,
                subject: this.props.contract.subject.subject_name,
                professor_name: this.props.contract.professor_name};

    let meetings = data.meetings.map((meeting, index) => {
      return (
        <div key={index} className={css.meeting}>
          {meeting.location} - {meeting.date} - {this.getTime(meeting.start)} - {this.getTime(meeting.end)}
        </div>
      );
    });

    let mainInfo = (
      <div className={css.main}>
        {!this.props.isAdmin &&
        <div className={css.left}>
          <div><span><FontAwesomeIcon icon='user'/></span> {data.tutor}</div>
          <div style={{ fontStyle: 'italic' }}><span><FontAwesomeIcon icon='envelope'/></span> {data.tutor_email}</div>
          <div><span><FontAwesomeIcon icon='phone'/></span> {this.formatString(data.tutor_phone)}</div>
        </div>
        }

        <div className={css.right}>
          <div>
            <span><FontAwesomeIcon icon='user'/> </span>
            {data.tutee}
            <div style={{ display: 'inline' }}> - Class: {data.class_name}</div>
          </div>
          <div style={{ fontStyle: 'italic' }}><span><FontAwesomeIcon icon='envelope'/></span> {data.tutee_email}</div>
          <div><span><FontAwesomeIcon icon='phone'/></span> {this.formatString(data.tutee_phone)}</div>
        </div>
      </div>
    );

    let details = (
      <>
        <div style={{ fontWeight: 700 }}>Additional info</div>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>Head tutor email: {this.formatString(data.heademail)}</div>
          <div style={{ flex: 1 }}>Instructor: {data.professor_name}</div>
        </div>
        <div style={{ fontWeight: 700, marginTop: 5 }}>Meeting time</div>

        <div className={css.meetingsContainer}>
          {meetings}
          {meetings.length % 2 === 1 && <div className={css.meeting}/>}
        </div>

        <div className={css.deleteWrapper}>
          {!this.props.isAdmin &&
          <Button  text="Delete contract" reverse={true} color='red' className={css.utilButton}
                   onClick={() => this.props.onDeleteContract(data.contract_id)}/>}
          {!this.props.isAdmin &&
          <Button  text="Edit contract" color='red' className={css.utilButton}
                  onClick={this.onEditContract}/>}
        </div>
      </>
    );

    return (
      <Collapsible main={mainInfo} details={details} className={cssSession.container}/>
    );
  }
}

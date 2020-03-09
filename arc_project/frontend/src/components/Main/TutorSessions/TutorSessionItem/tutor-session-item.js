import React, { Component } from 'react';
import { render } from 'react-dom';
//import MyAPI from '../../../Api'


import css from './tutor-session-item.module.css';

export default class TutorSessionItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: {
        class_name: '',
        date: '',
        start: '',
        end: '',
        summary: ''
      },
    };
  }

  componentDidMount(){
  }

  render() {

    let data = {
                class_name: this.props.session.contract.class_name,
                //tutee: this.props.session.tutee.first_name + " " + this.props.session.tutee.last_name,
                date: this.props.session.date,
                start: this.props.session.start,
                end: this.props.session.end,
                summary: this.props.session.summary
                };
    return (
    <div>
      <div>Class: {data.class_name}</div>
      <div>Date: {data.date}</div>
      <div>Start Time: {data.start}</div>
      <div>End Time: {data.end}</div>
      <div>Summary: {data.summary}</div>
    </div>
    );
  }
}

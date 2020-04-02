import React, { Component } from 'react';
import { render } from 'react-dom';

import Collapsible from '../../../DefaultUI/Collapsible/collapsible';

import css from './tutor-session-item.module.css';

export default class TutorSessionItem extends Component {

  render() {
    let data = { class_name: this.props.session.contract.class_name,
                 tutee_name: this.props.session.contract.tutee.first_name + " " + this.props.session.contract.tutee.last_name,
                 tutee_email: this.props.session.contract.tutee.email,
                 date: this.props.session.date,
                 start: this.props.session.start,
                 end: this.props.session.end,
                 summary: this.props.session.summary};

    let mainInfo = (
      <>
        <div>Tutte Name: {data.tutee_name}</div>
        <div>Tutee Email: {data.tutee_email}</div>
        <div>Class: {data.class_name}</div>
        <div>Date: {data.date}</div>
        <div>Start Time: {data.start}</div>
        <div>End Time: {data.end}</div>
      </>
    );

    let details = (
      <>
        <div>Summary: {data.summary}</div>
      </>
    )
    return (
      <Collapsible main={mainInfo} details={details} className={css.container}/>
    );
  }
}

import React, { Component } from 'react';
import { render } from 'react-dom';

import MultiSelectInput from '../../../DefaultUI/MultiSelectInput/multi-select-input';
import Input from '../../../DefaultUI/DateInput/date-input';
import Textarea from '../../../DefaultUI/Textarea/textarea';
import Button from '../../../DefaultUI/Button/button';

import css from './tutor-contract-form.module.css';

export default class ContractMeeting extends Component {

  constructor(props) {
		super(props);
  }

  onTextChangeHandler = (event) => {
    this.props.onChange({ index: this.props.index, name: event.target.name, value: event.target.value});
  }

  onTimeChangeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    let dayOptions = (
      <>
        <option value = "Sunday">Sunday</option>
        <option value = "Monday">Monday</option>
        <option value = "Tuesday">Tuesday</option>
        <option value = "Wednesday">Wednesday</option>
        <option value = "Thursday">Thursday</option>
        <option value = "Friday">Friday</option>
        <option value = "Saturday">Saturday</option>
      </>
    )
    return (
      <div className={css.meetingContainer}>
        <div style={{ fontWeight: 700, marginBottom: 10 }}>
          Meeting {this.props.index+1}
          <Button text='Remove' reverse={true} color='red' className={css.removeButton} onClick={() => this.props.removeMeeting(this.props.index)}/>
        </div>
        <Input title='Location' type='text' name='location' value={this.props.data.location} onChange={this.onTextChangeHandler} placeholder={'Please be specific. e.g. Knapp 100'}/><br/>
        <MultiSelectInput title='Day of week' options={dayOptions} value={this.props.data.day} name='day' onChange={this.onTextChangeHandler}/><br/>
        <div className={css.timeSelect}>
          <Input title='Start time' type='time' name='start' value={this.props.data.start} onChange={this.onTextChangeHandler}/>
          <Input title='End time' type='time' name='end' value={this.props.data.end} onChange={this.onTextChangeHandler}/>
        </div>
      </div>
    );
  }
}

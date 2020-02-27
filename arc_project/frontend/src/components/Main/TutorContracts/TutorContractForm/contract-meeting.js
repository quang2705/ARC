import React, { Component } from 'react';
import { render } from 'react-dom';

import css from './tutor-contract-form.module.css';

export default class ContractMeeting extends Component {

  constructor(props) {
		super(props);
    this.state = {
      location: '',
      day: '',
      start: '',
      end: '',
    }
  }

  onTextChangeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  onTimeChangeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    this.run;
    return (
      <div className={css.container}>
        <form>

          <label>
            Location:<br/>
            <input type='text' name='location' onChange={this.onTextChangeHandler}/><br/>
          </label>
          <label>
            Day of Week:<br/>
            <select id = "days" name='day' onChange={this.onTextChangeHandler}>
             <option value = "Sunday">Sunday</option>
             <option value = "Monday">Monday</option>
             <option value = "Tuesday">Tuesday</option>
             <option value = "Wednesday">Wednesday</option>
             <option value = "Thursday">Thursday</option>
             <option value = "Friday">Friday</option>
             <option value = "Saturday">Saturday</option>
           </select><br/>
          </label>
          <label>
            Start Time:<br/>
            <input type='time' name='start' onChange={this.onTimeChangeHandler}/><br/>
          </label>
          <label>
            End Time:<br/>
            <input type='time' name='end' onChange={this.onTimeChangeHandler}/><br/>
          </label>

        </form>
      </div>
    );
  }
}

import React, { Component } from 'react';
import { render } from 'react-dom';

import css from './tutor-contract-form.module.css';

export default class TutorContractForm extends Component {

  constructor(props) {
		super(props);
    this.state = {
      tutorName: '',
      tutorEmail: '',
      tutorPhone: '',
      tutorDnumber: '',
      tuteeName: '',
      tuteeEmail: '',
      tuteePhone: '',
      tuteeDnumber: '',
      subject: '',
      class: '',
      instructor: '',
    }
  }
    onSubmitHandler = (event) => {
      event.preventDefault();
    }

    onTextChangeHandler = (event) => {
      this.setState({ [event.target.name]: event.target.value });
    }

    render() {
      this.run;
  		return (
  			<div className={css.container}>
  				<h1>Make a New Contract</h1>
          <form onSubmit={this.onSubmitHandler}>
            <label>
              Tutor Name:<br/>
              <input type='text' name='tutorName' onChange={this.onTextChangeHandler}/><br/>
            </label>
            <input type='submit' value="Submit"/>
          </form>
  			</div>
  		);
  	}
  }

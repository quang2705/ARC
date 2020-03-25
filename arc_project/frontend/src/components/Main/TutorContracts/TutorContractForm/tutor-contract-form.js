import React, { Component } from 'react';
import { render } from 'react-dom';
import MyAPI from '../../../Api';
import { AuthContext } from '../../../Auth/auth';

import ContractMeeting from './contract-meeting';

import css from './tutor-contract-form.module.css';

export default class TutorContractForm extends Component {
  static contextType = AuthContext;
  constructor(props) {
		super(props);
    this.state = {
      tutorFirstName: '',
      tutorLastName: '',
      tutorEmail: '',
      tutorPhone: '',
      tuteeFirstName: '',
      tuteeLastName: '',
      tuteeEmail: '',
      tuteePhone: '',
      tuteeDnumber: '',
      subject: '',
      class: '',
      instructor: '',
      meetings: [],
      tutorSig: false,
      tuteeSig: false,
    }

  }
    callback = (data)=>{console.log(data)}
    onSubmitHandler = (event) => {
      event.preventDefault();
      MyAPI.create_contract(this.state, this.callback, this.context.access_token);
    }

    onTextChangeHandler = (event) => {
      this.setState({ [event.target.name]: event.target.value });
    }
    onCheckBoxChangeHandler = (event) => {
      this.setState({ [event.target.name]: event.target.checked });
    }

    addMeeting = () => {
      let newMeetings = this.state.meetings;
      let newMeeting = { location: '',
                         day: '',
                         start: Date(),
                         end: Date(),};
      newMeetings.push(newMeeting);
      this.setState({ meetings: newMeetings });
    }

    onMeetingChangeHandler=(data)=> {
      event.preventDefault();
      this.state.meetings[data.index][data.name] = data.value;
    }

    render() {
      let meetings = this.state.meetings.map((meeting, index) => {
        return <ContractMeeting key={index} index={index} onChange={this.onMeetingChangeHandler}/>;
      });
  		return (
  			<div className={css.container}>
          <form onSubmit={this.onSubmitHandler}>

            <label>
              Tutor First Name:<br/>
              <input type='text' name='tutorFirstName' onChange={this.onTextChangeHandler}/><br/>
            </label>
            <label>
              Tutor Last Name:<br/>
              <input type='text' name='tutorLastName' onChange={this.onTextChangeHandler}/><br/>
            </label>
            <label>
              Tutor Email:<br/>
              <input type='email' name='tutorEmail' onChange={this.onTextChangeHandler}/><br/>
            </label>
            <label>
              Tutor Phone Number:<br/>
              <input type='phone' name='tutorPhone' onChange={this.onTextChangeHandler}/><br/>
            </label>

            <br/>

            <label>
              Tutee First Name:<br/>
              <input type='text' name='tuteeFirstName' onChange={this.onTextChangeHandler}/><br/>
            </label>
            <label>
              Tutee Last Name:<br/>
              <input type='text' name='tuteeLastName' onChange={this.onTextChangeHandler}/><br/>
            </label>
            <label>
              Tutee Email:<br/>
              <input type='email' name='tuteeEmail' onChange={this.onTextChangeHandler}/><br/>
            </label>
            <label>
              Tutee Phone Number:<br/>
              <input type='phone' name='tuteePhone' onChange={this.onTextChangeHandler}/><br/>
            </label>
            <label>
              Tutee D-Number:<br/>
              <input type='text' name='tuteeDnumber' onChange={this.onTextChangeHandler}/><br/>
            </label>
            <br/>
            <label>
              Subject:<br/>
              <select id = "subjects" name='subject' onChange={this.onTextChangeHandler}>
               <option value = "MATH">Math</option>
               <option value = "CS">Computer Science</option>
               <option value = "ENGL">English</option>
               <option value = "PHIL">Philosophy</option>
             </select><br/>
            </label>
            <label>
              Class:<br/>
              <input type='text' name = 'class' onChange={this.onTextChangeHandler}/><br/>
            </label>
            <label>
              Instructor:<br/>
              <input type='text' name = 'instructor' onChange={this.onTextChangeHandler}/><br/>
            </label>
            <br/>
            <h2>Add a meeting time</h2>
            {meetings}
            <input type='submit' value = "Add a meeting time" onClick={this.addMeeting}/>
            <br/>

            <label>
              Tutor Signature
              <input type='checkbox' name='tutorSig' onChange={this.onCheckBoxChangeHandler} style={{ margin: 0 }}/><br/>
            </label>

            <label>
              Tutee Signature
              <input type='checkbox' name='tuteeSig' onChange={this.onCheckBoxChangeHandler} style={{ margin: 0 }}/><br/>
            </label>

            <input type='submit' value="Submit" onClick={this.onSubmitHandler}/>
          </form>
  			</div>
  		);
  	}
  }

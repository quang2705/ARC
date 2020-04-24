import React, { Component } from 'react';
import { render } from 'react-dom';
import MyAPI from '../../../Api';
import { AuthContext } from '../../../Auth/auth';

import ContractMeeting from './contract-meeting';
import MultiSelectInput from '../../../DefaultUI/MultiSelectInput/multi-select-input';
import Input from '../../../DefaultUI/DateInput/date-input';
import Textarea from '../../../DefaultUI/Textarea/textarea';
import Button from '../../../DefaultUI/Button/button';

import css from './tutor-contract-form.module.css';

export default class TutorContractForm extends Component {
  static contextType = AuthContext;

  constructor(props) {
		super(props);
    this.state = {
      tutorFirstName: '',
      tutorLastName: '',
      tutorEmail: '',
      tutorPhone: this.props.data ? this.props.data.tutorPhone : '',
      tuteeFirstName: this.props.data ? this.props.data.tuteeFirstName : '',
      tuteeLastName: this.props.data ? this.props.data.tuteeLastName : '',
      tuteeEmail: this.props.data ? this.props.data.tuteeEmail : '',
      tuteePhone: this.props.data ? this.props.data.tuteePhone : '',
      tuteeDnumber: this.props.data ? this.props.data.tuteeDnumber : '',
      subjects: [],
      subject: this.props.data ? this.props.data.subject : 'Astronomy',
      class: this.props.data ? this.props.data.class : '',
      instructor: this.props.data ? this.props.data.instructor : '',
      meetings: this.props.data ? this.props.data.meetings : [],
      tutorSig: this.props.data ? true : false,
      tuteeSig: this.props.data ? true : false,
    }

  }

  componentDidMount() {
    MyAPI.get_subjects(null, this.props.auth.access_token)
    .then((subjects) => {
        this.setState({subjects: subjects});
    });

    this.setState({ tutorFirstName: this.context.user.firstName,
                    tutorLastName: this.context.user.lastName,
                    tutorEmail: this.context.email });
  }

  callback = (data) => {
    this.props.rerenderContract(data);
    this.props.close();
  }

  onSubmitHandler = (event) => {
    event.preventDefault();
    if (!this.props.data)
      MyAPI.create_contract(this.state, this.callback, this.props.auth.access_token);
    else
      this.props.close();
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
                       day: 'Sunday',
                       start: '',
                       end: '',};
    newMeetings.push(newMeeting);
    this.setState({ meetings: newMeetings });
  }

  onMeetingChangeHandler=(data)=> {
    event.preventDefault();
    this.setState(prevState => {
      prevState.meetings[data.index][data.name] = data.value;
      return { meetings: prevState.meetings };
    });
  }

  removeMeeting = (index) => {
    this.setState(prevState => {
      let meets = prevState.meetings;
      meets.splice(index, 1);
      return { meetings: meets };
    });
  }

  render() {
    let subjects_name = this.state.subjects.map((subject, index) => {
        return (
            <option key={index} value={subject.subject_name}>{subject.subject_name}</option>
        )
    });

    let meetings = this.state.meetings.map((meeting, index) => {
      return <ContractMeeting key={index} index={index} data={meeting}
                              onChange={this.onMeetingChangeHandler} removeMeeting={this.removeMeeting}/>;
    });

		return (
			<div className={css.container}>
        <form >
          <div className={css.sectionTitle}>Tutor</div>
          <Input title='First name' type='text' name='tutorFirstName' onChange={this.onTextChangeHandler} value={this.state.tutorFirstName} disabled={true}/><br/>
          <Input title='Last name' type='text' name='tutorLastName' onChange={this.onTextChangeHandler} value={this.state.tutorLastName} disabled={true}/><br/>
          <Input title='Email' type='email' name='tutorEmail' onChange={this.onTextChangeHandler} value={this.state.tutorEmail} disabled={true}/><br/>
          <Input title='Phone' type='phone' name='tutorPhone' onChange={this.onTextChangeHandler} value={this.state.tutorPhone}/><br/>

          <div className={css.sectionTitle}>Tutee</div>
          <Input title='First name' type='text' name='tuteeFirstName' onChange={this.onTextChangeHandler} value={this.state.tuteeFirstName}/><br/>
          <Input title='Last name' type='text' name='tuteeLastName' onChange={this.onTextChangeHandler} value={this.state.tuteeLastName}/><br/>
          <Input title='Email' type='email' name='tuteeEmail' onChange={this.onTextChangeHandler} value={this.state.tuteeEmail}/><br/>
          <Input title='Phone' type='phone' name='tuteePhone' onChange={this.onTextChangeHandler} value={this.state.tuteePhone}/><br/>
          <Input title='D-number' type='text' name='tuteeDnumber' onChange={this.onTextChangeHandler} value={this.state.tuteeDnumber} placeholder='e.g. D12345678'/><br/>

          <div className={css.sectionTitle}>Class</div>
          <MultiSelectInput title="Subject" options={subjects_name} name='subject' onChange={this.onTextChangeHandler} value={this.state.subject}/><br/>
          <Input title='Class' type='text' name = 'class' onChange={this.onTextChangeHandler} placeholder='e.g. MATH 123' value={this.state.class}/><br/>
          <Input title='Instructor' type='text' name = 'instructor' onChange={this.onTextChangeHandler} value={this.state.instructor}/><br/>

          <div className={css.sectionTitle} style={{ marginBottom: 5 }}>Meeting time</div>
          {meetings}
          <Button type='button' text='Add meeting' color='red' onClick={this.addMeeting} className={css.meetingButton}/>

          <div className={css.sectionTitle} style={{ marginBottom: 5 }}>Signature</div>
          <div className={css.policy}>
            By e-signing this contract, both the tutor and tutee agree to Denison's Academic Resource Center's policy and guidelines
            on tutoring at Denison University.
          </div>
          <div className={css.signContainer}>
            <div className={css.signWrapper}>
              <div>Tutor e-signature</div>
              <input type='checkbox' name='tutorSig' onChange={this.onCheckBoxChangeHandler} style={{ margin: '5px 0 0 0' }} checked={this.state.tutorSig}/><br/>
            </div>

            <div className={css.signWrapper}>
              <div>Tutee e-signature</div>
              <input type='checkbox' name='tuteeSig' onChange={this.onCheckBoxChangeHandler} style={{ margin: '5px 0 0 0' }} checked={this.state.tuteeSig}/><br/>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
            <Button type='submit' text={this.props.data ? 'Done' : 'Create'} color='red' onClick={this.onSubmitHandler}/>
          </div>
        </form>
			</div>
		);
	}
}

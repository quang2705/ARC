import React, { Component } from 'react';
import { render } from 'react-dom';
import MyAPI from '../../../Api';
import { AuthContext } from '../../../Auth/auth';

import ContractMeeting from './contract-meeting';
import MultiSelectInput from '../../../DefaultUI/MultiSelectInput/multi-select-input';
import Input from '../../../DefaultUI/DateInput/date-input';
import Textarea from '../../../DefaultUI/Textarea/textarea';
import Button from '../../../DefaultUI/Button/button';
import Popup from '../../../DefaultUI/Popup/popup';

import css from './tutor-contract-form.module.css';

export default class TutorContractForm extends Component {
  static contextType = AuthContext;

  constructor(props) {
		super(props);
    this.state = {
      contract_id: this.props.data ? this.props.data.contract_id : null,
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
      error: null,
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

  validateInputs = () => {
    let emptyfield = false;
    let emptyname = null;
    let textNames = ['Tutor phone', 'Tutee first name', 'Tutee last name', 'Tutee email', 'Tutee phone', 'Tutee D-number', 'Class name', 'Instructor\'s name'];
    let textFields = ['tutorPhone', 'tuteeFirstName', 'tuteeLastName', 'tuteeEmail', 'tuteePhone', 'tuteeDnumber', 'class', 'instructor'];
    textFields.forEach((item, index) => {
      if (typeof this.state[item] !== typeof '' || this.state[item] === '') {
        emptyfield = true;
        emptyname = textNames[index];
      }
    });

    let meetingText = { location: 'Location', start: 'Start date', end: 'End date' }
    this.state.meetings.forEach((item, index) => {
      Object.keys(item).forEach((key) => {
        if (item[key] === '') {
          emptyfield = true;
          emptyname = meetingText[key] + ' in Meeting ' + (index+1);
        }
      });
    });

    let signed = this.state.tutorSig && this.state.tuteeSig;

    let hasMeeting = this.state.meetings.length > 0;

    if (!emptyfield && signed && hasMeeting)
      return { isValid: true };
    else if (emptyfield)
      return { isValid: false, error: 'Missing input', msg: 'Please enter '+emptyname};
    else if (!signed)
      return { isValid: false, error: 'Missing e-signatures', msg: 'Both tutor and tutee are required to e-sign this contract by checking the checkboxes.' };
    else if (!hasMeeting)
      return { isValid: false, error: 'Missing meeting', msg: 'You must have at least 1 meeting time' };
  }

  onEditComplete = (data) => {
    this.props.refresh(this.props.data.contract_id);
    this.props.close();
  }

  onSubmitHandler = (event) => {
    event.preventDefault();
    let validation = this.validateInputs();
    if (validation.isValid) {
      if (!this.props.data)
        MyAPI.create_contract(this.state, this.callback, this.props.auth.access_token);
      else {
        // Editing contract
        let count = this.props.data.oldMeetings.length;
        if (count !== 0)
          this.props.data.oldMeetings.forEach((item, index) => {
            MyAPI.delete_contract_meeting(item.id, this.context.access_token)
            .then(response => response)
            .then(data => {
              --count;
              if (count === 0) {
                MyAPI.update_contract(this.state, this.onEditComplete, this.context.access_token);
              }
            })
          });
        else {
          MyAPI.update_contract(this.state, this.onEditComplete, this.context.access_token);
        }
      }
    }
    else {
      this.errorMsgSet(validation);
    }
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

  errorMsgClose = () => {
    this.setState({ error: null });
  }

  errorMsgSet = (error) => {
    this.setState({ error: error });
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

        {this.state.error &&
        <Popup isVisible={!this.state.error.isValid}
               toggle={this.errorMsgClose}
               title={this.state.error.error}
               message={this.state.error.msg}/>}
			</div>
		);
	}
}

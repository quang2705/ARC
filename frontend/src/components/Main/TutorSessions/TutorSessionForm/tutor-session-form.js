import React, { Component } from 'react';
import { render } from 'react-dom';

import { AuthContext } from '../../../Auth/auth';
import MyAPI from '../../../Api';
import MultiSelectInput from '../../../DefaultUI/MultiSelectInput/multi-select-input';
import DateInput from '../../../DefaultUI/DateInput/date-input';
import Textarea from '../../../DefaultUI/Textarea/textarea';
import Button from '../../../DefaultUI/Button/button';
import Popup from '../../../DefaultUI/Popup/popup';

import css from './tutor-session-form.module.css';

export default class TutorSessionForm extends Component {
  static contextType = AuthContext;
  constructor(props) {
		super(props);
    this.state = {
      contracts: [],
      contract_id:'',
      sessDate: '',
      sessStart: '',
      sessEnd: '',
      sessSummary:'',
      error: null,
    };
	}

  componentDidMount(){
		//get all the contract of this user, then put it
		//into this.state.data. Check MyAPI class for more
		//functionality
		MyAPI.get_contract(null, this.context.access_token)
		.then((data) => {
			//set this.state.data
			return this.setState(() => {
        if (data.length > 0)
          return ({contracts: data, contract_id: data[0].id});
        else
          return ({contracts: data});
			});
		});
  }

  validateInputs = () => {
    let emptyfield = false;
    let emptyname = null;
    let textFields = ['sessDate', 'sessStart', 'sessEnd', 'sessSummary'];
    let textNames = ['Date', 'Start time', 'End time', 'Summary'];
    textFields.forEach((item, index) => {
      if (typeof this.state[item] !== typeof '' || this.state[item] === '') {
        emptyfield = true;
        emptyname = textNames[index];
      }
    });

    if (!emptyfield)
      return { isValid: true };
    else if (emptyfield)
      return { isValid: false, error: 'Missing input', msg: 'Please enter '+emptyname};
  }

  onSubmitHandler = (event) => {
    event.preventDefault();
    let validation = this.validateInputs();
    if (validation.isValid && this.state.contracts.length > 0) {
      MyAPI.create_session(this.state, this.context.access_token)
      .then((data) => {
         this.props.rerenderSession(data);
      });
    }
    else {
      this.setState({ error: validation });
    }
  }

  onTextChangeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  errorMsgClose = () => {
    this.setState({ error: null });
  }

  render() {
    let options = this.state.contracts.map((item, index) => {
			return <option key= {index} value={item.id}> {item.tutee.first_name+' - '+ item.class_name} </option>
		});

    return (
      <form className={css.form}>
        <MultiSelectInput name='contract_id' onChange={this.onTextChangeHandler}
                          options={options} title='Tutee' classNameContainer={css.tuteeSelect}/>
        <br/>
        <DateInput title='Date' name='sessDate' value={this.state.sessDate} onChange={this.onTextChangeHandler}/><br/>
        <div className={css.timeSelect}>
          <DateInput type='time' title='Start time' name='sessStart' value={this.state.sessStart} onChange={this.onTextChangeHandler}/>
          <DateInput type='time' title='End time' name='sessEnd' value={this.state.sessEnd} onChange={this.onTextChangeHandler}/>
        </div>
        <br/>
        <Textarea name='sessSummary' className={css.summaryInput} title='Summary' value={this.state.sessSummary} onChange={this.onTextChangeHandler}/><br/>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type='submit' text='Add' color='red' value='Submit' onClick={this.onSubmitHandler}/>
        </div>

        {this.state.error &&
        <Popup isVisible={!this.state.error.isValid}
               toggle={this.errorMsgClose}
               title={this.state.error.error}
               message={this.state.error.msg}/>}
      </form>
    );
  }
}

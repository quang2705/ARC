import React, { Component } from 'react';
import { render } from 'react-dom';
import css from './tutor-session-form.module.css';
import MyAPI from '../../../Api'

export default class TutorSessionForm extends Component {
  constructor(props) {
		super(props);
    this.state = {
      contracts: [],
      contract_id:'',
      sessDate: '',
      sessStart: '',
      sessEnd: '',
      sessSummary:''
    };
	}

  componentDidMount(){
		//get all the contract of this user, then put it
		//into this.state.data. Check MyAPI class for more
		//functionality
		MyAPI.get_contract()
    .then((response) => {
			//TODO: check for error response here - checked below
			return response.json();
		})
    .catch(err => err)
		.then((data) => {
			//set this.state.data
			return this.setState(() => {
        if (data.results.length > 0)
          return ({contracts: data.results, contract_id: data.results[0].id});
        else
          return ({contracts: data.results});
			});
		});
  }

  onSubmitHandler = (event) => {
   event.preventDefault();
   MyAPI.create_session(this.state)
   .then((response) => {
     return response.json();
   }).then((data) => {
   });
  }

  onTextChangeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    let options = this.state.contracts.map((item, index) => {
			return <option key= {index} value={item.id}> {item.tutee.first_name+' - '+ item.class_name} </option>
		});
    return (
      <form onSubmit={this.onSubmitHandler}>
        <label>
          Tutee: <br/>
          <select name='contract_id' onChange={this.onTextChangeHandler}>
            {options}
          </select>
        </label><br/>
        <label>
          Date: <br/>
          <input type='date' name='sessDate' value={this.state.sessDate} onChange={this.onTextChangeHandler}/><br/>
        </label>
        <label>
          Start time: <br/>
          <input type='time' name='sessStart' value={this.state.sessStart} onChange={this.onTextChangeHandler}/><br/>
        </label>
        <label>
          End time: <br/>
          <input type='time' name='sessEnd' value={this.state.sessEnd} onChange={this.onTextChangeHandler}/><br/>
        </label>
        <label>
          Summary: <br/>
          <input type='textarea' name='sessSummary' value={this.state.sessSummary} onChange={this.onTextChangeHandler}/><br/>
        </label>
        <input type='submit' value='Submit'/>
      </form>
    );
  }
}

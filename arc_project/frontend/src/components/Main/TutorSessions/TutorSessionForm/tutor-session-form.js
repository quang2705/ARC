import React, { Component } from 'react';
import { render } from 'react-dom';

import css from './tutor-session-form.module.css';

export default class TutorSessionForm extends Component {
  constructor(props) {
		super(props);
        this.state = {
          contract: '',
          sessDate: '',
          sessStart: '',
          sessEnd: '',
          sessSummary:''
        };
	}

  onSubmitHandler = (event) => {
   event.preventDefault();
  }

  onTextChangeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    let data = {contracts: [{tutee: 'abc', class: 'cs', }, {tutee: 'ef', class: 'jap', }]};
    let options = data.contracts.map((item, index) => {
      return <option value={item.tutee+' - '+item.class} key={index}> {item.tutee+' - '+item.class} </option>
    });
    console.log(this.state.contract)
    console.log(this.state.sessDate)
    console.log(this.state.sessStart)
    console.log(this.state.sessEnd)
    console.log(this.state.sessSummary)

    return (
      <form>
        <label>
          Tutee: <br/>
          <select name='contract' value={this.state.contract} onChange={this.onTextChangeHandler}>
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

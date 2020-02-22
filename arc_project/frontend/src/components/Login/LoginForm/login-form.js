import React, { Component } from 'react';

import css from './login-form.module.css';

export default class Login extends Component {
	constructor(props) {
		super(props);
    this.state = {
      username: '',
      password: '',
      remember: false,
    }
	}

  onSubmitHandler = (event) => {
    event.preventDefault();
  }

  onTextChangeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onRememberPasswordChangeHandler = (event) => {
    this.setState({ remember: event.target.checked });
  }

	render() {
    this.run();
		return (
			<div className={css.container}>
				<form onSubmit={this.onSubmitHandler}>
          <label>
            Username:<br/>
            <input type='text' name='username' onChange={this.onTextChangeHandler}/><br/>
          </label>

          <label>
            Password:<br/>
            <input type='password' name='password' onChange={this.onTextChangeHandler}/><br/>
          </label>

          <label style={{ display: "flex", justifyContent: "flex-end"}}>
            Remember me
            <input type='checkbox' name='remember' onChange={this.onRememberPasswordChangeHandler} style={{ margin: 0 }}/><br/>
          </label>

          <input type='submit' value="Submit"/>
        </form>
			</div>
		);
	}
}

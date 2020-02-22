import React, { Component } from 'react';

import LoginForm from './LoginForm/login-form';

import css from './login.module.css';

export default class Login extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={css.container}>
				<div>
					<h1 className={css.header}>Welcome</h1>
					<LoginForm/>
				</div>
			</div>
		);
	}
}

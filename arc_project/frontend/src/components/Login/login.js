// This comment tricks Eslint into recognizing gapi as a global variable
/* global gapi */

import React, { Component } from 'react';
import { render } from 'react-dom';

import Auth from '../Auth/auth';

import css from './login.module.css';

export default class Login extends Component {

  componentDidMount() {
    gapi.signin2.render('my-signin2', {
      scope: Auth.scope,
      onsuccess: this.props.onLoginSuccess,
    });
  }

  render() {
    return (
      <div className={css.container}>
        <div className={css.panel}>
          <div className={css.title}>Login to Denison ARC tutoring</div>
          <div className={css.subtitle}>Please use your Denison email</div>
          <div id='my-signin2' className={css.signinButton}/>
        </div>

      </div>
    );
  }
}

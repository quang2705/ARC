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
          <div>
            <div className={css.title}>Login</div>
            <div className={css.subtitle}>Denison ARC Tutoring</div>
            <div id='my-signin2' className={css.signinButton}/>
            <div className={css.helpText}>Please use your Denison email</div>
            <div className={css.warning}>
              By signing in, you agree to give us permission to use your email address to send emails to your tutees, headtutors, and ARC administrators.
              We will only send emails regarding your tutoring contracts, sessions and session verification and will not disclose your personal information.
            </div>
          </div>

          <div className={css.bottom}>
            <a href='https://my.denison.edu' rel="noopener noreferrer" target="_blank">MyDenison</a>
            <a href='https://wiki.denison.edu/Tutoring/TutorRequest' rel="noopener noreferrer" target="_blank">Request a tutor</a>
          </div>
        </div>

      </div>
    );
  }
}

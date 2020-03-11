import React, { Component } from 'react';
import { render } from 'react-dom';


import Auth from '../Auth/auth';

import css from './login.module.css';

export default class Login extends Component {

  componentDidMount() {
    // TODO: Remove setTimeout by rendering Login only after App has mounted
    setTimeout(() => {
      gapi.signin2.render('my-signin2', {
        scope: Auth.scope,
        onsuccess: this.props.onLoginSuccess,
      });
    }, 1000);
  }

  render() {
    return (
      <div>
        <div id='my-signin2'/>

      </div>
    );
  }
}

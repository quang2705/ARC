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
      <div>
        <div id='my-signin2'/>

      </div>
    );
  }
}

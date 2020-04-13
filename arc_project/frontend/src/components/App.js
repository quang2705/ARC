import React, { Component } from 'react';
import { render } from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import Cookies from 'js-cookie';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Login from './Login/login';
import TutorSessionForm from './Main/TutorSessions/TutorSessionForm/tutor-session-form.js'
import Modal from './DefaultUI/Modal/modal';
import Collapsible from './DefaultUI/Collapsible/collapsible';
import Main from './Main/main';
import Auth, { AuthContext } from './Auth/auth';
import TutorContracts from './Main/TutorContracts/tutor-contracts';
import TutorContractForm from './Main/TutorContracts/TutorContractForm/tutor-contract-form';
import AdminSummary from './Main/AdminSummary/admin-summary';
import MyAPI from './Api';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoaded: false,
                   auth: {}, };
  }

  componentDidMount() {
    // Override the default margin of 8px
    document.body.style.margin = '0';

    // Dynamically add meta with Google App's Client ID to HTML
    let meta = document.createElement('meta');
    meta.name = 'google-signin-client_id';
    meta.content = Auth.googleClientId;
    document.body.appendChild(meta);
  }

  onLoginSuccess = (res) => {
      console.log(res)
    gapi.load('client:auth2',() => {
      const auth2 = gapi.auth2.init();
      if (auth2.isSignedIn.get()) {
        let email = auth2.currentUser.get().getBasicProfile().getEmail();
        let access_token = gapi.client.getToken().access_token;
        let auth = { access_token: access_token,
                     email: email };
        // this.setState({ auth: { ...auth,
        //                         isAuthenticated: true} });
        console.log("access_token ", access_token)
        MyAPI.get_db_access_token({ token: auth.access_token,
                                    client_id: Auth.dbClientId,
                                    grant_type: 'convert_token',
                                    backend: 'google-oauth2' })
             .then((res) => {
                 return res.json();
             })
             .then((data) => {
                 console.log("db data", data);
                 auth = { ...auth, access_token: data.access_token };

                 MyAPI.get_user(null, auth.access_token)
                 .then((res) => {
                    return res.json()
                 })
                 .then((data) => {
                    console.log(data);
                    this.setState({  auth: { ...auth },
                                     isAuthenticated: true });
                 });
             });
        console.log('logged in');
      }
    });


  }

  render() {
    const mainComponent = (
      <AuthContext.Provider value={this.state.auth}>
        <Main/>
      </AuthContext.Provider>
    );

    return (
      <>
        {this.state.isAuthenticated ?
         mainComponent :
         <Login onLoginSuccess={this.onLoginSuccess} />}
      </>
    );
  }
}

export default App;

// Add FontAwesome icons into FontAwesome's library for ease of use
import { faTimes, faSortDown, faChevronDown,
         faPlus } from '@fortawesome/free-solid-svg-icons'
library.add(
  faTimes,
  faSortDown,
  faChevronDown,
  faPlus
);

const container = document.getElementById("app");
render(<App />, container);

import React, { Component } from 'react';
import { render } from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import Cookies from 'js-cookie';

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
    document.body.style.fontFamily = '\'Arial\', sans-serif';
    document.body.style.fontSize = '15px';

    // Dynamically add meta with Google App's Client ID to HTML
    this.addTag('meta', { name: 'google-signin-client_id',
                          content: Auth.googleClientId });

    this.setState({ loaded: true });
    console.log(Auth.dbClientId)
  }

  addTag = (tag, meta) => {
    let e = document.createElement(tag);
    for (let [key, value] of Object.entries(meta)) {
      e[key] = value;
    };

    document.body.appendChild(e);
  }

  onLoginSuccess = (res) => {
    gapi.load('client:auth2', () => {
      const auth2 = gapi.auth2.init();
      if (auth2.isSignedIn.get()) {
        let email = auth2.currentUser.get().getBasicProfile().getEmail();
        let auth = { access_token: gapi.client.getToken().access_token,
                     email: email };

        // Get access token for Django backend server
        MyAPI.get_db_access_token({ token: auth.access_token,
                                    client_id: Auth.dbClientId,
                                    grant_type: 'convert_token',
                                    backend: 'google-oauth2' })
        .then((res) => {
           return res.json();
        })
        .then((data) => {
          // Successfully retrieved access token for Django server
          auth = { ...auth, access_token: data.access_token };
          console.log("db data ", data);
          MyAPI.get_current_user(auth.access_token)
          .then((data) => {
            this.setState({ auth: { ...auth, isAdmin: data.userprofiles.is_admin },
                            isAuthenticated: true });
          });
        });
        // Load Gmail API
        gapi.client.load('gmail', 'v1', () => {
          this.setState({ emailApiLoaded: true });
        });
      }
    });
  }

  render() {
    const mainComponent = (
      <AuthContext.Provider value={this.state.auth}>
        <Main auth={this.state.auth}/>
      </AuthContext.Provider>
    );

    if (this.state.loaded)
      return (
        <>
          {this.state.isAuthenticated && this.state.emailApiLoaded?
           mainComponent :
           <Login onLoginSuccess={this.onLoginSuccess} />}
        </>
      );
    else
      return <></>;
  }
}

export default App;

// Add FontAwesome icons into FontAwesome's library for ease of use
import { faTimes, faSortDown, faChevronDown,
         faPlus, faUser, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
library.add(
  faTimes,
  faSortDown,
  faChevronDown,
  faPlus,
  faUser,
  faEnvelope,
  faPhone
);

const container = document.getElementById("app");
render(<App />, container);

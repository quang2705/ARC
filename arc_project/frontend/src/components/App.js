import React, { Component } from "react";
import { render } from "react-dom";

import Login from './Login/login';
import TutorContractItem from './Main/TutorContracts/TutorContractItem/tutor-contract-item.js';
import TutorSessionItem from './Main/TutorSessions/TutorSessionItem/tutor-session-item.js';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading"
    };
  }

  componentDidMount() {
    fetch("api/userprofiles")
      .then(response => {
        if (response.status > 400) {
          return this.setState(() => {
            return { placeholder: "Something went wrong!" };
          });
        }
        return response.json();
      })
      .then(data => {
        this.setState(() => {
          return {
            data,
            loaded: true
          };
        });
      });
  }

  render() {
    return (
      // <ul>
      //   {this.state.data.map(contact => {
      //     return (
      //       <li key={contact.id}>
      //         {contact.first_name} - {contact.last_name} - {contact.email}
      //       </li>
      //     );
      //   })}
      // </ul>
      <div>
        <Login/>
        <TutorContractItem/>
        <TutorSessionItem/>

      </div>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);

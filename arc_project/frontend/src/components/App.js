import React, { Component } from 'react';
import { render } from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';

import Login from './Login/login';
import Modal from './DefaultUI/Modal/modal';
import Collapsible from './DefaultUI/Collapsible/collapsible';
import Main from './Main/main';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false, };
  }

  componentDidMount() {
    // Override the default margin of 8px
    document.body.style.margin = '0';
  }

  toggleModal = () => {
    this.setState((prevState) => {
      return {...prevState, showModal: !prevState.showModal };
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
      <>
      <Modal isVisible={this.state.showModal} toggle={this.toggleModal}
             title={'Create new contract'}>
        <div>
          sfgsdfgdsfgergefagafd
          adsfasdfasdfsadfasdfafasfdsfadf
        </div>
      </Modal>
      <Collapsible main={'lololol'} details={'oh noadfadsfadsfadfasdfsadfasdfadsfadsfadsfadsf\
      dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd\
      dddddddddddddddddddddddddddddddddddddddddddddddddddddddddd\
      aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\
      aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'} style={{ width: '500px' }}/>
      <button onClick={this.toggleModal}>Click</button>
      // <Main/>
      </>
    );
  }
}

export default App;

// Add FontAwesome icons into FontAwesome's library for ease of use
import { faTimes, faSortDown, faChevronDown } from '@fortawesome/free-solid-svg-icons'
library.add(
  faTimes,
  faSortDown,
  faChevronDown
);

const container = document.getElementById("app");
render(<App />, container);

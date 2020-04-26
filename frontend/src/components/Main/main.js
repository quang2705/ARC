import React, { Component } from 'react';
import { render } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from '../Auth/auth';

import ContentContainer from '../DefaultUI/ContentContainer/content-container';
import TutorContracts from './TutorContracts/tutor-contracts';
import TutorSessions from './TutorSessions/tutor-sessions';
import AdminSummary from './AdminSummary/admin-summary';
import AdminTutors from './AdminTutors/admin-tutors';

import css from './main.module.css';

export default class Main extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);

    let roles = this.props.auth.roles;
    this.tabs = [];

    if (roles.tutor)
      this.tabs = this.tabs.concat(['My sessions', 'My contracts']);
    if (roles.headtutor)
      this.tabs = this.tabs.concat(['Contracts']);
    if (roles.admin)
      this.tabs = this.tabs.concat(['Summary', 'Tutors']);

    this.state = { currentTab: this.tabs[0],
                   username: null,
                   showMenu: false, };
  }

  componentDidMount() {
    let email = this.context.email;
    let re = /(.+)@/;
    this.setState({ username: re.exec(email)[1] });
  }

  onTabChange = (index) => {
    this.setState({ currentTab: index });
  }

  toggleMenu = () => {
    this.setState(prevState => {
      return { showMenu: !prevState.showMenu };
    });
  }

  render() {
    return (
      <div className={css.container}>
        <div className={css.jumbotron}>
          {this.state.showMenu &&
          <div className={css.inviBackground} onClick={this.toggleMenu}/>}
          <div className={css.menu} style={{ backgroundColor: this.state.showMenu ? 'white' : 'inherit' }}>
            <div onClick={this.toggleMenu} style={{ color: this.state.showMenu ? 'inherit' : 'white' }}>
              <span><FontAwesomeIcon icon='user'/></span> {this.state.username} <span><FontAwesomeIcon icon='chevron-down'/></span>
            </div>
            {this.state.showMenu &&
            <>
              <div onClick={this.context.logout}>Logout</div>
            </>}
          </div>
        </div>
        <div className={css.contentWrapper}>
          <ContentContainer tabs={this.tabs} onTabChangeCallback={this.onTabChange}
                            className={css.contentContainer} classNameContent={css.content}>
            {this.state.currentTab === 'My sessions' && <TutorSessions/>}
            {this.state.currentTab === 'My contracts' && <TutorContracts position="tutor"/>}
            {this.state.currentTab === 'Contracts' && <TutorContracts position="headtutor"/>}
            {this.state.currentTab === 'Summary' && <AdminSummary/>}
            {this.state.currentTab === 'Tutors' && <AdminTutors/>}

          </ContentContainer>
        </div>
      </div>
    );
  }
}

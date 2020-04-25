import React, { Component } from 'react';
import { render } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ContentContainer from '../DefaultUI/ContentContainer/content-container';
import TutorContracts from './TutorContracts/tutor-contracts';
import TutorSessions from './TutorSessions/tutor-sessions';
import AdminSummary from './AdminSummary/admin-summary';
import AdminTutors from './AdminTutors/admin-tutors';

import css from './main.module.css';

export default class Main extends Component {
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

    this.state = { currentTab: this.tabs[0] };
  }

  onTabChange = (index) => {
    this.setState({ currentTab: index });
  }

  render() {
    return (
      <div className={css.container}>
        <div style={{ width: '100%', height: '200px', backgroundColor: '#c8032b' }}/>
        <div className={css.contentWrapper}>
          <ContentContainer tabs={this.tabs} onTabChangeCallback={this.onTabChange}
                            className={css.contentContainer} classNameContent={css.content}>
            {this.state.currentTab === 'My sessions' && <TutorSessions/>}
            {this.state.currentTab === 'My contracts' && <TutorContracts/>}
            {this.state.currentTab === 'Contracts' && <TutorContracts position="headtutor"/>}
            {this.state.currentTab === 'Summary' && <AdminSummary/>}
            {this.state.currentTab === 'Tutors' && <AdminTutors/>}

          </ContentContainer>
        </div>
      </div>
    );
  }
}

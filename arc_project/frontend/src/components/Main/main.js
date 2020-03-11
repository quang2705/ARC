import React, { Component } from 'react';
import { render } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ContentContainer from '../DefaultUI/ContentContainer/content-container';
import TutorContracts from './TutorContracts/tutor-contracts';
import TutorSessions from './TutorSessions/tutor-sessions';
import AdminSummary from './AdminSummary/admin-summary';

import css from './main.module.css';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { currentTab: 0 };

    this.tabs = ['Session', 'Contracts', 'Summary'];

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
            {this.state.currentTab === 0 && <TutorSessions/>}
            {this.state.currentTab === 1 && <TutorContracts/>}
            {this.state.currentTab === 2 && <AdminSummary/>}

          </ContentContainer>
        </div>
      </div>
    );
  }
}

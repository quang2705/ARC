import React, { Component } from 'react';
import { render } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ContentContainer from '../DefaultUI/ContentContainer/content-container';

import css from './main.module.css';

export default class Main extends Component {

  render() {
    return (
      <div className={css.container}>
        <div style={{ width: '100%', height: '200px', backgroundColor: '#c8032b' }}/>
        <ContentContainer tabs={['Sessions', 'Contracts']}>
          <div>
              Trolol item
          </div>
        </ContentContainer>
      </div>
    );
  }
}

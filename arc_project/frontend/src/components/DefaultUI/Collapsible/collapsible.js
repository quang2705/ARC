import React, { Component } from 'react';
import { render } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AnimateHeight from 'react-animate-height';

import css from './collapsible.module.css';

/*
This class implements the Collapsible component.
@parameters
  main: HTML elements of the main content which is always visible.
  details: HTML elements of details which will show if the collapsible is expanded,
  hidden otherwise.
@class
  className: the whole container
@style
  style: the whole container
*/
export default class Collapsible extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  toggleDetails = () => {
    this.setState((prevState) => {
      return ({ show: !prevState.show });
    });
  };

  render() {
    return (
      <div className={css.container+' '+this.props.className} style={{ ...this.props.style }}>
        <div className={css.mainContentWrapper}>
          <div className={css.togglerDiv} onClick={this.toggleDetails}/>
          <div className={css.mainContent}>
            {this.props.main}
          </div>
          {this.props.details && !this.props.hideIcon &&
          <div className={css.expandIcon}>
            <div style={{ transform: this.state.show ? 'rotate(-180deg)' : 'rotate(0deg)' }}>
              <FontAwesomeIcon icon='chevron-down'/>
            </div>
          </div>
          }
        </div>

        {this.props.details &&
        <AnimateHeight duration={300} height={this.state.show ? 'auto' : 0} className={css.detailsWrapper}>
          <div className={css.details}>
            {this.props.details}
          </div>
        </AnimateHeight>
        }
      </div>
    );
  }
}

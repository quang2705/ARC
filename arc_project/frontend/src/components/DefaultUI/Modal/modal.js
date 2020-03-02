import React, { Component } from 'react';
import { render } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import css from './modal.module.css';

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = { screenTop: 0 };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scrollHandler)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHandler);
  }

  scrollHandler = () => {
    this.setState({ screenTop: document.documentElement.scrollTop });
  }

  render() {
    return (
      <div className={css.wrapper} style={{ visibility: this.props.isVisible ? 'visible': 'hidden', }}
           onScroll={this.scrollHandler}>
        <div className={css.screen} onClick={this.props.toggle} style={{ top: this.state.screenTop }}/>
        <div className={css.container+' '+this.props.className} style={{ opacity: this.props.isVisible ? 1 : 0,
                                                                         top: this.props.isVisible ? '0px' : '300px' }}>

          <div className={css.header+' '+this.props.classNameTitle}>
            <div className={css.title}>
              <h2>{this.props.title}</h2>
            </div>
            <div className={css.closeIcon} onClick={this.props.toggle}>
              <FontAwesomeIcon icon='times'/>
            </div>
          </div>

          <div className={css.content+' '+this.props.classNameContent}>
            {this.props.children}
          </div>

          <div className={css.footer+' '+this.props.classNameFooter}>

          </div>
        </div>
      </div>
    );
  }
}

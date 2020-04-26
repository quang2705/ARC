import React, { Component } from 'react';

import Button from '../Button/button';

import css from './popup.module.css';

export default class Popup extends Component {

  render() {
    return (
      <div className={css.container} style={{ visibility: this.props.isVisible ? 'visible': 'hidden' }}>
        <div className={css.main}>
          <div className={css.title}>{this.props.title}</div>
          <div className={css.message}>{this.props.message}</div>
          <div className={css.options}>
            {!this.props.yes ?
            <Button text='OK' onClick={this.props.toggle} className={css.ok}/> :
            <>
              <Button text='Yes' color='red' reverse={true} onClick={this.props.yes} className={css.yesno}/>
              <Button text='No' color='red' onClick={this.props.no} className={css.yesno}/>
            </>}
          </div>
        </div>
      </div>
    )
  }
}

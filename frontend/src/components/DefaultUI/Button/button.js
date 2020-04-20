import React, { Component } from 'react';
import { render } from 'react-dom';

import css from './button.module.css';

/*
  This component adds styles to `button`.
  @params
  onClick: onClick event handler.
  reverse: boolean. `true` will result in a colored background with white text.
           `false` results in white background, colored border and colored text.
  text: button inner text.
  @class
  className: class of the button.
*/
export default class Button extends Component {

  render() {
    const colors = { blue: '#3697ff',
                     red: 'rgb(200, 3, 43)',
                     gray: '#e0e0e0',
                     green: '#93db3b', };

    let fontColor = this.props.color && this.props.color !== 'gray' ? 'white' : 'black';
    let buttonColor = this.props.color ? colors[this.props.color] : colors.gray;
    let style = { backgroundColor: buttonColor,
                  color: fontColor }
    let reversedStyle = { backgroundColor: 'white',
                          color: colors[this.props.color],
                          border: 'solid 1px '+buttonColor };

    return (
      <button className={[css.button, this.props.className].join(' ')}
              style={this.props.reverse ? reversedStyle : style}
              onClick={this.props.onClick}
              type={this.props.type ? this.props.type : 'button'}>
        {this.props.text}
      </button>
    );
  }
}

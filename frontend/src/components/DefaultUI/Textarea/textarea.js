import React, { Component } from 'react';
import { render } from 'react-dom';

import css from './textarea.module.css';

/*
  This components adds style to the default `textarea`.
  @params
  type: `date` or `time`. Default is `date`. Optional.
  name: input name.
  onChange: onChange event handler.
  value: value of the input. Optional.
  title: label to go with the input.
  @class
  className: class of the `input` HTML tag.
*/
export default class Textarea extends Component {
  constructor(props) {
    super(props);
    this.state = { isFocus: false };
  }

  render() {
    let color = this.props.color ? this.props.color : 'white';
    let value = this.props.value !== undefined ? { value: this.props.value } : {};

    return (
      <div className={css.container} style={{ borderColor: this.state.isFocus ? '#3697ff' : '#eaeaea' }}>
        <div className={css.title} style={{ backgroundColor: color }}>{this.props.title}</div>
        <textarea type={this.props.type ? this.props.type : 'date'} className={[css.input, this.props.className].join(' ')}
                  style={{ backgroundColor: color }}
                  name={this.props.name}
                  onChange={this.props.onChange}
                  {...value}
                  onFocus={() => this.setState({ isFocus: true })}
                  onBlur={() => this.setState({ isFocus: false })}/>
      </div>
    );
  }
}

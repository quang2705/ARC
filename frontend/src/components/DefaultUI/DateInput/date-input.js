import React, { Component } from 'react';
import { render } from 'react-dom';

import css from './date-input.module.css';

/*
  This components adds style to the default input of type `date`, `time`, and `text` and text-related.
  A better name for the component should be `Input`, but initially it was for input of type `date` only.
  And now changing the file name would lead to compatibility problems.
  @params
  type: `date` or `time`. Default is `date`. Optional.
  name: input name.
  onChange: onChange event handler.
  value: value of the input. Optional.
  title: label to go with the input.
  @class
  className: class of the `input` HTML tag.
*/
export default class DateInput extends Component {
  constructor(props) {
    super(props);
    this.state = { isFocus: false };
  }

  render() {
    let color = this.props.color ? this.props.color : 'white';

    return (
      <div className={css.container} style={{ borderColor: this.state.isFocus ? '#3697ff' : '#eaeaea' }}>
        <div className={css.title} style={{ backgroundColor: color }}>{this.props.title}</div>
        <input type={this.props.type ? this.props.type : 'date'} className={[css.dateInput, this.props.className].join(' ')}
               style={{ backgroundColor: color }}
               name={this.props.name}
               onChange={this.props.onChange}
               placeholder={this.props.placeholder}
               disabled={this.props.disabled}
               value={this.props.value}
               onFocus={() => this.setState({ isFocus: true })}
               onBlur={() => this.setState({ isFocus: false })}/>
      </div>
    );
  }
}

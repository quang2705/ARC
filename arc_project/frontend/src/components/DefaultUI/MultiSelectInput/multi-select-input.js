import React, { Component } from 'react';
import { render } from 'react-dom';

import css from './multi-select-input.module.css';

/*
  This components adds style to the default `select`.
  @params
  name: input name.
  onChange: onChange event handler.
  value: value of the input. Optional.
  color: color of the background. Optional.
  title: label to go with the input.
  @class
  classNameContainer: class of the whole container.
  className: class of the `select` HTML tag.
*/
export default class MultiSelectInput extends Component {
  constructor(props) {
    super(props);
    this.state = { isFocus: false };
  }

  render() {
    const colors = { blue: '#3697ff',
                     red: 'rgb(200, 3, 43)',
                     gray: '#e0e0e0',
                     green: '#93db3b', };
    let color = this.props.color ? this.props.color : 'white';
    let value = this.props.value !== undefined ? { value: this.props.value } : {};

    return (
      <div className={[css.container, this.props.classNameContainer].join(' ')} style={{ borderColor: this.state.isFocus ? colors.blue : '#eaeaea' }}>
        <div className={css.title} style={{ backgroundColor: color }}>{this.props.title}</div>
        <select type='date' className={[css.input, this.props.className].join(' ')}
                style={{ backgroundColor: color }}
                name={this.props.name}
                {...value}
                onChange={this.props.onChange}
                onFocus={() => this.setState({ isFocus: true })}
                onBlur={() => this.setState({ isFocus: false })}>
          {this.props.options}
        </select>
      </div>
    );
  }
}

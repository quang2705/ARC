import React, { Component } from 'react';
import { render } from 'react-dom';

import css from './admin-summary-item.module.css';

export default class AdminSummaryItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: {
                tutor_first_name: this.props.tutor.first_name,
                tutor_last_name: this.props.tutor.last_name,
                tutor_phone: this.props.tutor.phone,
                tutor_email: this.props.tutor.email,
                
            }
        };
    }
  render() {
      var index = this.props.index;
      var tutor_first_name = this.state.data.tutor_first_name;
      var tutor_last_name = this.state.data.tutor_last_name;
      var tutor_email = this.state.data.tutor_email;
      var tutor_phone = this.state.data.tutor_phone;
    return (
        <tr key={index}>
           <td>{tutor_first_name}</td>
           <td>{tutor_last_name}</td>
           <td>{tutor_email}</td>
           <td>{tutor_phone}</td>
       </tr>
    );
  }
}

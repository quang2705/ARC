import React, { Component } from 'react';
import { render, createPortal } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from '../../../Auth/auth'

import Modal from '../../../DefaultUI/Modal/modal';
import MyAPI from '../../../Api';
import Collapsible from '../../../DefaultUI/Collapsible/collapsible';

import css from './admin-tutors-item.module.css';

//Component should be passed key, which is index of this user,
//and the tutor profile from the API
export default class AdminTutorsItem extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = { contracts: [],
                   sessions: [] };

  }

  componentDidMount() {
		// Get all the contracts of this user, then put it
		// into this.state.data. Check MyAPI class for more
		// functionality
		MyAPI.get_user_contract(this.props.tutor.id, this.context.access_token)
		.then((response) => {
			return response.json();
		})
    .then(data => {
      this.setState({ contracts: data });
    });

    MyAPI.get_user_session(this.props.tutor.id, this.context.access_token)
		.then((response) => {
			this.setState({
				sessions: response,
			});
		});
  }

  render() {
    var tutor_first_name = this.props.tutor.first_name;
    var tutor_last_name = this.props.tutor.last_name;
    var tutor_email = this.props.tutor.email;
    var tutor_phone = this.props.tutor.phone;

    var tags = this.state.contracts.map((contract, index) => {
      return contract.subject.subject_name;
    })
    var tags_set = new Set(tags);
    tags = [];

    tags_set.forEach(tag => {
      tags.push(tag);
    });

    tags = tags.map((tag, index) => {
      return <div key={index} className={css.tag}>{tag}</div>;
    });



    return (
      <div className={css.container} onClick={() => this.props.showDetails(this.props.index, { contracts: this.state.contracts, sessions: this.state.sessions })}>
        <div className={css.wrapper}>
          <div className={css.name} title={tutor_first_name+' '+tutor_last_name}>
            {tutor_first_name+' '+tutor_last_name}
          </div>
          <div className={css.phone}>{tutor_phone}</div>
          <div className={css.email} title={tutor_email}>{tutor_email}</div>
          <div className={css.info}>
            <div>Total contracts: {this.state.contracts.length}</div>
          </div>
          <div className={css.tagsContainer}>
            {tags}
        </div>
        </div>
      </div>
    );
  }
}

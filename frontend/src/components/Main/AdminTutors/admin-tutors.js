import React, { Component } from 'react';
import { render } from 'react-dom';

import MyAPI from '../../Api';
import AdminTutorsItem from './AdminTutorsItem/admin-tutors-item';
import AdminTutorsDetails from './admin-tutors-details';
import { AuthContext } from '../../Auth/auth';

import css from './admin-tutors.module.css';


export default class AdminTutors extends Component {
  static contextType = AuthContext;
  constructor(props){
    super(props);
    this.state = {
        data : [],
        currentTutor: null,
        currentData: null,
    }

    this.tutors = {};
  }

  componentDidMount(){
      MyAPI.get_userprofile(null, {'is_tutor': true}, this.context.access_token)
      .then((response) => {
        this.setState(() => {
          return {data: response};
        });
      })
  }

  showDetails = (index, data) => {
    this.setState({ currentTutor: index,
                    currentData: data, });
  }

  hideDetails = () => {
    this.setState({ currentTutor: null });
  }

  render() {
    var userprofiles = this.state.data.map((userprofile, index) => {
        return (
            <AdminTutorsItem key={index} index={index} tutor={userprofile}
                             showDetails={this.showDetails}/>
        )
    });

    if (this.state.currentTutor)
      document.body.style.overflow = 'hidden';
    else
      document.body.style.overflow = 'auto';

    return (
      <div className={css.container}>
          {userprofiles}
          {userprofiles.length % 3 === 2 && <div style={{ width: '30%' }}/>}
          {userprofiles.length === 0 &&
          <div style={{ width: '100%', textAlign: 'center', fontSize: 25, color: '#ccc', fontStyle: 'italic', marginTop: 20 }}>
            No tutors available
          </div>}
          {this.state.currentTutor !== null &&
          <AdminTutorsDetails tutor={this.state.data[this.state.currentTutor]} data={this.state.currentData} hideDetails={this.hideDetails}/>}
      </div>
    );
  }
}

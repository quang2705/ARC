import React, { Component } from 'react';
import { render } from 'react-dom';
import { AuthContext } from '../../Auth/auth';

import css from './admin-tutors.module.css';

import MyAPI from '../../Api';
import AdminTutorsItem from './AdminTutorsItem/admin-tutors-item';

export default class AdminTutors extends Component {
    static contextType = AuthContext;
    constructor(props){
        super(props);
        this.state = {
            data : [],
        }
    }
    componentDidMount(){
        MyAPI.get_userprofile(null, {'is_tutor': true}, this.context.access_token)
        .then((response) => {
            return response.json();
        }).then((data) => {
            return this.setState(() => {
                return {data: data.results};
            });
        });
    }
  render() {
      var userprofiles = this.state.data.map((userprofile, index) => {
          return (
              <AdminTutorsItem key={index} tutor={userprofile}/>
          )
      });
    return (
      <div>
            {userprofiles}
      </div>
    );
  }
}

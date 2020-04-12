//This is just a placeholder to show that admin-tutors-item works on one user
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
        <table id ='admin_tutors'>
            <tbody>
                <tr>
                    <th key={0}>{" Tutor First Name "}</th>
                    <th key={1}>{" Tutor Last Name "}</th>
                    <th key={2}>{" Tutor Email "}</th>
                    <th key={3}>{" Tutor Phone "}</th>
                    <th key={4}>{""}</th>
                </tr>
                {userprofiles}
            </tbody>
        </table>
      </div>
    );
  }
}

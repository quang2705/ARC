import React, { Component } from 'react';
import { render } from 'react-dom';

import css from './admin-summary.module.css';

import MyAPI from '../../Api';
import AdminSummaryItem from './AdminSummaryItem/admin-summary-item';

export default class AdminSummary extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : [],
        }
    }
    componentDidMount(){
        MyAPI.get_userprofile()
        .then((response) => {
            return response.json();
        }).then((data) => {
            return this.setState(() => {
                console.log("data.results", data.results);
                return {data: data.results};
            });
        });
    }
  render() {
      var userprofiles = this.state.data.map((userprofile, index) => {
          return (
              <AdminSummaryItem key={index} tutor={userprofile}/>
          )
      });
    return (
      <div>
        <table id ='admin_summary'>
            <tbody>
                <tr>
                    <th key={0}>{" Tutor First Name"}</th>
                    <th key={1}>{" Tutor Last Name"}</th>
                    <th key={2}>{" Tutor Email Name"}</th>
                    <th key={3}>{" Tutor Phone Name"}</th>
                </tr>
                {userprofiles}
            </tbody>
        </table>
      </div>
    );
  }
}

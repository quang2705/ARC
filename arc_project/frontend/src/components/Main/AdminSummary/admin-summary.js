import React, { Component } from 'react';
import { render } from 'react-dom';
import { AuthContext } from '../../Auth/auth';

import css from './admin-summary.module.css';

import MyAPI from '../../Api';
import AdminSummaryItem from './AdminSummaryItem/admin-summary-item';

export default class AdminSummary extends Component {
    static contextType = AuthContext;
    constructor(props){
        super(props);
        this.state = {
            data : [],
            start_date:'',
            end_date:'',
            session_start_date:'',
            session_end_date:'',
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
    onTextChangeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    onDateFilter = () => {
        console.log('oneDateFilter');
        this.setState({
            session_start_date: this.state.start_date,
            session_end_date: this.state.end_date,
        });
    }

    onCallBack = () => {

    }
  render() {
      var userprofiles = this.state.data.map((userprofile, index) => {
          return (
              <AdminSummaryItem key={index}
                                tutor={userprofile}
                                start_date={this.state.session_start_date}
                                end_date={this.state.session_end_date}
                                callback={this.onCallBack}/>
          )
      });

    return (
      <div>
        <label> start date: <br/>
            <input type='date' name='start_date' onChange={this.onTextChangeHandler}/>
            <br/>
        </label>

        <br/>

        <label> end date: <br/>
            <input type='date' name='end_date' onChange={this.onTextChangeHandler}/>
            <br/>
        </label>

        <br/>

        <input type='submit' value='search' onClick={this.onDateFilter}/><br/>

        <br/>

        <table id ='admin_summary'>
            <tbody>
                <tr>
                    <th key={0}>{" Tutor First Name "}</th>
                    <th key={1}>{" Tutor Last Name "}</th>
                    <th key={2}>{" Tutor Email "}</th>
                    <th key={3}>{" Tutor Phone "}</th>
                    <th key={4}>{" Total Verified Hours "}</th>
                    <th key={5}>{" Total Hours "}</th>
                </tr>
                {userprofiles}
            </tbody>
        </table>
      </div>
    );
  }
}

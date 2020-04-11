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
            sessions: [],
        }
    }

    //getting the list of all the tutor and their sessions
    //update the date state and the sessions state
    componentDidMount(){
        MyAPI.get_userprofile(null, {'is_tutor': true}, this.context.access_token)
        .then((response) => {
            return response.json();
        }).then((data) => {
            this.setState(
                {data: data.results,
                sessions: Array(data.results.length).fill([])},
                () => {this.createSessions();}
            );
        });
    }

    //update the sessions state so that it can filter based on
    //the start date and the end date
    createSessions = () => {
        this.state.data.map((userprofile, index) => {
        let tutor_id = userprofile.id;
        MyAPI.get_user_session(tutor_id, this.context.access_token,
                                {'date[gte]':this.state.start_date,
                                'date[lte]':this.state.end_date,})
        .then((response) => {
            return response.json();
        }).then((user_sessions) => {
            this.setState(() => {
                let new_sessions = this.state.sessions.slice();
                new_sessions[index] = user_sessions;
                return {sessions: new_sessions};
            });
        });
    });
    }

    //updating the start and end date
    onTextChangeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

  render() {
      var userprofiles = this.state.data.map((userprofile, index) => {
          return (
              <AdminSummaryItem key={index}
                                tutor={userprofile}
                                sessions={this.state.sessions[index]}/>
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

        <input type='submit' value='search' onClick={() => {this.createSessions();}}/><br/>

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

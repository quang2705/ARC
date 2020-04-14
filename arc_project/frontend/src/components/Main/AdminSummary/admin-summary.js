import React, { Component } from 'react';
import { render } from 'react-dom';
import { AuthContext } from '../../Auth/auth';

import css from './admin-summary.module.css';

import MyAPI from '../../Api';
import AdminSummaryItem from './AdminSummaryItem/admin-summary-item';
import DateInput from '../../DefaultUI/DateInput/date-input';
import Button from '../../DefaultUI/Button/button';

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
      .then((data) => {
          this.setState(
              {data: data,
               sessions: Array(data.length).fill([])},
              () => {this.createSessions();}
          );
      });
  }

  //update the sessions state so that it can filter based on
  //the start date and the end date
  createSessions = (event) => {
    if (event && event.preventDefault)
      event.preventDefault();
    this.state.data.map((userprofile, index) => {
      let tutor_id = userprofile.id;
      MyAPI.get_user_session(tutor_id, this.context.access_token,
                             {'date[gte]':this.state.start_date,
                              'date[lte]':this.state.end_date,})
      .then((data) => {
        this.setState(() => {
            let new_sessions = this.state.sessions.slice();
            new_sessions[index] = data;
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
      var colNames = ["Tutor FName", "Tutor LName", "Tutor email", "Total verified hours", "Total hours"];
      var flex = [2, 2, 3, 2, 1];

      var userprofiles = this.state.data.map((userprofile, index) => {
          return (
              <AdminSummaryItem key={index}
                                tutor={userprofile}
                                sessions={this.state.sessions[index]}
                                flex={flex}/>
          )
      });

      var header = colNames.map((item, index) => {
        return <td key={index} style={{ flex: flex[index] }} className={css.headerItem}>{item}</td>
      });

    return (
      <div className={css.container}>
        <form className={css.filterForm}>
          <div className={css.filterContainer}>
            <div className={css.dateFilter}>
              <div>
                <DateInput title="Start date" name='start_date' onChange={this.onTextChangeHandler}/>
              </div>

              <div>
                <DateInput title="End date" name='end_date' onChange={this.onTextChangeHandler} />
              </div>
            </div>

            <div className={css.filterButtonWrapper}>
              <Button className={css.filterButton} color='red' text='Apply filter' type='submit' onClick={this.createSessions}/>
            </div>
          </div>
        </form>

        <table className={css.table}>
          <thead>
            <tr className={css.row}>
                {header}
            </tr>
          </thead>

          <tbody>
            {userprofiles}
          </tbody>
        </table>
      </div>
    );
  }
}

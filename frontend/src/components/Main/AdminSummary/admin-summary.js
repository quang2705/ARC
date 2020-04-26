import React, { Component } from 'react';
import { render } from 'react-dom';
import { AuthContext } from '../../Auth/auth';

import css from './admin-summary.module.css';

import MyAPI from '../../Api';
import AdminSummaryItem from './AdminSummaryItem/admin-summary-item';
import DateInput from '../../DefaultUI/DateInput/date-input';
import Button from '../../DefaultUI/Button/button';
import MultiSelectInput from '../../DefaultUI/MultiSelectInput/multi-select-input';

export default class AdminSummary extends Component {
  static contextType = AuthContext;

  constructor(props){
      super(props);
      this.state = {
          users : [],
          subjects: [],
          start_date:'',
          end_date:'',
          sessionsByUser: [],
          sessionsBySubject: [],
          currentGroupBy: 'User',
      }
  }

  componentDidMount() {
      MyAPI.get_userprofile(null, {'is_tutor': true}, this.context.access_token)
      .then((data) => {
          this.setState(
              {users: data},
              () => {this.formatSessions();}
          );
      });

      MyAPI.get_subjects(null, this.context.access_token).then(data => {
        this.setState({ subjects: data }, this.formatSessions);
      });
  }

  //update the sessions state so that it can filter based on
  //the start date and the end date
  formatSessions = (event) => {
    if (event && event.preventDefault)
      event.preventDefault();

    if (this.state.currentGroupBy === 'User') {
      let count = this.state.users.length;
      let sessions = {};
      this.state.users.map((userprofile, index) => {
        let tutor_id = userprofile.id;
        MyAPI.get_user_session(tutor_id, this.context.access_token,
                               {'date[gte]':this.state.start_date,
                                'date[lte]':this.state.end_date,})
        .then((data) => {
          --count;
          sessions[tutor_id] = data;
          if (count === 0)
            this.setState({ sessionsByUser: sessions })
        });
      });
    }
    else if (this.state.currentGroupBy === 'Subject') {
      let count = this.state.subjects.length;
      let sessions = {};
      this.state.subjects.map((subject, index) => {
        let filter = { 'date[gte]':this.state.start_date,
                       'date[lte]':this.state.end_date }
        MyAPI.get_sessions_by_subject(subject.id, this.context.access_token, filter).then(data => {
          --count;
          sessions[subject.id] = data;
          this.setState({ sessionsBySubject: sessions });
        })
      });
    }
  }

  //updating the start and end date
  onTextChangeHandler = (event) => {
      this.setState({[event.target.name]: event.target.value});
  }

  onGroupByChange = (event) => {
    this.setState({[event.target.name]: event.target.value}, this.formatSessions);
  }

  render() {
    var colNames;
    var flex;
    var summary;

    if (this.state.currentGroupBy === 'User') {
      colNames = ["Tutor FName", "Tutor LName", "Tutor email", "Total verified hours", "Total hours"];
      flex = [2, 2, 3, 2, 1];
      summary = this.state.users.map((userprofile, index) => {
                    return (
                        <AdminSummaryItem key={index}
                                          tutor={userprofile}
                                          sessions={this.state.sessionsByUser[userprofile.id]}/>
                    )
                });
    }
    else if (this.state.currentGroupBy === 'Subject') {
      colNames = ['Subject', 'Total verified hours', 'Total hours'];
      flex = [3, 1, 1];
      summary = this.state.subjects.map((subject, index) => {
                    return (
                        <AdminSummaryItem key={index}
                                          subject={subject}
                                          sessions={this.state.sessionsBySubject[subject.id]}/>
                    )
                });
    }

    var header = colNames.map((item, index) => {
      return <td key={index} style={{ flex: flex[index] }} className={css.headerItem}>{item}</td>
    });

    var groupByOptions = (
      <>
        <option>User</option>
        <option>Subject</option>
      </>
    )

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
              <Button className={css.filterButton} color='red' text='Apply filter' type='submit' onClick={this.formatSessions}/>
            </div>
          </div>
        </form>

        <MultiSelectInput title='Group by' options={groupByOptions} name='currentGroupBy' value={this.state.currentGroupBy} onChange={this.onGroupByChange} classNameContainer={css.groupByInput}/>

        <table className={css.table}>
          <thead>
            <tr className={css.row}>
                {header}
            </tr>
          </thead>

          <tbody>
            {summary}
          </tbody>
        </table>
      </div>
    );
  }
}

import React, { Component } from 'react';
import { render } from 'react-dom';
import css from './tutor-contracts.module.css';
// import TutorContractItem from './TutorContractItem/tutor-contract-item';

export default class TutorContracts extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  const getDataPromise = new Promise(function(resolve, reject){
    getData(){
      resolve ({
        class: 'cs111',
        tutee: 'quang',
        phone: '1234567',
        email: 'quang@gmail.com',
        meeting: []
      });
    };
  });

  componentDidMount(){
      getDataPromise.then((data) => {
        console.log(data);
      });
  }


  render() {
    return (
      <>
      </>
    );
  }
}

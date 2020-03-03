import React, { Component } from 'react';
import { render } from 'react-dom';
import css from './tutor-contracts.module.css';
import TutorContractItem from './TutorContractItem/tutor-contract-item';
import MyAPI from '../../Api'

export default class TutorContracts extends Component {
  constructor(props){
    super(props);
    this.state = {
			data:[]
		};

		this.getDataPromise = new Promise(function(resolve, reject){
		    function getData(){
		      var data = {
		        class: 'cs111',
		        tutee: 'quang',
		        phone: '1234567',
		        email: 'quang@gmail.com',
		        meeting: [],
		      };
					resolve(data);
		    };
				getData();
		  });
  }

  componentDidMount(){
		MyAPI.get_contract()
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			return this.setState(() => {
				return ({data: data.results});
			});
		});
  }


  render() {
		let contracts = this.state.data.map((contract, index) => {
			return(
				<TutorContractItem key={index} contract={contract}/>
			);
		});

    return (
      <>
				{contracts}
      </>
    );
  }
}

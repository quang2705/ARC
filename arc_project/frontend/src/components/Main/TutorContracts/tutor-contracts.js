import React, { Component } from 'react';
import { render } from 'react-dom';
<<<<<<< HEAD
=======
import TutorContractForm from './TutorContractForm/tutor-contract-form';

>>>>>>> 0718e989321fe0c4944b895d65af494c45ba1fee
import css from './tutor-contracts.module.css';
import TutorContractItem from './TutorContractItem/tutor-contract-item';
import MyAPI from '../../Api'

export default class TutorContracts extends Component {
  constructor(props){
    super(props);
    this.state = {
			data:[]
		};
  }

  componentDidMount(){
		//get all the contract of this user, then put it
		//into this.state.data. Check MyAPI class for more
		//functionality
		MyAPI.get_contract()
		.then((response) => {
			//TODO: check for error response here
			return response.json();
		})
		.then((data) => {
			//set this.state.data 
			return this.setState(() => {
				return ({data: data.results});
			});
		});
  }


  render() {
		//pass the contract data from this.state.data to the TutorContractItem
		//child, the data can be accessed through this.props.contract in
		//TutorContractItem
		let contracts = this.state.data.map((contract, index) => {
			return(
				<TutorContractItem key={index} contract={contract}/>
			);
		});
    return (
<<<<<<< HEAD
      <>
				{contracts}
      </>
=======
      <TutorContractForm/>
>>>>>>> 0718e989321fe0c4944b895d65af494c45ba1fee
    );
  }
}

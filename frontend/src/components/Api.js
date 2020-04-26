import Cookies from 'js-cookie';

const CONVERT_TOKEN_URL = '/auth/convert-token';
const USERPROFILE_URL = '/api/userprofiles/';
const USER_URL = '/api/users/';
const CONTRACT_URL = '/api/contracts/';
const SESSION_URL = '/api/sessions/';
const CONTRACT_MEETING_URL = '/api/contractmeetings/';
const SUBJECT_URL = '/api/subjects/'
const ENCODE_URL = '/encode/'
export default class MyAPI {

	//join the url with the index
	//eg: url = /api/userprofiles/, index = 1
	//return : /api/userprofiles/1/
	static concat(url, index) {
		return url + index.toString()+"/";
	}

	//called api/auth/convert-token/ to get the access token of the database
	static get_db_access_token(query_params) {
		var csrftoken = Cookies.get('csrftoken');
		let headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');
		headers.append('X-CSRFToken', csrftoken);
		return fetch(CONVERT_TOKEN_URL, { method: "post",
							 headers: headers,
							 body: JSON.stringify(query_params)
							})
				.then((response) => {
					return response.json();
				}).then(data => {
					return data;
				});
	}

	//join the url with query parameter
	//url = api/userprofiles/ , query_params = {'position': 'headtutor', 'first_name': 'quang'}
	//return api/userprofiles?position=headtutor&first_name=quang
	static get_query_url(url, query_params) {
		if (query_params === undefined)
			return url;
		else if (Object.keys(query_params).length == 0)
			return url;
		else {
			url += "?";
			var query_url = []
			Object.keys(query_params).forEach((key, index) => {
				if (query_params[key] != undefined && query_params[key].toString() != '')
					query_url.push(key + "=" + query_params[key].toString());
			});
			query_url = query_url.join('&')
			return url + query_url;
		}
	}

	//return the response for either /api/userprofiles/ or /api/userprofiles/<index>/
	static get_userprofile(index, query_params, access_token){
		let headers = new Headers();
		headers.append('Authorization', 'bearer '+access_token);
		let url;
		if (!index) {
			url = this.get_query_url(USERPROFILE_URL, query_params);
		}
		else {
			url = this.concat(USERPROFILE_URL, index);
		}
		return fetch(url, {headers: headers })
				.then((response) => {
					return response.json();
				}).then((data) => {
					return data;
				});

	}

	//return the response for either /api/users/ or /api/users/<index>/
	static get_user(index, access_token) {
		let headers = new Headers();
		headers.append('Authorization', 'bearer '+access_token);
		let url;
		if (!index) {
			url = USER_URL;
		}
		else {
			url = this.concat(USER_URL, index);
		}
		return fetch(url,{ headers: headers })
				.then((response) => {
					return response.json();
				}).then((data) => {
					return data;
				});
	}

	//return response for /api/userprofiles/get_current_userprofile
	static get_current_userprofile(access_token) {
		let headers = new Headers();
		headers.append('Authorization', 'bearer '+access_token);
		return fetch(USERPROFILE_URL+'get_current_userprofile/',
						{ headers: headers })
				.then((response) => {
					return response.json();
				}).then((data) => {
					return data;
				});;
	}

	//return response for /api/userprofiles/get_current_position
	static get_current_position(access_token) {
		//get position (tutor, tutee, headtutor, admin) of the current user
		let headers = new Headers();
		headers.append('Authorization', 'bearer '+access_token);
		return fetch(USERPROFILE_URL + 'current_position/',
								{headers: headers})
				.then((response) => {
					return response.json();
				}).then((data) => {
					// data is a list of position that this user has
					// data: ['tutor', 'headtutor']
					return data;
				});
	}

	//return response for /api/contracts/ or /api/contracts/<index>
	static get_contract(index, access_token, query_params) {
		let headers = new Headers();
		headers.append('Authorization', 'bearer '+access_token);
		let url;
		if (!index) {
			url = this.get_query_url(CONTRACT_URL, query_params);
		}
		else {
			url = this.get_query_url(this.concat(CONTRACT_URL, index), query_params);
		}
		return fetch(url, { headers: headers })
				.then((response) => {
					return response.json();
				}).then((data) => {
					return data;
				});

	}

	//return response for /api/sessions/ or /api/sessions/<index>
	static get_session(index, access_token, query_params) {
		let headers = new Headers();
		headers.append('Authorization', 'bearer '+ access_token);
		let url;
		if (!index) {
			url = this.get_query_url(SESSION_URL, query_params);
		}
		else {
			url = this.get_query_url(this.concat(SESSION_URL, index), query_params);
		}
		return fetch(url,{ headers: headers })
				.then((response) => {
					return response.json();
				}).then((data) => {
					return data;
				});
	}

	static get_sessions_by_subject(subject_id, access_token, query_params) {
		let headers = new Headers();
		headers.append('Authorization', 'bearer '+ access_token);
		let url = this.get(SUBJECT_URL, subject_id) +'get_sessions/';
		url = this.query(url, query_params);
		return fetch(url, { headers: headers })
				.then((response) => {
					return response.json();
				}).then((data) => {
					return data;
				});
	}

	//return response for /api/userprofiles/<user_id>/get_user_sessions/
	static get_user_session(user_id, access_token, query_params,){
		let headers = new Headers();
		headers.append('Authorization', 'bearer '+ access_token);
		let url = this.concat(USERPROFILE_URL, user_id) +'get_sessions/';
		url = this.get_query_url(url, query_params);
		return fetch(url, { headers: headers })
				.then((response) => {
					return response.json();
				}).then((data) => {
					return data;
				});
	}

	//return response for /api/userprofiles/<user_id>/get_user_contracts/
	static get_user_contract(user_id, access_token){
		let headers = new Headers();
		headers.append('Authorization', 'bearer '+ access_token);
		return fetch(this.concat(USERPROFILE_URL, user_id) +'get_contracts/',
					{ headers: headers })
				.then((response) => {
					return response.json();
				}).then((data) => {
					return data;
				});
	}

	//return response for /api/contract_meetings/ or /api/contract_meetings/<index>
	static get_contractmeeting(index, access_token, query_params) {
		let headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');
		headers.append('Authorization', 'bearer '+ access_token);
		let url;
		if (index === undefined) {
			url = this.get_query_url(CONTRACT_MEETING_URL, query_params);
		}
		else {
			url = this.get_query_url(this.concat(CONTRACT_MEETING_URL, index), query_params);
		}
		return fetch(url,{ headers: headers })
				.then((response) => {
					return response.json();
				}).then((data) => {
					return data;
				});
	}

	// return response for /api/subjects/ or /api/subjects/<index>
	static get_subjects(index, access_token){
		let headers = new Headers();
		headers.append('Authorization', 'bearer '+ access_token);
		let subjects = [];
		let url;
		if (!index) {
			url = SUBJECT_URL;
		}
		else {
			url = this.concat(SUBJECT_URL, index);
		}
		return fetch(url,{ headers: headers })
				.then((response) => {
					return response.json();
				}).then((data) => {
					return data;
				});
	}


	static create_contract(contract_data, callback, access_token) {
		//TODO: create contrains for not adding contract meetings for contract
		// need to call the callback function eventhough we dont have any
		// contract meeting
		var csrftoken = Cookies.get('csrftoken');
		var headers = new Headers();
		// headers.append('Authorization', 'Basic '+ btoa('MegJaffy:Jaffy@123'));
		headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');
		headers.append('X-CSRFToken', csrftoken);
		headers.append('Authorization', 'bearer '+ access_token);
		var contract_id;
		fetch(CONTRACT_URL,{
			method: "post",
			headers: headers,
			body: JSON.stringify({
				"tutor_email": contract_data.tutorEmail,
				"tutee_email": contract_data.tuteeEmail,
				"tutee_first_name": contract_data.tuteeFirstName,
				"tutee_last_name": contract_data.tuteeLastName,
				"tutee_phone": contract_data.tuteePhone,
				"tutee_dnumber": contract_data.tuteeDnumber,
				"class_name": contract_data.class,
				"professor_name": contract_data.instructor,
				"subject": contract_data.subject,
				})
		}).then((response) => {
			return response.json();
		}).then((response_data) => {
			let count = 0;
			contract_id = response_data.id;
			for (var i = 0; i < contract_data.meetings.length; i++) {
				let contractMeeting = contract_data.meetings[i]
				fetch(CONTRACT_MEETING_URL,{
					method: "post",
					headers: headers,
					body: JSON.stringify({
						"contract_id": contract_id,
						"week_day": contractMeeting['day'],
						"start": contractMeeting['start'],
						"end": contractMeeting['end'],
						"location": contractMeeting['location'],
					})
				}).then(response => {
						return response.json();
					}).then((data) => {
						count +=1;
						response_data.contract_meetings.push({
							id: data.id,
							url: data.url});
						if (count == contract_data.meetings.length){
							callback(response_data);
						}
					});
				}
		});
	}

	static update_contract(contract_data, callback, access_token) {
		var csrftoken = Cookies.get('csrftoken');
		var headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');
		headers.append('X-CSRFToken', csrftoken);
		headers.append('Authorization', 'bearer '+ access_token);

		let url = this.concat(CONTRACT_URL, contract_data.contract_id);
		return fetch(url, {
			method: "put",
			headers: headers,
			body: JSON.stringify({
				"tutor_email": contract_data.tutorEmail,
				"tutee_email": contract_data.tuteeEmail,
				"tutee_first_name": contract_data.tuteeFirstName,
				"tutee_last_name": contract_data.tuteeLastName,
				"tutee_phone": contract_data.tuteePhone,
				"tutee_dnumber": contract_data.tuteeDnumber,
				"class_name": contract_data.class,
				"professor_name": contract_data.instructor,
				"subject": contract_data.subject,
				})
		}).then((response) => {
			return response.json();
		}).then((response_data) => {
			let count = 0;
			let contract_id = contract_data.contract_id;
			if (contract_data.meetings.length === 0)
				callback(response_data);
			for (var i = 0; i < contract_data.meetings.length; i++) {
				let contractMeeting = contract_data.meetings[i]
				fetch(CONTRACT_MEETING_URL,{
					method: "post",
					headers: headers,
					body: JSON.stringify({
						"contract_id": contract_id,
						"week_day": contractMeeting['day'],
						"start": contractMeeting['start'],
						"end": contractMeeting['end'],
						"location": contractMeeting['location'],
					})
				}).then(response => {
						return response.json();
					}).then((data) => {
						count +=1;
						if (count == contract_data.meetings.length) {
							callback(response_data);
						}
					});
				}
		});
	}

	static delete_contract_meeting(index, access_token) {
		var csrftoken = Cookies.get('csrftoken');
		var headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');
		headers.append('X-CSRFToken', csrftoken);
		headers.append('Authorization', 'bearer '+ access_token);

		return fetch(this.concat(CONTRACT_MEETING_URL, index),
					{
						method: 'delete',
						headers: headers,
					});
	}

	static create_session(data, access_token) {
		var csrftoken = Cookies.get('csrftoken');
		var headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');
		headers.append('X-CSRFToken', csrftoken);
		headers.append('Authorization', 'bearer '+access_token);

		return fetch(SESSION_URL,
			{
        method: "post",
				headers: headers,
        body: JSON.stringify({
					'contract_id': data.contract_id,
					'date': data.sessDate,
					'start': data.sessStart,
					'end': data.sessEnd,
					'summary': data.sessSummary,
				})
    	})
		.then((response) => {
			return response.json();
		}).then((data) => {

			return data;
		});
	}

	static delete_session(index, access_token){
		var csrftoken = Cookies.get('csrftoken');
		var headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');
		headers.append('X-CSRFToken', csrftoken);
		headers.append('Authorization', 'bearer '+ access_token);

		return fetch(this.concat(SESSION_URL, index),
					{
						method: 'delete',
						headers: headers,
					});
	}

	static delete_contract(index, access_token){
		var csrftoken = Cookies.get('csrftoken');
		var headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');
		headers.append('X-CSRFToken', csrftoken);
		headers.append('Authorization', 'bearer '+access_token);

		return fetch(this.concat(CONTRACT_URL, index),
					{
						method: 'delete',
						headers: headers,
					});
	}
	static get_encrypted_string(query_params, access_token) {
		let headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');
		headers.append('Authorization', 'bearer '+access_token);

		return fetch(this.get_query_url(ENCODE_URL, query_params),
					{headers: headers})
				.then((response) => {
					return response.json();
				}).then((data) => {
					return data;
				})
	}
}

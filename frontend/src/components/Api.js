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

	static get(url, index) {
		return url + index.toString()+"/";
	}

	static get_db_access_token(query_params) {
		var csrftoken = Cookies.get('csrftoken');
		let headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');
		headers.append('X-CSRFToken', csrftoken);
		return fetch(CONVERT_TOKEN_URL, { method: "post",
							 headers: headers,
							 body: JSON.stringify(query_params)
							});
	}

	static query(url, query_params) {
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

	static get_userprofile(index, query_params, access_token){
		let headers = new Headers();
		headers.append('Authorization', 'bearer '+access_token);

		if (!index)
			return fetch(this.query(USERPROFILE_URL,
									query_params),
								{ headers: headers })
					.then((response) => {
						return response.json();
					}).then((data) => {
						return data.results;
					});
		else
			return fetch(this.get(USERPROFILE_URL, index),
								{headers: headers })
					.then((response) => {
						return response.json();
					}).then((data) => {
						return data;
					});

	}

	static get_user(index, access_token) {
		let headers = new Headers();
		headers.append('Authorization', 'bearer '+access_token);

		if (!index)
			return fetch(USER_URL, { headers: headers })
					.then((response) => {
						return response.json();
					}).then((data) => {
						return data.results;
					});
		else
			return fetch(this.get(USER_URL, index),
							{ headers: headers })
					.then((response) => {
						return response.json();
					}).then((data) => {
						return data.results;
					});;
	}

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
					})
	}

	static get_contract(index, access_token, query_params) {
		let headers = new Headers();
		headers.append('Authorization', 'bearer '+access_token);
		if (!index){
			let url = this.query(CONTRACT_URL, query_params);
			return fetch(url,
						{ headers: headers });
		}
		else {
			let url = this.query(this.get(CONTRACT_URL, index), query_params);
			return fetch(this.get(CONTRACT_URL, index),
						{ headers: headers });
		}
	}

	static get_session(index, access_token, query_params) {
		let headers = new Headers();
		headers.append('Authorization', 'bearer '+ access_token);
		if (!index) {
			let url = this.query(SESSION_URL, query_params);
			return fetch(SESSION_URL,
						{ headers: headers })
					.then((response) => {
						return response.json();
					}).then((data) => {
						return data.results;
					});
		}
		else {
			let url = this.query(this.get(SESSION_URL, index), query_params);
			return fetch(url,
						{ headers: headers })
					.then((response) => {
						return response.json();
					}).then((data) => {
						return data;
					});
		}
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

	static get_user_session(user_id, access_token, query_params,){
		let headers = new Headers();
		headers.append('Authorization', 'bearer '+ access_token);
		let url = this.get(USERPROFILE_URL, user_id) +'get_sessions/';
		url = this.query(url, query_params);
		return fetch(url, { headers: headers })
				.then((response) => {
					return response.json();
				}).then((data) => {
					return data;
				});
	}

	static get_user_contract(user_id, access_token){
		let headers = new Headers();
		headers.append('Authorization', 'bearer '+ access_token);
		return fetch(this.get(USERPROFILE_URL, user_id) +'get_contracts/',
					{ headers: headers });
	}

	static get_contractmeeting(index, access_token, query_params) {
		let headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');
		headers.append('Authorization', 'bearer '+ access_token);
		if (index === undefined)
		{
			let url = this.query(CONTRACT_MEETING_URL, query_params);
			return fetch(url,
						{ headers: headers });
		}
		else
		{
			let url = this.query(this.get(CONTRACT_MEETING_URL, index), query_params);
			return fetch(url,
						{ headers: headers });
		}
	}

	static get_subjects(index, access_token){
		let headers = new Headers();
		headers.append('Authorization', 'bearer '+ access_token);
		let subjects = [];
		if (!index) {
			return fetch(SUBJECT_URL, { headers: headers })
			.then((res) => {
				return res.json();
			}).then((data) => {
				subjects.push(...data.results);
				let data_next = data.next;
				if (data_next != null)
				{
					fetch(data_next, { headers: headers })
					.then((res) => {
						return res.json();
					}).then((data) => {
						subjects.push(...data.results);
						data_next = data.next;
					});
				}
				return subjects;
			});
		}
		else {
			 return fetch(this.get(SUBJECT_URL, index),
						{ headers: headers })
					.then((res) => {
						return res.json();
					}).then((data) => {
						subjects.push(...data.results);
						return subjects;
					});
		}
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

		let url = this.get(CONTRACT_URL, contract_data.contract_id);
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

		return fetch(this.get(CONTRACT_MEETING_URL, index),
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
    });
	}

	static delete_session(index, access_token){
		var csrftoken = Cookies.get('csrftoken');
		var headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');
		headers.append('X-CSRFToken', csrftoken);
		headers.append('Authorization', 'bearer '+ access_token);

		return fetch(this.get(SESSION_URL, index),
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

		return fetch(this.get(CONTRACT_URL, index),
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

		return fetch(this.query(ENCODE_URL, query_params),
					{headers: headers})
				.then((response) => {
					return response.json();
				}).then((data) => {
					return data;
				})
	}
}

import Cookies from 'js-cookie';

const CONVERT_TOKEN_URL = '/auth/convert-token';
const USERPROFILE_URL = '/api/userprofiles/';
const USER_URL = '/api/users/';
const CONTRACT_URL = '/api/contracts/';
const SESSION_URL = '/api/sessions/';
const CONTRACT_MEETING_URL = '/api/contractmeetings/';
const SUBJECT_URL = '/api/subjects/'
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
				query_url.push(key + "=" + query_params[key].toString());
			});
			query_url = query_url.join('&')
			console.log(url+query_url);
			return url + query_url;
		}
	}

	static get_userprofile(index, query_params, access_token){
		let headers = new Headers();
		headers.append('Authorization', 'bearer '+access_token);

		if (!index)
			return fetch(this.query(USERPROFILE_URL,
									query_params),
								{ headers: headers });
		else
			return fetch(this.get(USERPROFILE_URL, index),
								{headers: headers });

	}

	static get_user(index, access_token) {
		let headers = new Headers();
		headers.append('Authorization', 'bearer '+access_token);

		if (!index)
			return fetch(USER_URL, { headers: headers });
		else
			return fetch(this.get(USER_URL, index),
							{ headers: headers });
	}

	static get_contract(index, access_token) {
		let headers = new Headers();
		headers.append('Authorization', 'bearer '+access_token);
		if (!index)
			return fetch(CONTRACT_URL,
						{ headers: headers });
		else
			return fetch(this.get(CONTRACT_URL, index),
						{ headers: headers });
	}

	static get_session(index, access_token) {
		let headers = new Headers();
		headers.append('Authorization', 'bearer '+ access_token);
		if (!index)
			return fetch(SESSION_URL,
						{ headers: headers });
		else
			return fetch(this.get(SESSION_URL, index),
						{ headers: headers });
	}

	static get_user_session(user_id, access_token){
		let headers = new Headers();
		headers.append('Authorization', 'bearer '+ access_token);
		return fetch(this.get(USERPROFILE_URL, user_id) +'get_sessions/',
					{ headers: headers });
	}

	static get_contractmeeting(index, access_token) {
		let headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');
		headers.append('Authorization', 'bearer '+ access_token);
		if (index === undefined)
			return fetch(CONTRACT_MEETING_URL,
						{ headers: headers });
		else
			return fetch(this.get(CONTRACT_MEETING_URL, index),
						{ headers: headers });
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

	static create_contract(data, callback, access_token) {
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
				"tutor_email": data.tutorEmail,
				"tutee_email": data.tuteeEmail,
				"tutee_first_name": data.tuteeFirstName,
				"tutee_last_name": data.tuteeLastName,
				"tutee_phone": data.tuteePhone,
				"tutee_dnumber": data.tuteeDnumber,
				"class_name": data.class,
				"professor_name": data.instructor,
				"subject": data.subject,
				})
		}).then((response) => {
			console.log(response);
			return response.json();
		}).then((response_data) => {
			contract_id = response_data.id;
			for (var i = 0; i < data.meetings.length; i++) {
				let contractMeeting = data.meetings[i]
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
						console.log("MEETING DATA ", data);
					});
				}
			callback(response_data);
		});
	}

	static create_session(data, access_token) {
		console.log("data ", data)
		var csrftoken = Cookies.get('csrftoken');
		var headers = new Headers();
		headers.append('Accept', 'application/json')
		headers.append('Content-Type', 'application/json')
		headers.append('X-CSRFToken', csrftoken)
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
					'summary': data.sessSummary
				})

    });
	}
}

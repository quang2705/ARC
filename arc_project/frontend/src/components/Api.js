import Cookies from 'js-cookie'

const USERPROFILE_URL = '/api/userprofiles/';
const USER_URL = '/api/users/';
const CONTRACT_URL = '/api/contracts/';
const SESSION_URL = '/api/sessions/';
const CONTRACT_MEETING_URL = '/api/contractmeetings/';

export default class MyAPI {
	static get(url, index) {
		return url + index.toString()+"/";
	}

	static get_userprofile(index) {
		if (index === undefined)
			return fetch(USERPROFILE_URL);
		else
			return fetch(this.get(USERPROFILE_URL, index));
	}

	static get_user(index) {
		if (index === undefined)
			return fetch(USER_URL);
		else
			return fetch(this.get(USER_URL, index));
	}

	static get_contract(index) {
		if (index === undefined)
			return fetch(CONTRACT_URL);
		else
			return fetch(this.get(CONTRACT_URL, index));
	}

	static get_session(index) {
		if (index === undefined)
			return fetch(SESSION_URL);
		else
			return fetch(this.get(SESSION_URL, index));
	}

	static get_contractmeeting(index) {
		if (index === undefined)
			return fetch(CONTRACT_MEETING_URL);
		else
			fetch(this.get(CONTRACT_MEETING_URL, index));
	}

	static create_contract(data, callback) {
		var csrftoken = Cookies.get('csrftoken');
		var headers = new Headers();
		// headers.append('Authorization', 'Basic '+ btoa('MegJaffy:Jaffy@123'));
		headers.append('Accept', 'application/json')
		headers.append('Content-Type', 'application/json')
		headers.append('X-CSRFToken', csrftoken)
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

	static create_session(data) {
		console.log("data ", data)
		var csrftoken = Cookies.get('csrftoken');
		var headers = new Headers();
		headers.append('Accept', 'application/json')
		headers.append('Content-Type', 'application/json')
		headers.append('X-CSRFToken', csrftoken)
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

import Cookies from 'js-cookie'

const USERPROFILE_URL = '/api/userprofiles/';
const USER_URL = '/api/users/';
const CONTRACT_URL = '/api/contracts/';
const SESSION_URL = '/api/sessions/';
const CONTRACT_MEETING_URL = '/api/contractmeetings/';

export default class MyAPI{
	static get(url, index){
		return url + index.toString()+"/";
	}
	static get_userprofile(index){
		if (index === undefined)
			return fetch(USERPROFILE_URL);
		else
			return fetch(this.get(USERPROFILE_URL, index));
	}
	static get_user(index){
		if (index === undefined)
			return fetch(USER_URL);
		else
			return fetch(this.get(USER_URL, index));
	}
	static get_contract(index){
		if (index === undefined)
			return fetch(CONTRACT_URL);
		else
			return fetch(this.get(CONTRACT_URL, index));
	}
	static get_session(index){
		if (index === undefined)
			return fetch(SESSION_URL);
		else
			return fetch(this.get(SESSION_URL, index));
	}
	static get_contractmeeting(index){
		if (index === undefined)
			return fetch(CONTRACT_MEETING_URL);
		else
			fetch(this.get(CONTRACT_MEETING_URL, index));
	}
	static create_contract(data, callback)
	{
		var csrftoken = Cookies.get('csrftoken');
		var headers = new Headers();
		// headers.append('Authorization', 'Basic '+ btoa('MegJaffy:Jaffy@123'));
		headers.append('Accept', 'application/json')
		headers.append('Content-Type', 'application/json')
		headers.append('X-CSRFToken', csrftoken)
		return fetch(CONTRACT_URL,
			{
				method: "post",
				headers: {
					'X-CSRFToken': csrftoken,
					'Authorization': 'Basic ' + btoa('MegJaffy:Jaffy@123'),
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
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
			})
//var i;

// for (i = 0; i < data.meetings.length; i++) {
// 	let contractMeeting = data.meetings[i]
// 	fetch(CONTRACT_MEETING_URL,
// 	{
// 		method: "post",
// 		headers: {
// 			'Accept': 'application/json',
// 			'Content-Type': 'application/json'
// 		},
//
// 		body: JSON.stringify({
// 			"contract_id": CONTRACT_URL,
// 			"week_day": contractMeeting['day'],
// 			"start": contractMeeting['start'],
// 			"end": contractMeeting['end'],
// 			"location": contractMeeting['location'],
// 		})
// 	}).then(res => {
// 			callback(res);
// 		});
// 	}
	}
}

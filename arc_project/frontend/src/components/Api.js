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
	static create_session(data){
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

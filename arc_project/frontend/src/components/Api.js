const USERPROFILE_URL = '/api/userprofiles/';
const USER_URL = '/api/users/';
const CONTRACT_URL = '/api/contracts/';
const SESSION_URL = '/api/sessions/';
const CONTRACT_MEETING_URL = '/api/contractmeetings/';

export default class MyAPI{
	static get(url,index){
		return url + index.toString()+"/";
	}
	static get_userprofile(index){
		if (index === undefined)
			return fetch(USERPROFILE_URL);
		else
			return fetch(this.get(USERPROFILE_URL, index));
	}
	static get_user(index){
		return fetch(this.get(USER_URL, index));
	}
	static get_contract(index){
		if (index === undefined)
			return fetch(CONTRACT_URL);
		else
			return fetch(this.get(CONTRACT_URL, index));
	}
	static get_session(index){
		return fetch(this.get(SESSION_URL, index));
	}
	static get_contractmeeting(index){
		fetch(this.get(CONTRACT_MEETING_URL, index));
	}

}

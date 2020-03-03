const USERPROFILE_URL = '/api/userprofiles/';
const USER_URL = '/api/users/';
const CONTRACT_URL = '/api/contracts/';
const SESSION_URL = '/api/sessions/';
const CONTRACT_MEETING_URL = '/api/contractmeetings/';

export default class MyAPI{
	static get_userprofile(){
		return fetch(USERPROFILE_URL);
	}
	static get_user(){
		return fetch(USER_URL);
	}
	static get_contract(){
		return fetch(CONTRACT_URL);
	}
	static get_session(){
		return fetch(SESSION_URL);
	}
	static get_contractmeeting(){
		return fetch(CONTRACT_MEETING_URL);
	}

}

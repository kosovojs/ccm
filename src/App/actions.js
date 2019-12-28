import api from '../api';

export const LOGIN = 'LOGIN';

export const login = (username) => ({
	type: LOGIN,
	username
});

export const checkAuth = () => {
	return function(dispatch) {
	  return api.user_info()
			.then(json => {
				if ('query' in json && 'userinfo' in json.query && 'name' in json.query.userinfo) {
					dispatch(login(json.query.userinfo.name));
				}
			}
		)
	}
}

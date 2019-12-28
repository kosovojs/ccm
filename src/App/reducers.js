import {LOGIN} from './actions';

const defaultState = {
	isAuth: false,
	username: '',
	error: false,
	errorMessage: '',
	shouldCheck: true
};

const app = (state = defaultState, action) => {
	switch (action.type) {
	  case LOGIN: {
		  const {username} = action;
		  
		  return {
			  ...state,
			  username,
			  isAuth: true
		  };
	  }
	  default:
		return state
	}
};

export default app;
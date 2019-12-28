import { SET_OPEN_DIALOG, SET_DIALOG_DATA } from './actions';

const defaultState = {
	open: false,
	data: []
};
const rating = (state = defaultState, action) => {
	switch (action.type) {

		case SET_OPEN_DIALOG: {
			return Object.assign({}, state, {
				open: action.data
			});
		}
		case SET_DIALOG_DATA: {
			return Object.assign({}, state, {
				data: action.data
			});
		}
		default:
			return state
	}
};

export default rating;

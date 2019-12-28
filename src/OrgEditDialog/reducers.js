import { SET_OPEN_DIALOG_ORG, SET_DIALOG_DATA_ORG } from './actions';

const defaultState = {
	open: false,
	id: null
};
const rating = (state = defaultState, action) => {
	switch (action.type) {

		case SET_OPEN_DIALOG_ORG: {
			return Object.assign({}, state, {
				open: action.data
			});
		}
		case SET_DIALOG_DATA_ORG: {
			return Object.assign({}, state, {
				id: action.data
			});
		}
		default:
			return state
	}
};

export default rating;

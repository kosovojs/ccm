
import {setRatingData, setLoading} from './actions';

import api from '../api';
const setData = () => {
	return function(dispatch, getState) {
		dispatch(setLoading());

		const state = getState();

		const org = state.rating.organization;
		const item = state.rating.ratingId;

	  return api.getSpecific(org, item)
		  .then((data) => {
			  dispatch(setRatingData(data));

		  });
	}
	
};

export default setData
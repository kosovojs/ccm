import { connect } from 'react-redux';
import RatingEdit from './component';
import {startSaving} from '../ratingPage/actions';
import setData from '../ratingPage/setData';
import { toast } from 'react-toastify';

import {setOrgOverview} from '../OrganizationProfile/container';

import api from '../api';

const mapStateToProps = (state) => ({
	capacity: state.rating.capacity,
	robustness: state.rating.robustness,
	irrelevant: state.rating.irrelevant,
	comment: state.rating.comment,
	organization: state.rating.organization,
	ratingId: state.rating.ratingId,
	isAuth: state.app.isAuth,
	shouldCheckLogin: state.app.shouldCheck,
	username: state.app.username
})

const mapDispatchToProps = (dispatch) => ({
	saveRating: (data) => {
		dispatch(handleSave(data));
	},
});

const handleSave = (data) => {
	return function(dispatch, getState) {
		dispatch(startSaving(true));

		const state = getState();

		const org = state.rating.organization;
		const item = state.rating.ratingId;

		
		return api.saveData(org, item, data)
			.then((data) => {
				dispatch(startSaving(false));

				
				if (data.status === 'ok') {
					toast.success('Saved data!');
					dispatch(setData());
				} else {
					toast.warn('Something went wrong!', {autoClose: 7500});
				}

				//todo: jāsalabo
				//dispatch(setOrgOverview(org));

			});
	}
	
}

export default connect(
	mapStateToProps, mapDispatchToProps
)(RatingEdit);
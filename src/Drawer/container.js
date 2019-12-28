import { connect } from 'react-redux';
import DescriptionTable from './component';

import {withRouter} from 'react-router-dom'

import { setRating} from '../ratingPage/actions';
import {setShowRating} from '../OrganizationProfile/actions';

import setData from '../ratingPage/setData';

const mapStateToProps = (state) => ({
	current: state.rating.ratingId,
	overview: state.organization.overview,
	overviewLoading: state.organization.overviewLoading,
	isOpen: state.organization.drawerOpen
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	handleClick: (id) => (event) => {
		dispatch(clickHandling(id, ownProps.match.params.org));
	}
});

const clickHandling = (rating, org) => {
	return function(dispatch, getState) {
		const state = getState();

		const isRatingShowing = state.organization.showRating;

		if (!isRatingShowing) {
			dispatch(setShowRating());
		}
		
		dispatch(setRating({
			org,
			rating
		}));

		dispatch(setData());
	}
	
}

export default withRouter(connect(
	mapStateToProps, mapDispatchToProps
)(DescriptionTable));
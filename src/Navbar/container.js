import { connect } from 'react-redux';
import DescriptionTable from './component';

import {withRouter} from 'react-router-dom';

import { setRating} from '../ratingPage/actions';
import {setShowRating, toggleDrawer} from '../OrganizationProfile/actions';

import setData from '../ratingPage/setData';

const mapStateToProps = (state) => ({
	drawerOpen: state.organization.drawerOpen,
	isAuth: state.app.isAuth,
	username: state.app.username
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	handleClick: (id) => (event) => {
		dispatch(clickHandling(id, ownProps.match.params.org));
	},
	handleDrawerToggle: () => {
		dispatch(toggleDrawer());
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

export default connect(
	mapStateToProps, mapDispatchToProps
)(DescriptionTable);
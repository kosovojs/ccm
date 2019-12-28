import { connect } from 'react-redux';
import Description from './component';

import {setOrganizationData, setLoading, setError, setOrgOverviewLoading, setOverview} from './actions';
import {setOpenDialogOrg,setDialogDataOrg } from '../OrgEditDialog/actions';
import {setRating} from '../ratingPage/actions';
import setData from '../ratingPage/setData';

import {withRouter} from 'react-router-dom'

import api from '../api';

const mapStateToProps = (state, ownProps) => ({
	organization: ownProps.match.params.org,
	title: state.organization.title,
	loading: state.organization.dataLoading,
	error: state.organization.error,
	showRating: state.organization.showRating,
	dialogOpen: state.dialogOrg.open,
	ratingLoading: state.rating.dataLoading
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	handleSetOrganization: () => {
		dispatch(setOrg(ownProps.match.params.org));
		dispatch(setOrgOverview(ownProps.match.params.org));
	},
	handleOpenOrgEditing: () => {
		dispatch(setOpenDialogOrg(true));
		dispatch(setDialogDataOrg(ownProps.match.params.org));
	},

	
/*
	handleDataSet: () => {
		
		dispatch(setRating({
			org: ownProps.match.params.org,
			rating: ownProps.match.params.item
		}));
		dispatch(setData());
	},
	*/
});

const setOrgOverview = (orgId) => {
	return function(dispatch) {
		dispatch(setLoading());
		
	  return  api.getOrganization(orgId)
		  .then((data) => {
			  if (data.status === 'ok') {
				dispatch(setOrganizationData(data.data));
				dispatch(setRating({org:orgId, rating:1}));//fixme: unhardcode rating:'1'
				dispatch(setData());
			  } else {
				dispatch(setError('No such organization'));
			  }
		  });
	}

}

const setOrg = (orgId) => {
	return function(dispatch, getState) {
		const state = getState();

		const hasError = state.organization.error;

		if (hasError) {
			return;
		}
		
		dispatch(setOrgOverviewLoading());
		
	  return  api.orgOverview(orgId)
		  .then((data) => {
				dispatch(setOverview(data));
		  });
	}
	
};

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(Description));

export {setOrgOverview};
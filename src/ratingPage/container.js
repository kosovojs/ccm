import { connect } from 'react-redux';
import Description from './component';

import {setRatingData, setRating, setLoading} from './actions';

import setData from './setData';


import {withRouter} from 'react-router-dom'

const mapStateToProps = (state) => ({
	title: state.rating.title,
	category: state.rating.category,
	loading: state.rating.dataLoading
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	handleDataSet: () => {
		
		dispatch(setRating({
			org: ownProps.match.params.org,
			rating: ownProps.match.params.item
		}));
		dispatch(setData());
	},
});


export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(Description));
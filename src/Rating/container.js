import { connect } from 'react-redux';
import Description from './component';

const mapStateToProps = (state) => ({
	title: state.rating.title,
	category: state.rating.category,
	loading: state.rating.dataLoading,
	//org: state.rating.organization,
	//item: state.rating.ratingId
})

export default connect(
	mapStateToProps
)(Description);
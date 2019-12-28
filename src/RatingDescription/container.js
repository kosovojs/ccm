import { connect } from 'react-redux';
import Description from './component';

const mapStateToProps = (state) => ({
	desc: state.rating.descriptions.description,
	relevantTo: state.rating.descriptions.relevantTo,
	examples: state.rating.descriptions.examples,
	resources: state.rating.descriptions.resources
})

export default connect(
	mapStateToProps
)(Description);
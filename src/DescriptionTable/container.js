import { connect } from 'react-redux';
import DescriptionTable from './component';

const mapStateToProps = (state) => ({
	capacity: state.rating.descriptions.capacity,
	robustness: state.rating.descriptions.robustness
})

export default connect(
	mapStateToProps
)(DescriptionTable);
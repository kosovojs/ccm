import { connect } from 'react-redux';
import HistoryTable from './component';

const mapStateToProps = (state) => ({
	data: state.rating.history
})

export default connect(
	mapStateToProps
)(HistoryTable);
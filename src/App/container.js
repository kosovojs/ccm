import { connect } from 'react-redux';
import App from './component';
import { checkAuth } from './actions';

const mapDispatchToProps = (dispatch) => ({
	initialLoad: () => {
		dispatch(checkAuth());
	},
});

export default connect(
	null,
	mapDispatchToProps
)(App);
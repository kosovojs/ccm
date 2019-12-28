import { connect } from 'react-redux';
import Description from './component';

import {withRouter} from 'react-router-dom'

const mapStateToProps = (state, ownProps) => ({
	organization: ownProps.match.params.org,
	isAuth: state.app.isAuth,
	shouldCheckLogin: state.app.shouldCheck,
	username: state.app.username
})

export default withRouter(connect(
	mapStateToProps
)(Description));
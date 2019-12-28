import { connect } from 'react-redux';
import { setOpenDialogOrg } from './actions';
import DialogWindow from './dialog';

const mapStateToProps = (state) => ({
	open: state.dialogOrg.open,
	id: state.dialogOrg.id
})

const mapDispatchToProps = (dispatch) => ({
	handleClose: () => dispatch(setOpenDialogOrg(false))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DialogWindow);
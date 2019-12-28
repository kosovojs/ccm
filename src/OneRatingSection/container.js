import { connect } from 'react-redux';
import { setOpenDialog } from './actions';
import DialogWindow from './dialog';

const mapStateToProps = (state) => ({
	open: state.dialog.open,
	data: state.dialog.data
})

const mapDispatchToProps = (dispatch) => ({
	handleClose: () => dispatch(setOpenDialog(false))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DialogWindow);
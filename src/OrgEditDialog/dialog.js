import React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import OrganizationEdit from '../OrganizationEdit/container';

function SimpleDialog(props) {
	const { handleClose, id, open } = props;

	const onClose = () => {
		handleClose();
	};
	
	return (
		<Dialog
			fullWidth={true}
			maxWidth={'md'}
			onClose={onClose}
			aria-labelledby="simple-dialog-title"
			open={open}
		>
			<DialogTitle id="simple-dialog-title">Edit organization data</DialogTitle>
			<div style={{padding:10}}>
			<OrganizationEdit organization={id} />
			</div>
		</Dialog>
	);
}

SimpleDialog.propTypes = {
	handleClose: PropTypes.func,
	open: PropTypes.bool
};

export default SimpleDialog;
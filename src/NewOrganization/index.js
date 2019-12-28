import React, { Component } from 'react';
import OrganizationEdit from '../OrganizationEdit/container';
import Navbar from '../Navbar/container';

import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	descriptionPart: {
		maxWidth: '66%',
	},
	content: {
		padding: theme.spacing(9),
	},
});

const OrganizationProfile = (props) => {
	const { classes, match: {params: org} } = props;
	return (<>
		<Navbar drawer={false} />
		
		<main className={classes.content}>
		<Typography variant="h5" gutterBottom>Fill the form to add a new organization</Typography>
		<OrganizationEdit organization={null} />
				</main>
	</>)
}

export default withStyles(styles)(OrganizationProfile);
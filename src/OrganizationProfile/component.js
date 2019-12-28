import React, { Component } from 'react';

import { withStyles, makeStyles } from '@material-ui/core/styles';


import Typography from '@material-ui/core/Typography';

import Navbar from '../Navbar/container';

import OrganizationEdit from '../OrganizationEdit/container';

import Drawer from '../Drawer/container';

import Rating from '../Rating/container';

import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import OrgEditDialog from '../OrgEditDialog/container';

import {DRAWER_WIDTH} from '../config';
const drawerWidth = DRAWER_WIDTH;

const styles = theme => ({
	mainPanel: {
		display: 'flex',
	},
	descriptionPart: {
		maxWidth: '66%',
	},
	ratingForm: {
		marginLeft: '25px'
		//maxWidth: '25%'
	},
	table: {
		//maxWidth: 300
	},
	button: {
		padding: '6px 16px',
		//margin: theme.spacing(1),
	},

	root: {
		display: 'flex',
	},
	appBar: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	toolbar: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing(3),
	},
});

class OrganizationProfile extends Component {
	componentDidMount() {
		this.props.handleSetOrganization();
	}

	componentDidUpdate(prevProps) {
		if (['org'].some(x => this.props.match.params[x] !== prevProps.match.params[x])) {
			this.props.handleSetOrganization();
		}
	}

	handleEditClick = () => {
		this.props.handleOpenOrgEditing();
	}

	render() {
		const { classes, title, loading, error, showRating, dialogOpen, ratingLoading } = this.props;

		return (
			<div className={classes.root}>
				<CssBaseline />
				<Navbar drawer={true} />

				<Drawer />
				
				
				<main className={classes.content}>
					<div className={classes.toolbar} />
					{error ? <>{error}</> : <>{loading ? "Loading" : <div>
						<Typography variant="h5" gutterBottom>{title} <span style={{cursor:'pointer',fontSize:'90%'}} onClick={this.handleEditClick}>(edit)</span></Typography>
					</div>}</>}
					<br />
					{ratingLoading ? "" : <Rating />}
					{/*showRating ? <Rating /> : "Choose one of ratings in sidebar!"*/}
					{dialogOpen && <OrgEditDialog />}

					
				</main>
			</div>
		);
	}
}
//

export default withStyles(styles)(OrganizationProfile);
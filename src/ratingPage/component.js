import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

import Rating from "../Rating/container";

import Navbar from '../Navbar/container';

import Drawer from '../Drawer/container';

import CssBaseline from '@material-ui/core/CssBaseline';

import {DRAWER_WIDTH} from '../config';
const drawerWidth = DRAWER_WIDTH;

const styles = theme => ({
	mainPanel: {
		display: 'flex',
		flexDirection: 'row',
		[theme.breakpoints.down('md')]: {
			flexDirection: 'column-reverse',
		  },
	},
	descriptionPart: {
		maxWidth: '75%',
	},
	ratingForm: {
		marginLeft: '25px',
		
		[theme.breakpoints.down('md')]: {
			maxWidth: '75%',
			marginLeft: 0,
		  },
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

class Rating2 extends Component {
	componentDidMount() {
		this.props.handleDataSet();
	}

	componentDidUpdate(prevProps) {
		if (['org','item'].some(x => this.props.match.params[x] !== prevProps.match.params[x])) {
			this.props.handleDataSet();
		}
	}

	render() {
		const {classes} = this.props;
		return (
			<>
			<div className={classes.root}>
				<CssBaseline />
				<Navbar drawer={false} />

				<main className={classes.content}>
					<div className={classes.toolbar} />
				<Rating /></main>

</div>
			</>
		);
	}
}


export default withStyles(styles)(Rating2);
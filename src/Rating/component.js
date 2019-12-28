import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

import Description from "../RatingDescription/container";
import DescriptionTable from '../DescriptionTable/container';
import RatingHistory from '../RatingHistory/container';
import RatingEdit from '../RatingEdit/container';

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
	/*
	componentDidMount() {
		this.props.handleLoad();
	}

	componentDidUpdate(prevProps) {
		if (['org','item'].some(x => this.props[x] !== prevProps[x])) {
			this.props.handleLoad();
		}
	}
	*/
	render() {
		const { classes, title, category, loading } = this.props;
		if (title == "" || !title) {
			return "";
		}

		return (

			<>{loading ? "Loading" : <div className="container">
				<Typography variant="h5" gutterBottom>{title} <small>({category})</small></Typography>
				<div className={classes.mainPanel}>
					<Description />
					<div className={classes.ratingForm}>
						<RatingEdit />
					</div>
				</div>
				<DescriptionTable />
				<RatingHistory />
			</div>}</>
		);
	}
}


export default withStyles(styles)(Rating2);
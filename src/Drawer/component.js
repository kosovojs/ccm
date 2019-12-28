import React, { Fragment } from 'react';

import { DRAWER_WIDTH } from '../config';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Hidden from '@material-ui/core/Hidden';
import Clear from '@material-ui/icons/Clear';
import Block from '@material-ui/icons/Block';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowForward from '@material-ui/icons/ArrowForward';
import RemoveCircleOutline from '@material-ui/icons/RemoveCircleOutline';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

import useMediaQuery from '@material-ui/core/useMediaQuery';

const styles = theme => ({
	drawer: {
		width: `${DRAWER_WIDTH}px`,
		maxWidth: `${DRAWER_WIDTH}px`,
		flexShrink: 0,
	},
	drawerPaper: {
		width: `${DRAWER_WIDTH}px`,
		maxWidth: `${DRAWER_WIDTH}px`,
	},
	toolbar: theme.mixins.toolbar,

	itemLeaf: {
		letterSpacing: 0,
		justifyContent: 'flex-start',
		textTransform: 'none',
		width: '100%',
		fontWeight: theme.typography.fontWeightRegular,
		'&.depth-0': {
			fontWeight: theme.typography.fontWeightMedium,
		},
	},

	active: {
		color: theme.palette.primary.main,
		fontWeight: theme.typography.fontWeightMedium,
	},
});

const style = {
	paddingTop: 2,
	paddingBottom: 2,
	paddingLeft: 8 * (3 + 2 * 1)
};

const activeStyle = {
	paddingTop: 2,
	paddingBottom: 2,
	paddingLeft: 8 * (3 + 2 * 1),
	color: '#1976d2',
	fontWeight: 500
}

const itemStyle = {
	paddingTop: 2,
	paddingBottom: 2,
};

const ratingIcon = (capacity, robustness, irrelevant) => {

	if ([capacity, robustness, irrelevant].every(x => x === null)) {
		return <Tooltip title={`Haven't been rated yet`} enterDelay={200} leaveDelay={200}><Clear /></Tooltip>;
	}

	if (irrelevant) {
		return <Tooltip title={`Not relevant for this organization`} enterDelay={200} leaveDelay={200}><Block /></Tooltip>;
	}

	if (capacity === 1) {
		return <Tooltip title={`None capacity`} enterDelay={200} leaveDelay={200}><RemoveCircleOutline /></Tooltip>;
	}

	if (capacity === 2) {
		return <Tooltip title={`Low capacity`} enterDelay={200} leaveDelay={200}><ArrowDownward /></Tooltip>;
	}

	if (capacity === 3) {
		return <Tooltip title={`Medium capacity`} enterDelay={200} leaveDelay={200}><ArrowForward /></Tooltip>;
	}

	if (capacity === 4) {
		return <Tooltip title={`High capacity`} enterDelay={200} leaveDelay={200}><ArrowUpward /></Tooltip>;
	}
	/*
	
	1: 'none',
	2: 'low',
	3: 'medium',
	4: 'high'
	*/
}

const oneSection = (category, data, classes, clickHandler, current) => {
	return <><Divider />
		<List>
			<ListItem button key={category} className={classes.itemLeaf} style={itemStyle}>
				<ListItemText primary={category} />
			</ListItem>

			{data.map((item, index) => (
				<ListItem button onClick={clickHandler(item.item)} key={item.title} style={item.item == current ? activeStyle : style}>
					<ListItemIcon>{ratingIcon(item.capacity, item.robustness, item.irrelevant)}</ListItemIcon>
					<ListItemText primary={item.title} />
				</ListItem>
			))}
		</List></>
}


const DescriptionTable = (props) => {
	const { classes, handleClick, current, overviewLoading, overview, isOpen, theme } = props;

	const desktop = useMediaQuery(theme.breakpoints.up('md'));
	//console.log(desktop,isOpen || desktop, theme.breakpoints);

	const shouldShowDrawer = desktop ? true : (isOpen == false ?  false : isOpen || desktop);
	//isOpen == false ?  false : isOpen || desktop;

	return (<>{shouldShowDrawer && <div
		style={{ maxWidth: DRAWER_WIDTH }}>

			<Drawer
				className={classes.drawer}
				variant="permanent"
				classes={{
					paper: classes.drawerPaper,
				}}
				anchor="left"
			>
				<div className={classes.toolbar} />
				{overviewLoading ? "Loading" : Object.keys(overview).map(category => <Fragment key={category}>
					{oneSection(category, overview[category], classes, handleClick, current)}
				</Fragment>)}
			</Drawer>
	</div>}</>
	)
}
//<Hidden smDown>

export default withStyles(styles, { withTheme: true })(DescriptionTable);
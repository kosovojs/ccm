import React, { Fragment, Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import Link from '@material-ui/core/Link';

import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';


import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';


import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';

import { DRAWER_WIDTH, API_URL_ACTIONS } from '../config';
const drawerWidth = DRAWER_WIDTH;

const styles = theme => ({
	appBar: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		//display: 'flex',
		//flexDirection: 'row',
		//justifyContent: 'space-between',
	},

	root: {
		//flexGrow: 1,
		display: 'flex',
		backgroundColor: theme.palette.background.level1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},

	toolbar: {
		flexWrap: 'wrap',
	},

	grow: {
		flexGrow: 1,
	},
	toolbarTitle: {
		flexGrow: 1,
		margin: theme.spacing(1, 1.5),
		fontSize: '150%'
	},
	userGreet: {
		flexGrow: 1,
		margin: theme.spacing(1, 1.5),
		fontSize: '120%',
		paddingTop: '7px'
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},

	navIconHide: {
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'flex',
		},
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('sm')]: {
			display: 'none',
		}
	},

});



//https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/page-layout-examples/pricing/Pricing.js

const DescriptionTable = (props) => {
	const { classes, drawer, drawerOpen, theme,isAuth, username } = props;

	const mobileMenuId = 'primary-search-account-menu-mobile';

	const desktop = useMediaQuery(theme.breakpoints.up('md'));

	const isDrawerOpen = drawer == false ? false : (desktop ? true : (drawerOpen == false ? false : drawerOpen || desktop));
	//drawer ? true : (desktop ? true : (drawerOpen == false ?  false : drawerOpen || desktop));

	const appbarClasses = isDrawerOpen ? classes.appBar : '';


	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	function handleProfileMenuOpen(event) {
		setAnchorEl(event.currentTarget);
	}

	function handleMobileMenuClose() {
		setMobileMoreAnchorEl(null);
	}

	function handleMenuClose() {
		setAnchorEl(null);
		handleMobileMenuClose();
	}

	function handleMobileMenuOpen(event) {
		setMobileMoreAnchorEl(event.currentTarget);
	}


	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem onClick={() => window.open("#/new_organization")}>
				<p>Add new organization</p>
			</MenuItem>
			<MenuItem onClick={() => window.open(`${API_URL_ACTIONS}action=authorize`)}>
				<p>Login</p>
			</MenuItem>
		</Menu>
	);


	return (
		<div className={classes.root}>

			<AppBar position="fixed" className={appbarClasses}>
				<Toolbar className={classes.toolbar}>
					{drawer == false ? '' :
						<IconButton
							color="inherit"
							aria-label="Open drawer"
							onClick={() => props.handleDrawerToggle()}
							className={classes.navIconHide}
						>
							<MenuIcon />
						</IconButton>}



					<Link variant="button" color="inherit" href="#" className={classes.toolbarTitle}>CCM</Link>




					<div className={classes.grow} />
					<div className={classes.sectionDesktop}>
						<Button href="#/new_organization" color="inherit" variant="outlined" className={classes.link}>Add new organization</Button>
						{isAuth ? <>
						<Typography className={classes.userGreet}>Hi, {username}!</Typography>
						<Button href={`${API_URL_ACTIONS}action=logout`} color="inherit" variant="outlined" className={classes.link}>Logout</Button>
						</>
						:
						<Button href={`${API_URL_ACTIONS}action=authorize`} color="inherit" variant="outlined" className={classes.link}>Login</Button>
						}
					</div>
					<div className={classes.sectionMobile}>
						<IconButton
							aria-label="show more"
							aria-controls={mobileMenuId}
							aria-haspopup="true"
							onClick={handleMobileMenuOpen}
							color="inherit"
						>
							<MoreIcon />
						</IconButton>
					</div>



				</Toolbar>
			</AppBar>
			{renderMobileMenu}
		</div>
	)
}

export default withStyles(styles, { withTheme: true })(DescriptionTable);

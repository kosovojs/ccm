import React, { Component } from 'react';
import { toast } from 'react-toastify';
//import { Select, Label, Checkbox } from "./FormElements";
import Description from "./Description";
import History from "./History";

import Typography from '@material-ui/core/Typography';

import Desc from '@material-ui/icons/Description';

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';

import TextField from '@material-ui/core/TextField';

import Tooltip from '@material-ui/core/Tooltip';


import CssBaseline from '@material-ui/core/CssBaseline';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


import Button from '@material-ui/core/Button';


import SaveIcon from '@material-ui/icons/Save';
import UserGroups from '@material-ui/icons/SupervisedUserCircle';


import MaterialTable from "material-table";
import { tableIcons } from '../TableIcons';



import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';


import { withStyles } from '@material-ui/core/styles';


import { makeStyles, useTheme } from '@material-ui/core/styles';



import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


import AppDrawerNavItem from './AppDrawerNavItem';

import api from '../api';



const drawerWidth = 240;


const capacities = {
	0: 'N/A',
	1: 'none',
	2: 'low',
	3: 'medium',
	4: 'high'
};

const robustnesses = {
	0: 'N/A',
	1: 'none',
	2: 'low',
	3: 'medium',
	4: 'high'
};

const styles = {
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
};

class Rating2 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			initialData: {},
			itemId: 0,//should be ok
			textPlaceholders: {},
			capacity: null,
			robustness: null,
			dataHistory: [],
			irrelevant: false,
			nextMode: 'next',
			toSaveData: {},
			loadingData: true,
			errorOnLoad: false
		};
		this.saveToDB = this.saveToDB.bind(this);
		this.handleSkip = this.handleSkip.bind(this);
	}

	handleChange(key, event) {
		const value = event.target.type === 'checkbox' ? event.target.checked : parseInt(event.target.value);

		var toSaveData = { ...this.state.toSaveData };
		toSaveData[key] = value;
		//key - parametra nosaukums
		//event.value - input/textarea lauka vērtība

		this.setState({ toSaveData });
		//console.log(this.state[key]);

		/////////////////issue data
		this.setState({ [key]: value });
	}

	handleTextChange(key, event) {
		const value = event.target.value;

		var toSaveData = { ...this.state.toSaveData };
		toSaveData[key] = value;
		//key - parametra nosaukums
		//event.value - input/textarea lauka vērtība

		this.setState({ toSaveData });
		//console.log(this.state[key]);

		/////////////////issue data
		this.setState({ [key]: value });
	}

	handleSkip() {
		this.setup();
	}

	setup() {
		console.log('set', this.state.organizationId, this.state.itemId);
		//api.getItem(this.state.organizationId,'next')
		//  .then((response) => this.setStating(response));

		//fetch(`//localhost/ccmB/public//item/next/${this.state.organizationId}/next`)

		//api.getItem(this.state.organizationId,'next')
		//api.getItem(this.state.itemId,this.state.organizationId,'next','unrated')
		//(org, curr, mode, mode2)
		//curId - org - next - unrated
		//api.getItem(this.state.organizationId,this.state.itemId,'next','unrated')

		if (this.state.organizationId === undefined || this.state.itemId === undefined) {
			console.log('there');
			this.setState({
				errorOnLoad: true,
				loadingData: false,
				toSaveData: {},
				dataHistory: [],
				textPlaceholders: {},
				capacity: 0,
				robustness: 0,
				irrelevant: 0,
				comment: '',
				initialData: {
					capacity: 0,
					robustness: 0,
					irrelevant: 0,
					comment: ''
				}
			});

			return;
		}

		//const data = { "desc": { "status": "ok", "data": { "id": 1, "title": "Social Media", "category": "Communications and media relations", "description": "How well does this group\/community use social media? Does it use it only reactively (when others mention Wikimedia or external events happen) or only proactively (posting of our own initiative, announcing things we do, spreading awareness), or both? Does it use social media strategically? ", "relevant": "user groups, whole wikis, organizations", "desc_none": " \tthe group has no social media accounts, or has accounts that are completely dormant\/inactive. ", "desc_low": " \tthe group has some social media accounts, and occasionally posts or responds on the accounts, as time\/inclination permits. There is no schedule or plan in advance. Analytics are not regularly tracked. ", "desc_med": "the group has social media accounts, and regularly uses them both proactively and reactively. There is no communication plan from which communication is derived. Analytics are sometimes tracked. ", "desc_high": "the group has social media accounts, regularly uses them both proactively and reactively, according to a strategic communications plan. Analytics are regularly tracked, and inform the communication strategy. ", "examples": "    A user group that has social media accounts it occasionally uses to announce events would be said to have low capacity.", "resources": "    Social media and its subpages on Meta", "archived": null } }, "rating": { "status": "ok", "data": { "capacity": 2, "robustness": 3, "irrelevant": false, "id": 1 } }, "history": { "status": "ok", "data": [{ "capacity": 3, "robustness": 2, "irrelevant": null, "user": "Test user", "add_time": "2018-12-28 23:20:56" }, { "capacity": 4, "robustness": null, "irrelevant": null, "user": "Test user", "add_time": "2018-12-28 23:21:38" }, { "capacity": 1, "robustness": null, "irrelevant": null, "user": "Test user", "add_time": "2018-12-28 23:21:43" }, { "capacity": 4, "robustness": null, "irrelevant": null, "user": "Test user", "add_time": "2018-12-28 23:21:46" }, { "capacity": 1, "robustness": null, "irrelevant": null, "user": "Test user", "add_time": "2019-07-11 15:22:02" }, { "capacity": null, "robustness": null, "irrelevant": 1, "user": "Test user", "add_time": "2019-07-11 15:29:35" }, { "capacity": null, "robustness": null, "irrelevant": null, "user": "Test user", "add_time": "2019-07-11 16:03:49" }, { "capacity": 2, "robustness": 3, "irrelevant": null, "user": "Test user", "add_time": "2019-07-12 19:43:58" }] } };

		/*
		let cap;
		let robust;
		let irrel;
		let itemId;

		if (data.desc.status === 'error') {
			console.log('itemId');
			itemId = 0;
		}

		//debugger;
		if (data.rating.status === 'ok') {
			console.log('iiiiii', data.desc.data.id);
			itemId = data.desc.data.id;
			cap = data.rating.data.capacity === null ? 0 : data.rating.data.capacity;
			robust = data.rating.data.robustness === null ? 0 : data.rating.data.robustness;
			irrel = data.rating.data.irrelevant === null ? false : data.rating.data.irrelevant;
		} else {
			itemId = typeof data.desc.data !== 'undefined' ? data.desc.data.id : 0;
			cap = 0;
			robust = 0;
			irrel = false;
			console.log(data.desc);
		}

		const dataHist = data.history.status === 'ok' ? data.history.data : [];

		this.setState({
			loadingData: false,
			itemId: itemId,
			toSaveData: {},
			dataHistory: dataHist,
			textPlaceholders: data.desc.data ? data.desc.data : {},
			capacity: cap,
			robustness: robust,
			irrelevant: irrel,
			initialData: {
				capacity: cap,
				robustness: robust,
				irrelevant: irrel
			}
		});
		*/



		api.getSpecific(this.state.organizationId, this.state.itemId)
			.then((data) => {
				let cap;
				let robust;
				let irrel;
				let itemId;

				if (data.desc.status === 'error') {
					console.log('itemId');
					itemId = 0;
				}

				//debugger;
				if (data.rating.status === 'ok') {
					console.log('iiiiii', data.desc.data.id);
					itemId = data.desc.data.id;
					cap = data.rating.data.capacity === null ? 0 : data.rating.data.capacity;
					robust = data.rating.data.robustness === null ? 0 : data.rating.data.robustness;
					irrel = data.rating.data.irrelevant === null ? false : data.rating.data.irrelevant;
				} else {
					itemId = typeof data.desc.data !== 'undefined' ? data.desc.data.id : 0;
					cap = 0;
					robust = 0;
					irrel = false;
					console.log(data.desc);
				}

				const dataHist = data.history.status === 'ok' ? data.history.data : [];

				this.setState({
					loadingData: false,
					itemId: itemId,
					toSaveData: {},
					dataHistory: dataHist,
					textPlaceholders: data.desc.data ? data.desc.data : {},
					capacity: cap,
					robustness: robust,
					irrelevant: irrel,
					comment: '',
					initialData: {
						capacity: cap,
						robustness: robust,
						irrelevant: irrel,
						comment: ''
					}
				});

			});



		//this.props.history.push({
		//	pathname: '/'+this.props.match.params.list+ (langValue ? '/'+langValue : '')
		//})

	}

	saveToDB(e) {
		e.preventDefault();
		//console.log(this.state);
		const _this = this;
		const { toSaveData, initialData, capacity, robustness } = this.state;

		if (Object.keys(toSaveData).length === 0) {
			toast.info('Data was not changed');
			console.log('nav ko saglabāt');
			return;
		}

		//console.log(toSaveData);
		// && (issueData.public === "")

		let reallyChanged = {};

		for (let key in toSaveData) {
			if (toSaveData[key] !== initialData[key]) {
				reallyChanged[key] = toSaveData[key];
			}
		}

		if (Object.keys(reallyChanged).length === 0) {
			toast.info('Data was not changed');
			return;
		}

		console.log('to save', reallyChanged);

		if (('irrelevant' in reallyChanged && reallyChanged['irrelevant'] === true) && ('capacity' in reallyChanged || 'robustness' in reallyChanged)) {
			console.log('here');
			reallyChanged = Object.assign({}, { irrelevant: reallyChanged.irrelevant });
		}
		console.log('here2', reallyChanged);

		if ('capacity' in reallyChanged || 'robustness' in reallyChanged) {
			const isInvalid = [capacity, robustness].some(x => x === 0);

			if (isInvalid && (capacity + robustness > 0)) {
				toast.info('Have to fill both capacity and robustness');//šis nav ok, ja abi ir N/A
				return;
			}
		}


		api.saveData(this.state.organizationId, this.state.itemId, reallyChanged)
			//api.getSpecific(this.state.organizationId,'1')
			.then((data) => {
				console.log(data);
				_this.setup();
				window.scrollTo(0, 0);
				toast.success('Saved data!');
			});

		//sending to db!
		//_this.setup();
	}

	componentDidMount() {
		//console.log(this.props);

		this.setState({ organizationId: this.props.match.params.org, itemId: this.props.match.params.item }, () => this.setup());//, () => this.setup()
		//this.setup();
		//this.setup();
	}

	componentDidUpdate(prevProps) {
		//:org/:item
		if (this.props.match.params.org !== prevProps.match.params.org || this.props.match.params.item !== prevProps.match.params.item) {
			console.log('this.props.match.params.item', this.props.match.params.item);
			this.setState({ organizationId: this.props.match.params.org, itemId: this.props.match.params.item }, () => this.setup());
		}
	}

	render() {
		const { textPlaceholders, dataHistory, irrelevant, loadingData, errorOnLoad, comment } = this.state;
		const disabledSelects = irrelevant ? true : false;

		const { classes } = this.props;

		return (
			<div className="container">
				<div className={classes.content}>
					{errorOnLoad ? <div>hei, nezināmi ID</div> : <div>
						{loadingData ? <div>Data is loading</div> : <div>
							{Object.keys(textPlaceholders).length > 0 ? <div>
								<Typography variant="h5" gutterBottom>{textPlaceholders.title} <small>({textPlaceholders.category})</small></Typography>

								<div className={classes.mainPanel}>
									<div className={classes.descriptionPart}>

										<Typography variant="h6" gutterBottom>Description</Typography>
										<Typography>
											<div className="desc"><Tooltip title="Description of this capacity" enterDelay={200} leaveDelay={200}><Desc /></Tooltip> {textPlaceholders.description}</div>
											<br />
											<div className="relevant"><Tooltip title="Who is this relevant to" enterDelay={200} leaveDelay={200}><UserGroups /></Tooltip> {textPlaceholders.relevant}</div>
										</Typography>
									</div>
									<div className={classes.ratingForm}>
										<Typography variant="h6" gutterBottom>Edit data</Typography>


										<FormGroup>
											<FormControlLabel
												control={<Switch
													checked={this.state.irrelevant}
													onChange={this.handleChange.bind(this, 'irrelevant')}
													value="irrelevant"
													inputProps={{ 'aria-label': 'secondary checkbox' }}
												/>}
												label="This isn't relevant for us"
											/>

											<FormControl>
												<InputLabel shrink htmlFor="capacity-label-placeholder">
													Your capacity
        </InputLabel>
												<Select
													disabled={disabledSelects}
													value={this.state.capacity}
													onChange={this.handleChange.bind(this, 'capacity')}
													input={<Input name="capacity" id="capacity-label-placeholder" />}
													displayEmpty
													name="capacity"
												>
													{Object.entries(capacities).map(stat => <MenuItem key={stat[0]} value={stat[0]}>{stat[1]}</MenuItem>)}
												</Select>
											</FormControl>
											<FormControl>
												<InputLabel shrink htmlFor="robustness-label-placeholder">
													Your robustness
        </InputLabel>
												<Select
													disabled={disabledSelects}
													value={this.state.robustness}
													onChange={this.handleChange.bind(this, 'robustness')}
													input={<Input name="robustness" id="robustness-label-placeholder" />}
													displayEmpty
													name="robustness"
												>
													{Object.entries(robustnesses).map(stat => <MenuItem key={stat[0]} value={stat[0]}>{stat[1]}</MenuItem>)}
												</Select>
											</FormControl>
										</FormGroup>

										<TextField
											id="filled-multiline-flexible"
											label="Comment"
											style={{ width: '100%' }}
											multiline={true}
											rows={4}
											type={'text'}
											value={this.state.comment}
											onChange={this.handleTextChange.bind(this, 'comment')}
											//className={classes.textField}
											margin="normal"
										/>

										<Button variant="contained" color="primary" onClick={this.saveToDB}>
											<SaveIcon />
											Save
      </Button>

									</div>
								</div>



								<Table className={classes.table}>
									<TableHead>
										<TableRow>
											<TableCell>Level</TableCell>
											<TableCell>Capacity description</TableCell>
											<TableCell>Robustness description</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										<TableRow>
											<TableCell component="th" scope="row">none</TableCell>
											<TableCell>{textPlaceholders.desc_none || ''}</TableCell>
											<TableCell>abc</TableCell>
										</TableRow>
										<TableRow>
											<TableCell component="th" scope="row">low</TableCell>
											<TableCell>{textPlaceholders.desc_low || ''}</TableCell>
											<TableCell>abc</TableCell>
										</TableRow>
										<TableRow>
											<TableCell component="th" scope="row">medium</TableCell>
											<TableCell>{textPlaceholders.desc_med || ''}</TableCell>
											<TableCell>abc</TableCell>
										</TableRow>
										<TableRow>
											<TableCell component="th" scope="row">high</TableCell>
											<TableCell>{textPlaceholders.desc_high || ''}</TableCell>
											<TableCell>abc</TableCell>
										</TableRow>
									</TableBody>
								</Table>
								{dataHistory.length > 0 ? <>


									<MaterialTable
										icons={tableIcons}
										title="Data history"

										columns={[
											{ title: "Edit time", field: "add_time" },
											{ title: "Capacity", field: "capacity", render: rowData => capacities[rowData.capacity] },
											{ title: "Robustness", field: "robustness", render: rowData => robustnesses[rowData.robustness] },
											{ title: "Irrelevant?", field: "irrelevant" },
											{ title: "User", field: "user" }
										]}
										data={dataHistory}
										options={{
											search: false,
											pageSizeOptions: [5, 10, 20],
											pageSize: dataHistory.length < 10 ? dataHistory.length : 10
										}}
									/>

								</> : ""}
							</div> : <div>No data to show</div>}
						</div>}</div>}</div>
			</div>
		);
	}
}


export default withStyles(styles)(Rating2);
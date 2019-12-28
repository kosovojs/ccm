import React, { Component } from 'react';

import { toast } from 'react-toastify';

import { withStyles } from '@material-ui/core/styles';

import isUrl from 'is-url';

import Typography from '@material-ui/core/Typography';

import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';

import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';


import { Redirect } from "react-router-dom";


import SaveIcon from '@material-ui/icons/Save';


import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import handleSave from './handleSave';

import api from '../api';


import { organizations } from '../config';

const styles = {
	table: {
		//maxWidth: 300
	}
};

class EditOrganization extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			link: '',
			type: null,
			comment: '',
			loading: false,
			toSaveData: {},
			data: {},
			newOrgID: null
		};
		this.saveToDB = this.saveToDB.bind(this);
		this.setData = this.setData.bind(this);
		this.sendToDB = this.sendToDB.bind(this);
	}

	setData() {
		this.setState({ newOrgID: null });

		const { organization } = this.props;

		if (organization) {
			this.setState({ loading: true });

			api.getOrganization(organization)
				.then((resp) => {
					const { data } = resp;
					this.setState({
						loading: false,
						title: data.name,
						link: data.link,
						type: data.org_type,
						comment: data.comment || '',
						data: {
							title: data.name,
							link: data.link,
							type: data.org_type,
							comment: data.comment || ''
						}
					})
				});
		}
	}

	sendToDB(changedData) {
		//todo: edit organization data
		const { organization } = this.props;

		api.saveOrganization(changedData)
			.then((data) => {
				if (data.status === 'ok') {
					toast.success('Saved data!');
					if ('orgId' in data) {
						this.setState({ newOrgID: data.orgId })
					}
				} else {
					toast.warn('Something went wrong!', {autoClose: 7500});
				}
			});

	}

	saveToDB(e) {
		const { title, link, type, comment, toSaveData, data } = this.state;
		const { organization, isAuth, shouldCheckLogin, username } = this.props;

		if (shouldCheckLogin && !isAuth) {
			toast.error('Please login to save data!',{autoClose: 10000});
			return;
		}

		if (link !== '' && !isUrl(link)) {
			toast.error('Please input valid URL link to your profile',{autoClose: 10000});
			return;
		}

		handleSave({
			title, link, type, comment, toSaveData, data, organization, username,
			callback: this.sendToDB
		});

	}

	componentDidMount() {
		this.setData()
	}

	componentDidUpdate(prevProps) {
		if (this.props.organization !== prevProps.organization) {
			this.setData();
		}
	}

	handleChange = (key) => (event) => {
		let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

		if (['type'].includes(key)) {
			value = parseInt(value)
		}

		const toSaveData = Object.assign(this.state.toSaveData, { [key]: value });

		this.setState({ toSaveData, [key]: value });
		/*
		var toSaveData = { ...toSaveData };
		toSaveData[key] = value;
		
		this.setState({ [key]: value, toSaveData: {
			...toSaveData,
			[key]: value
		} });
		*/
	}

	render() {
		const { title, link, type, comment, loading, newOrgID } = this.state;

		
		if (newOrgID) {
			return <Redirect to={`/organization/${newOrgID}`} />;
		}

		return (<>
			{loading ? "Data is loading" : <>
				<FormGroup>
					<TextField
						id="filled-multiline-flexible"
						label="Title"
						style={{ width: '100%' }}
						multiline={false}
						type={'text'}
						value={title || ''}
						onChange={this.handleChange('title')}
						//className={classes.textField}
						margin="normal"
					/>
					<FormControl>
						<InputLabel shrink htmlFor="capacity-label-placeholder">
							Organization type
	</InputLabel>
						<Select
							value={type}
							onChange={this.handleChange('type')}
							input={<Input name="type" id="orgType-label-placeholder" />}
							displayEmpty
							name="type"
						>
							{Object.entries(organizations).map(stat => <MenuItem key={stat[0]} value={stat[0]}>{stat[1]}</MenuItem>)}
						</Select>
					</FormControl>
					<TextField
						id="filled-multiline-flexible"
						label="Link to profile"
						style={{ width: '100%' }}
						multiline={false}
						type={'link'}
						value={link || ''}
						onChange={this.handleChange('link')}
						//className={classes.textField}
						margin="normal"
					/>
					<TextField
						id="filled-multiline-flexible"
						label="Comment"
						style={{ width: '100%' }}
						multiline={true}
						rows={4}
						type={'text'}
						value={comment || ''}
						onChange={this.handleChange('comment')}
						//className={classes.textField}
						margin="normal"
					/>
				</FormGroup>
				<Button variant="contained" color="primary" onClick={this.saveToDB}>
					<SaveIcon />
					Save
	  </Button></>}
		</>
		)
	}
}

export default withStyles(styles)(EditOrganization);
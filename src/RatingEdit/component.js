import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import { toast } from 'react-toastify';

import Typography from '@material-ui/core/Typography';

import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';

import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';


import SaveIcon from '@material-ui/icons/Save';


import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';


import handleRatingSave from './handleRatingSave';

import { capacities, robustnesses } from '../config';

const styles = {
	table: {
		//maxWidth: 300
	}
};

class RatingEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			capacity: null,
			robustness: null,
			irrelevant: false,
			comment: '',
			toSaveData: {},
			data: {}
		};
		this.saveToDB = this.saveToDB.bind(this);
	}

	setUp() {
		const {capacity, robustness, comment, irrelevant} = this.props;

		this.setState({
			capacity,
			robustness,
			irrelevant,
			comment,
			data: {
				capacity,
				robustness,
				irrelevant,
				comment
			}
		})
	}

	componentDidMount() {
		this.setUp();
	}

	componentDidUpdate(prevProps) {
		if (['organization','ratingId','capacity','robustness','comment','irrelevant'].some(x => this.props[x] !== prevProps[x])) {
			this.setUp();
		}
	}
	
	saveToDB(e) {
		const { toSaveData, data, capacity, robustness, comment, irrelevant } = this.state;
		const { isAuth, shouldCheckLogin, username} = this.props;
		
		if (shouldCheckLogin && !isAuth) {
			toast.error('Please login to save data!',{autoClose: 10000});
			return;
		}
		
		handleRatingSave({
			toSaveData, data, capacity, robustness, comment, irrelevant, username,
			callback: this.props.saveRating
		});
	}

	handleChange = (key) => (event) => {
		let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

		if (['capacity','robustness'].includes(key)) {
			value = parseInt(value)
		}
		
		const toSaveData = Object.assign(this.state.toSaveData,{[key]:value});
    
		this.setState({ toSaveData, [key]: value });
	}
	
	render() {
		const { irrelevant, capacity, robustness, comment } = this.state;
		const disabledSelects = irrelevant ? true : false;;

		return (<>
			<Typography variant="h6" gutterBottom>Edit data</Typography>
			<FormGroup>
				<FormControlLabel
					control={<Switch
						checked={irrelevant}
						onChange={this.handleChange('irrelevant')}
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
						value={capacity || ''}
						onChange={this.handleChange('capacity')}
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
						value={robustness || ''}
						onChange={this.handleChange('robustness')}
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
				value={comment || ''}
				onChange={this.handleChange('comment')}
				//className={classes.textField}
				margin="normal"
			/>

			<Button variant="contained" color="primary" onClick={this.saveToDB}>
				<SaveIcon />
				Save
      </Button>
		</>
		)
	}
}

export default withStyles(styles)(RatingEdit);
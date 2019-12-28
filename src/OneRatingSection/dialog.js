import React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { rating } from '../mainTable/oneCell';
import {capacities, robustnesses} from '../config';

const oneRating = (props) => {
	const { capacity, robustness, irrelevant, title } = props;
	//console.log(props);

	let ratingComponent = null;
	if (capacity === null && irrelevant === null) {
		ratingComponent = <span className="noRatingText">no valuation yet</span>;
	} else if (irrelevant !== null) {
		ratingComponent = <span className="irrelevantText">irrelevant</span>;//rating('-1', '');
	} else {
		ratingComponent = `capacity: ${capacities[capacity]}; robustness: ${robustnesses[robustness]}`;//<span>{rating(capacity, 'capacity')} | {rating(robustness, 'robustness')}</span>
	}
	/* 
		let linkComponent = null;
	
		if (org === undefined || item === undefined) {
			linkComponent = "";
		} else {
			linkComponent = <small>(<a href={`#/rating/${org}/${item}`} target="_blank">edit</a>)</small>;
		} */

	// {linkComponent}
	return <li><b>{title}</b>: {ratingComponent}</li>;
};

function SimpleDialog(props) {
	const { handleClose, data: { organization, section, data: dataObj }, open } = props;

	const onClose = () => {
		handleClose();
	};

	const handleListItemClick = (id) => {
		window.open(`#/rating/${organization.id}/${id}`);//, '_blank'
	};

	return (
		<Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
			<DialogTitle id="simple-dialog-title">{organization.title}: {section}</DialogTitle>
			<List>
				{dataObj.map((item, key) => {
					return <ListItem button onClick={() => handleListItemClick(item.item)} key={item.title}>
						{oneRating({
							...item
						})}
					</ListItem>
				})}
			</List>
		</Dialog>
	);
}

SimpleDialog.propTypes = {
	handleClose: PropTypes.func,
	open: PropTypes.bool,
	data: PropTypes.object
};

export default SimpleDialog;
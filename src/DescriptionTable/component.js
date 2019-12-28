import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { withStyles } from '@material-ui/core/styles';

const styles = {
	table: {
		//maxWidth: 300
	}
};

const robustness = {
	none: 'depends entirely on a single person (whether volunteer or staff), and there is no known person who could readily step in to fill it, if and when that single person becomes unavailable.',
	low: 'generally relies on a single person (whether volunteer or staff), but there is at least one other person who could fill that capacity if and when that single person becomes unavailable.',
	med: 'is regularly provided by more than person (whether volunteer or staff).',
	high: 'is regularly provided by more than person (whether volunteer or staff), and there are regular opportunities for new people to be trained/introduced to the capacity to ensure availability of additional people to fulfill the capacity. (e.g. mentorship, apprenticeship, training events/sessions specifically aimed at that capacity)',
}

const DescriptionTable = (props) => {
	const { classes, capacity } = props;
	return (
		<Table className={classes.table}>
			<TableHead>
				<TableRow>
					<TableCell>Level</TableCell>
					<TableCell>Capacity description</TableCell>
					<TableCell>Robustness description (the same for all items)</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				<TableRow>
					<TableCell component="th" scope="row">none</TableCell>
					<TableCell>{capacity.none || ''}</TableCell>
					<TableCell>{robustness.none || ''}</TableCell>
				</TableRow>
				<TableRow>
					<TableCell component="th" scope="row">low</TableCell>
					<TableCell>{capacity.low || ''}</TableCell>
					<TableCell>{robustness.low || ''}</TableCell>
				</TableRow>
				<TableRow>
					<TableCell component="th" scope="row">medium</TableCell>
					<TableCell>{capacity.med || ''}</TableCell>
					<TableCell>{robustness.med || ''}</TableCell>
				</TableRow>
				<TableRow>
					<TableCell component="th" scope="row">high</TableCell>
					<TableCell>{capacity.high || ''}</TableCell>
					<TableCell>{robustness.high || ''}</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	)
}

export default withStyles(styles)(DescriptionTable);
import React, { Component } from 'react';

import MaterialTable from "material-table";
import { tableIcons } from '../TableIcons';

import { withStyles } from '@material-ui/core/styles';


import { capacities, robustnesses } from '../config';

const styles = {
	table: {
		//maxWidth: 300
	}
};

const RatingHistory = (props) => {
	const {  data } = props;
	return (<>
	{data.length > 0 ? 
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
		data={data}
		options={{
			search: false,
			pageSizeOptions: [5, 10, 20],
			pageSize: data.length < 10 ? data.length : 10
		}}
	/> : ""}</>
	)
}

export default withStyles(styles)(RatingHistory);
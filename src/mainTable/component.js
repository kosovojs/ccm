import React, { Component } from 'react';
import ReactTable, { ReactTableDefaults } from "react-table";
import 'react-table/react-table.css';
import api from '../api';
import OneCell, { legend } from './oneCell';
import DialogWindow from '../OneRatingSection/container';
import Navbar from '../Navbar/container';
import './index.css';

import { withStyles } from '@material-ui/core/styles';

const orgTitle = (data) => {
	const { link, title, id } = data;
	let theLink;

	if (link !== undefined && link !== null) {
		theLink = <a href={link}>{title}</a>;
	} else {
		theLink = title;
	}

	return <span>{theLink} <small>(<a href={`#/organization/${id}`}>edit</a>)</small></span>
};

const columnDefaults = { ...ReactTableDefaults.column, headerClassName: 'wordwrap' }

const styles = theme => ({
	descriptionPart: {
		maxWidth: '66%',
	},
	content: {
		paddingTop: theme.spacing(9),
	},
});

class Table extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loadingData: true,
			loadingError: false,
			data: [],
		};
	}

	componentDidMount() {
		api.overview()
			.then((data) => {
				this.setState({ data, loadingData: false });//, () => this.setup()
			});

	}

	render() {
		const { data, loadingData } = this.state;
		const {dialogOpen, classes} = this.props;

		return <div className="container">
		<Navbar drawer={false} />
		<main className={classes.content}>
			{loadingData ? <div>Loading...</div> :
				<div>{data.length > 0 ? <div><ReactTable
					data={data}
					column={columnDefaults}
					columns={[
						{
							Header: "Organization",
							accessor: d => orgTitle(d.details),
							id: "title",
							style: { whiteSpace: 'normal' }
						},
						{
							Header: "Communications and media relations",
							id: "communication",
							accessor: d => (<span>{<OneCell organization={d.details} assementGroupName={'Communications and media relations'} assementGroupData={d.ratings['Communications and media relations']} />
							}</span>),
						},
						{
							Header: "Community Health",
							id: "comm_health",
							accessor: d => (<span>{<OneCell organization={d.details} assementGroupName={'Community Health'} assementGroupData={d.ratings['Community Health']} />
							}</span>),
						},
						{
							Header: "Community Governance",
							id: "comm_gov",
							accessor: d => (<span>{<OneCell organization={d.details} assementGroupName={'Community Governance'} assementGroupData={d.ratings['Community Governance']} />
							}</span>),
						},
						{
							Header: "Partnerships",
							id: "Partnerships",
							accessor: d => (<span>{<OneCell organization={d.details} assementGroupName={'Partnerships'} assementGroupData={d.ratings['Partnerships']} />
							}</span>),
						},
						{
							Header: "Technical skills",
							id: "Technical",
							accessor: d => (<span>{<OneCell organization={d.details} assementGroupName={'Technical skills'} assementGroupData={d.ratings['Technical skills']} />
							}</span>),
						},
						{
							Header: "Event production",
							id: "production",
							accessor: d => (<span>{<OneCell organization={d.details} assementGroupName={'Event production'} assementGroupData={d.ratings['Event production']} />
							}</span>),
						},
						{
							Header: "Fundraising",
							id: "Fundraising",
							accessor: d => (<span>{<OneCell organization={d.details} assementGroupName={'Fundraising'} assementGroupData={d.ratings['Fundraising']} />
							}</span>),
						},
						{
							Header: "Evaluation",
							id: "Evaluation",
							accessor: d => (<span>{<OneCell organization={d.details} assementGroupName={'Evaluation'} assementGroupData={d.ratings['Evaluation']} />
							}</span>),
						},
						{
							Header: "Human resources",
							id: "resources",
							accessor: d => (<span>{<OneCell organization={d.details} assementGroupName={'Human resources'} assementGroupData={d.ratings['Human resources']} />
							}</span>),
						},
						{
							Header: "Organizational governance",
							id: "governance",
							accessor: d => (<span>{<OneCell organization={d.details} assementGroupName={'Organizational governance'} assementGroupData={d.ratings['Organizational governance']} />
							}</span>),
						}
					]}
					sortable={false}
					defaultPageSize={data.length < 100 ? data.length : 100}
					defaultSorted={[
						{
							id: "title",
							desc: false
						}
					]}
					//showPagination={true}
					minRows={0}
					showPagination={false}
					className="-striped -highlight"
				/>
				</div> : <div>No data to show</div>}</div>}
				</main>
				{dialogOpen && <DialogWindow />}
		</div>
	}
}


export default withStyles(styles)(Table);

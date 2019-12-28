import React, {useState, Component} from 'react';
import { connect } from 'react-redux';
import {setOpenDialog, setDialogData} from '../OneRatingSection/actions';

export const rating = (data, type) => {
	let icon, title;
	if (data === '4') {
		icon = "glyphicon glyphicon-arrow-up";
		title = "high";
	} else if (data === '3') {
		icon = "glyphicon glyphicon-resize-horizontal";
		title = "medium";
	} else if (data === '2') {
		icon = "glyphicon glyphicon-arrow-down";
		title = "low";
	} else if (data === '1') {
		icon = "glyphicon glyphicon-ban-circle";
		title = "none";
	} else if (data === '-1') {
		icon = "glyphicon glyphicon-remove-circle";
		title = "N/A";
	}

	title = title + " " + type;

	return title;//<span className={icon} title={title} aria-hidden="true"></span>;
};

export const legend = () => (<ul>
	<li>{rating('-1', '')} N/A</li>
	<li>{rating('1', '')} none</li>
	<li>{rating('2', '')} low</li>
	<li>{rating('3', '')} medium</li>
	<li>{rating('4', '')} high</li>
</ul>);

const progress = ({percent, filled, sum}) => (
	<div
		style={{
			width: '100%',
			//height: '25px',
			backgroundColor: '#dadada',
			borderRadius: '2px'
		}}
	>
		<div
			style={{
				width: `${percent}%`,
				//height: '25px',
				backgroundColor: percent > 66 ? '#85cc00'
					: percent > 33 ? '#ffbf00'
						: '#ff2e00',
				borderRadius: '2px',
				transition: 'all .2s ease-out'
			}}
		>{filled}/{sum}</div>
</div>);

class OneCell extends Component {
	handleClick() {
		const {organization, assementGroupName,  assementGroupData } = this.props;
		
		this.props.handleClick({organization, section: assementGroupName,  data: assementGroupData});
	}
	render() {
		const { assementGroupData } = this.props;

		const isFilled = assementGroupData.filter(item => item.capacity !== null || item.irrelevant !== null);

		const howManyPercentFilled = (isFilled.length / assementGroupData.length) * 100;

		return <>
		<div onClick={() => this.handleClick()} style={{cursor: 'pointer'}}>
		{progress({percent: howManyPercentFilled, filled: isFilled.length, sum: assementGroupData.length})}
	<ul>{/*assementGroupData.map((item, key) => {
		return <div key={key}>{oneRating({
			...item,
			org: organization.id
		})}</div>
	})*/}</ul></div>
</>
	}
}



/* 
const mapStateToProps = (state) => ({
	//rows: getVisibleRows(state.table.rows, state.visibilityFilter),
	dialogOpen: state.dialog.open
})
 */
const mapDispatchToProps = (dispatch) => ({
	handleClick: (data) => {
		dispatch(setOpenDialog(true));
		dispatch(setDialogData(data));
	}
})

export default connect(
	null,
	mapDispatchToProps
)(OneCell);
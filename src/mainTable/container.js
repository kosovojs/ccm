import { connect } from 'react-redux';
import Table from './component';

const mapStateToProps = (state) => ({
	//rows: getVisibleRows(state.table.rows, state.visibilityFilter),
	dialogOpen: state.dialog.open
})

/* const mapDispatchToProps = (dispatch) => ({
	onDataLoad: () => dispatch(setTableData()),
	onRowUpdate: ({ newData, oldData }) => dispatch(updateRow({ newData, oldData })),
	onRowRemove: (oldData) => dispatch(removeRow(oldData)),

	setFilter: ({ key, filter }) => dispatch(setVisibilityFilter({ key, filter }))
}) */

export default connect(
	mapStateToProps,
	//mapDispatchToProps
)(Table);
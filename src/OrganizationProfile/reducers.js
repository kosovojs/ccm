import { SET_LOADING, SET_ORGANIZATION_DATA, SET_ERROR, SET_SHOW_RATING, SET_ORG_OVERVIEW_LOADING, SET_OVERVIEW, TOGGLE_DRAWER } from './actions';

const defaultState = {
	overviewLoading: false,
	dataLoading: false,
	title: '',
	error: null,
	organizationId: '',
	showRating: false,
	overview: {},
	drawerOpen: false
};
const organization = (state = defaultState, action) => {
  switch (action.type) {
	  
    case SET_LOADING: {
		return Object.assign({},state, {
			dataLoading: true
		});
	}

    case TOGGLE_DRAWER: {
		const currState = state.drawerOpen;

		return Object.assign({},state, {
			drawerOpen: !currState
		});
	}

	case SET_ORG_OVERVIEW_LOADING: {
		return Object.assign({},state, {
			overviewLoading: true
		});

	}

	case SET_OVERVIEW: {
		return Object.assign({},state, {
			overviewLoading: false,
			overview: action.data
		});

	}

    case SET_SHOW_RATING: {
		return Object.assign({},state, {
			showRating: true
		});
	}

    case SET_ERROR: {
		return Object.assign({},state, {
			error: action.msg
		});
	}

    case SET_ORGANIZATION_DATA: {
		const {data: {name, link, org_type}} = action;
		
		const newState = {
			...state,
			dataLoading: false,
			title: name,
			error: null,
			showRating: false
		};
		return Object.assign({},newState);
	}
    default:
      return state
  }
};

export default organization;
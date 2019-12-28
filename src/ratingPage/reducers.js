import { SET_RATING_DATA, SET_RATING, SET_LOADING_RATING, SET_SAVING } from './actions';

const defaultState = {
	dataLoading: false,
	dataSaving: false,
	loadingError: false,
	title: '',
	category: '',
	descriptions: {
		description: '',
		relevantTo: '',
		examples: '',
		resources: '',
		capacity: {
			none: '',
			low: '',
			med: '',
			high: '',
		},
		robustness: {
			none: '',
			low: '',
			med: '',
			high: '',
		}
	},
	history: [],
	capacity: null,
	robustness: null,
	irrelevant: false,
	comment: '',
	organization: '',
	ratingId: ''
};
const rating = (state = defaultState, action) => {
  switch (action.type) {
	  
    case SET_LOADING_RATING: {
		return Object.assign({},state, {
			dataLoading: true
		});
	}
    case SET_SAVING: {
		return Object.assign({},state, {
			dataSaving: action.newState
		});
	}
    case SET_RATING: {
		const {payload: {org, rating}} = action;
		
		return Object.assign({},state, {
			organization: org,
			ratingId: rating
		});
	}

    case SET_RATING_DATA: {
		const {data: {desc, rating, history}} = action;

		const historyData = history.data;
		const descData = desc.data;
		const ratingData = rating.data;
		
		const newState = {
			...state,
			dataLoading: false,
			title: descData.title,
			category: descData.category,
			descriptions: {
				description: descData.description,
				relevantTo: descData.relevant,
				examples: descData.examples,
				resources: descData.resources,
				capacity: {
					none: descData.desc_none,
					low: descData.desc_low,
					med: descData.desc_med,
					high: descData.desc_high,
				},
				robustness: {
					...state.descriptions.robustness
				}
			},
			history: historyData,
			capacity: ratingData.capacity,
			robustness: ratingData.robustness,
			irrelevant: ratingData.irrelevant,
			comment: ratingData.comment || ''
		};
		return Object.assign({},newState);
	}
    default:
      return state
  }
};

export default rating;
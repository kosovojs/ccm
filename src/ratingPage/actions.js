export const SET_RATING_DATA = "SET_RATING_DATA";

export const setRatingData = (data) => ({
	type: SET_RATING_DATA,
	data
});

export const SET_RATING = "SET_RATING";

export const setRating = ({org, rating}) => ({
	type: SET_RATING,
	payload: {
		org, rating
	}
});

export const SET_LOADING_RATING = "SET_LOADING_RATING";

export const setLoading = () => ({
	type: SET_LOADING_RATING
});

export const SET_SAVING = "SET_SAVING";

export const startSaving = (newState) => ({
	type: SET_SAVING,
	newState
});
export const SET_LOADING = "SET_LOADING";

export const setLoading = () => ({
	type: SET_LOADING
});

export const SET_ORGANIZATION_DATA = "SET_ORGANIZATION_DATA";

export const setOrganizationData = (data) => ({
	type: SET_ORGANIZATION_DATA,
	data
});

export const SET_ERROR = "SET_ERROR";

export const setError = (msg) => ({
	type: SET_ERROR,
	msg
});

export const SET_SHOW_RATING = "SET_SHOW_RATING";

export const setShowRating = () => ({
	type: SET_SHOW_RATING
});

export const SET_OVERVIEW = "SET_OVERVIEW";

export const setOverview = (data) => ({
	type: SET_OVERVIEW,
	data
});

export const SET_ORG_OVERVIEW_LOADING = "SET_ORG_OVERVIEW_LOADING";

export const setOrgOverviewLoading = () => ({
	type: SET_ORG_OVERVIEW_LOADING
});

export const TOGGLE_DRAWER = "TOGGLE_DRAWER";

export const toggleDrawer = () => ({
	type: TOGGLE_DRAWER
});
import { combineReducers } from 'redux';
import app from './App/reducers';
import rating from './ratingPage/reducers';
import organization from './OrganizationProfile/reducers';
import dialog from './OneRatingSection/reducers';
import dialogOrg from './OrgEditDialog/reducers';

export default combineReducers({
	app,
	rating,
	organization,
	dialog,
	dialogOrg
})

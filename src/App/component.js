import React, { useEffect } from "react";
import { Switch, Route, HashRouter } from 'react-router-dom';
import Table from '../mainTable/container';
import RatingPage from '../ratingPage/container';
import OrganizationProfile from '../OrganizationProfile/container';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NewOrganization from "../NewOrganization";

const App = (props) => {
	//https://stackoverflow.com/questions/38563679/react-redux-dispatch-action-on-app-load-init
  useEffect(() => props.initialLoad(), []);
	
	return <HashRouter>
	  <div>
		<Switch>
		  <Route exact path="/" component={Table} />
		  <Route exact path="/rating/:org/:item" component={RatingPage} />
		  <Route exact path="/new_organization" component={NewOrganization} />
		  <Route exact path="/organization/:org" component={OrganizationProfile} />
		</Switch>
		<ToastContainer
		position="bottom-right"
		autoClose={2500}
		hideProgressBar={false}
		newestOnTop={false}
		closeOnClick
		rtl={false}
		pauseOnVisibilityChange
		draggable={false}
		pauseOnHover
		/>
	  </div>
	</HashRouter>;
}

export default App;
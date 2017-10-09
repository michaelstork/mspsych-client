import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import Panel from '../../components/Panel/Panel';
import {NavLink} from 'react-router-dom'
import './Admin.css';

import Overview from './Overview/Overview';
import Users from './Users/Users';
import Spreadsheets from './Spreadsheets/Spreadsheets';
import Photos from './Photos/Photos';
import Documents from './Documents/Documents';

const Admin = ({match}) => (
	<div className="admin-panel-container">
		<nav className="admin-nav">
			<NavLink activeClassName="active-nav-item" to={match.url + '/overview'}>Evals Overview</NavLink>
			<NavLink activeClassName="active-nav-item" to={match.url + '/users'}>Users</NavLink>
			<NavLink activeClassName="active-nav-item" to={match.url + '/spreadsheets'}>Spreadsheets</NavLink>
			<NavLink activeClassName="active-nav-item" to={match.url + '/photos'}>Student Photos</NavLink>
			<NavLink activeClassName="active-nav-item" to={match.url + '/documents'}>Documents</NavLink>
		</nav>
		<Panel className="admin-panel">
			<Switch>
				<Route exact path={match.url + '/overview'} component={Overview} />
				<Route path={match.url + '/users'} component={Users} />
				<Route path={match.url + '/spreadsheets'} component={Spreadsheets} />
				<Route path={match.url + '/photos'} component={Photos} />
				<Route path={match.url + '/documents'} component={Documents} />
				<Redirect from={match.url} to={match.url + '/overview'} />
			</Switch>
		</Panel>
	</div>
)

export default Admin;
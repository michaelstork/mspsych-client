import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import Panel from '../../components/Panel/Panel';
import {NavLink} from 'react-router-dom'
import './Admin.css';

import Overview from './Overview/Overview';
import Users from './Users/Users';
import Spreadsheets from './Spreadsheets/Spreadsheets';
import Photos from './Photos/Photos';

const Admin = ({match}) => (
	<div className="admin-panel-container">
		<nav className="admin-nav">
			<NavLink activeClassName="active-nav-item" to={match.url + '/overview'}>Evals Overview</NavLink>
			<NavLink activeClassName="active-nav-item" to={match.url + '/users'}>User Management</NavLink>
			<NavLink activeClassName="active-nav-item" to={match.url + '/spreadsheets'}>Spreadsheets</NavLink>
			<NavLink activeClassName="active-nav-item" to={match.url + '/photos'}>Student Photos</NavLink>
		</nav>
		<Panel className="admin-panel with-items">
			<Switch>
				<Route exact path={match.url + '/overview'} component={Overview} />
				<Route path={match.url + '/users'} component={Users} />
				<Route path={match.url + '/spreadsheets'} component={Spreadsheets} />
				<Route path={match.url + '/photos'} component={Photos} />
				<Redirect from={match.url} to={match.url + '/overview'} />
			</Switch>
		</Panel>
	</div>
)

export default Admin;
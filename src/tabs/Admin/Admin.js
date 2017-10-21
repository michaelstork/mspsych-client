import React from 'react';
import {Route, Switch, Redirect, NavLink} from 'react-router-dom'
import Panel from '../../components/Panel/Panel';
import './Admin.css';

import Overview from './Overview/Overview';
import Users from './Users/Users';
import Assignments from './Assignments/Assignments';
import Students from './Students/Students';

const Admin = ({match}) => (
	<div className="admin-panel-container">
		<nav className="admin-nav">
			<NavLink activeClassName="active-nav-item"
				to={match.url + '/overview'}>
				Evals Overview
			</NavLink>
			<NavLink activeClassName="active-nav-item"
				to={match.url + '/assign-evals'}>
				Assign Evals
			</NavLink>
			<NavLink activeClassName="active-nav-item"
				to={match.url + '/users'}>
				User Management
			</NavLink>
			<NavLink activeClassName="active-nav-item"
				to={match.url + '/students'}>
				Students
			</NavLink>
		</nav>
		<Panel className="admin-panel with-items">
			<Switch>
				<Route exact 
					path={match.url + '/overview'}
					component={Overview} />
				<Route component={Users}
					path={match.url + '/users'} />
				<Route component={Assignments}
					path={match.url + '/assign-evals'} />
				<Route component={Students}
					path={match.url + '/students'} />
				<Redirect from={match.url}
					to={match.url + '/overview'} />
			</Switch>
		</Panel>
	</div>
)

export default Admin;
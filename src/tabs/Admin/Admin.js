import React from 'react';
import {Route, Switch, Redirect, NavLink} from 'react-router-dom'
import Panel from '../../components/Panel/Panel';
import './Admin.css';

import Overview from './Overview/Overview';
import Users from './Users/Users';
import Assignments from './Assignments/Assignments';
import Students from './Students/Students';

const Admin = (props) => (
	<div className="admin-panel-container">
		<nav className="admin-nav">
			<NavLink activeClassName="active-nav-item"
				to={props.match.url + '/overview'}>
				Evals Overview
			</NavLink>
			<NavLink activeClassName="active-nav-item"
				to={props.match.url + '/assign-evals'}>
				Assign Evals
			</NavLink>
			<NavLink activeClassName="active-nav-item"
				to={props.match.url + '/users'}>
				User Management
			</NavLink>
			<NavLink activeClassName="active-nav-item"
				to={props.match.url + '/students'}>
				Students
			</NavLink>
		</nav>
		<Panel className="admin-panel with-items">
			<Switch>
				<Route exact path={props.match.url + '/overview'}
					render={() =>
						<Overview notify={props.notify} />
					}
				/>
				<Route path={props.match.url + '/users'}
					render={() =>
						<Users notify={props.notify} />
					}
				/>
				<Route path={props.match.url + '/assign-evals'}
					render={() =>
						<Assignments notify={props.notify} />
					}
				/>
				<Route path={props.match.url + '/students'}
					render={() =>
						<Students notify={props.notify} />
					}
				/>
				<Redirect from={props.match.url}
					to={props.match.url + '/overview'} />
			</Switch>
		</Panel>
	</div>
)

export default Admin;
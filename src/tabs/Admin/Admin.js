import React from 'react';
import {Route, Switch, Redirect, NavLink} from 'react-router-dom'
import Panel from '../../components/Panel/Panel';
import './Admin.css';

import Outstanding from './Outstanding/Outstanding';
import Completed from './Completed/Completed';
import Users from './Users/Users';
import Assignments from './Assignments/Assignments';
import Students from './Students/Students';
import Reminder from './Reminder/Reminder';

const Admin = (props) => (
	<div className="admin-panel-container">
		<nav className="admin-nav">
			<NavLink activeClassName="active-nav-item"
				to={props.match.url + '/outstanding'}>
				Outstanding Evals
			</NavLink>
			<NavLink activeClassName="active-nav-item"
				to={props.match.url + '/completed'}>
				Completed Evals
			</NavLink>
			<NavLink activeClassName="active-nav-item"
				to={props.match.url + '/assign-evaluations'}>
				Assign Evaluations
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
				<Route exact path={props.match.url + '/outstanding'}
					render={() =>
						<Outstanding notify={props.notify} />
					}
				/>
				<Route exact path={props.match.url + '/completed'}
					render={() =>
						<Completed notify={props.notify} />
					}
				/>
				<Route path={props.match.url + '/users'}
					render={() =>
						<Users notify={props.notify} />
					}
				/>
				<Route path={props.match.url + '/assign-evaluations'}
					render={() =>
						<Assignments notify={props.notify} />
					}
				/>
				<Route path={props.match.url + '/students'}
					render={() =>
						<Students notify={props.notify} />
					}
				/>
				<Route path={props.match.url + '/reminder/:userId'}
					render={({match}) =>
						<Reminder notify={props.notify}
							userId={match.params.userId} />
					}
				/>
				<Redirect from={props.match.url}
					to={props.match.url + '/outstanding'} />
			</Switch>
		</Panel>
	</div>
)

export default Admin;
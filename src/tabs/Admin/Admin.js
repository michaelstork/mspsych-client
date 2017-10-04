import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import Panel from '../../components/Panel/Panel';
import {NavLink} from 'react-router-dom'
import './Admin.css';
import Overview from './content/Overview';
import Users from './content/Users';
import Spreadsheets from './content/Spreadsheets';
import Photos from './content/Photos';
import Documents from './content/Documents';
import News from './content/News';

const Admin = (props) => (
	<Panel>
		<nav>
			<NavLink activeClassName="active-nav-link" to={props.match.url + '/overview'}>Evals Overview</NavLink>
			<NavLink activeClassName="active-nav-link" to={props.match.url + '/users'}>Users</NavLink>
			<NavLink activeClassName="active-nav-link" to={props.match.url + '/spreadsheets'}>Spreadsheets</NavLink>
			<NavLink activeClassName="active-nav-link" to={props.match.url + '/photos'}>Student Photos</NavLink>
			<NavLink activeClassName="active-nav-link" to={props.match.url + '/documents'}>Documents</NavLink>
			<NavLink activeClassName="active-nav-link" to={props.match.url + '/news'}>News</NavLink>
		</nav>
		<Switch>
			<Route exact path={props.match.url + '/overview'} component={Overview} />
			<Route path={props.match.url + '/users'} component={Users} />
			<Route path={props.match.url + '/spreadsheets'} component={Spreadsheets} />
			<Route path={props.match.url + '/photos'} component={Photos} />
			<Route path={props.match.url + '/documents'} component={Documents} />
			<Route path={props.match.url + '/news'} component={News} />
			<Redirect from={props.match.url} to={props.match.url + '/overview'} />
		</Switch>
	</Panel>
)



export default Admin;
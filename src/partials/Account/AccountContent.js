import React from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import AccountUpdateContainer from '../../containers/AccountUpdateContainer';

const AccountHome = (props) => (
	<div className="account-home">
		<p className="user-email">{props.email}</p>
		<Link to={props.match.url + '/update'}>Update Password</Link>
		<button onClick={props.logout}>Logout</button>
	</div>
)

const AccountContent = (props) => (
	<Switch>
		<Route exact path={props.match.url} render={() => <AccountHome email={props.email} {...props} />} />
		<Route path={props.match.url + '/update'} component={AccountUpdateContainer} />
	</Switch>
)

export default AccountContent;
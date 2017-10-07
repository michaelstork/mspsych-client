import React from 'react';
import {Route, Switch} from 'react-router-dom';
import AccountUpdateContainer from '../../containers/AccountUpdateContainer';
import AccountHome from '../../partials/Account/AccountHome';


const AccountContent = (props) => (
	<Switch>
		<Route exact path={props.match.url} render={() => <AccountHome email={props.email} {...props} />} />
		<Route path={props.match.url + '/update'} component={AccountUpdateContainer} />
	</Switch>
)

export default AccountContent;
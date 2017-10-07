import React from 'react';
import {Route, Switch} from 'react-router-dom';
import AccountUpdateContainer from '../../containers/AccountUpdateContainer';
import AccountHome from '../../partials/Account/AccountHome';


const AccountContent = (props) => (
	<Switch>
		<Route exact path={props.match.url} render={() =>
			<AccountHome email={props.email} logout={props.logout} match={props.match} />
		}/>
		<Route path={props.match.url + '/update'} component={AccountUpdateContainer} />
	</Switch>
)

export default AccountContent;
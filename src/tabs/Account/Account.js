import React from 'react';
import Panel from '../../components/Panel/Panel';
import LoginForm from '../../partials/LoginForm/LoginForm';
import AccountContent from '../../partials/Account/AccountContent';
import './Account.css';

function renderAccountContent(props) {
	if (!props.user) {
		return (
			<LoginForm
				authenticate={props.authenticate}
				notify={props.notify} />
		);
	}

	return (
		<AccountContent
			logout={props.logout}
			email={props.user.email}
			match={props.match}
			notify={props.notify} />
	);
}

const Account = (props) => (
	<Panel className="account-panel">
		<h2>{props.user ? 'Account' : 'Login'}</h2>
		{renderAccountContent(props)}
	</Panel>
)

export default Account;
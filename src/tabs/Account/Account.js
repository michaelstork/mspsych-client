import React from 'react';
import Panel from '../../components/Panel/Panel';
import LoginForm from '../../partials/LoginForm/LoginForm';
import AccountContent from '../../partials/Account/AccountContent';
import './Account.css';



const Account = (props) => (
	<Panel className="account-panel">
		<h2>{props.user ? 'Account' : 'Login'}</h2>
		{!props.user
			? <LoginForm authenticate={props.authenticate} logoutMessage={props.logoutMessage} {...props} />
			: <AccountContent logout={props.logout} email={props.user.email} {...props} />
		}
	</Panel>
)

export default Account;
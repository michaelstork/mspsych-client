import React from 'react';
import Panel from '../../components/Panel/Panel';
import LoginForm from '../../partials/LoginForm/LoginForm';
import './Account.css';

const AccountContent = (props) => (
	<div>
		<p className="user-email">{props.email}</p>
		<button onClick={props.logout}>Logout</button>
	</div>
)

const Account = (props) => (
	<Panel className="account-panel">
		<h2>{props.user ? 'Account' : 'Login'}</h2>
		{props.user
			? <AccountContent logout={props.logout} email={props.user.email} />
			: <LoginForm authenticate={props.authenticate} {...props} />
		}
	</Panel>
)

export default Account;
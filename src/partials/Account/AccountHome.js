import React from 'react';
import {Link} from 'react-router-dom';

const AccountHome = (props) => (
	<div className="account-home">
		<p className="user-email">{props.email}</p>
		<Link to={props.match.url + '/update'}>Update Password</Link>
		<button onClick={() => props.logout()}>Logout</button>
	</div>
)

export default AccountHome;
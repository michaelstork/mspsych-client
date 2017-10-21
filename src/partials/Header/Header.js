import React from 'react';
import {NavLink} from 'react-router-dom'
import './Header.css';

function renderAdminLink(props) {
	if (!(props.user && props.user.isAdmin)) {
		return null;
	}

	return (
		<NavLink to="/admin"
			activeClassName="active-nav-item">
			Admin
		</NavLink>
	);
}

const Header = (props) => (
	<header className="main-header">
		<h1>MSPsych</h1>
		<nav>
			<NavLink exact to="/"
				activeClassName="active-nav-item">
				Home
			</NavLink>
			<NavLink to="/residents"
				activeClassName="active-nav-item">
				Residents
			</NavLink>
			<NavLink to="/evaluations"
				activeClassName="active-nav-item">
				Student Evaluations
			</NavLink>
			<NavLink to="/account"
				className="account"
				activeClassName="active-nav-item">
				Account
			</NavLink>
			{renderAdminLink(props)}
		</nav>
	</header>
)

export default Header;
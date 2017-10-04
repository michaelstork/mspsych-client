import React from 'react';
import {NavLink} from 'react-router-dom'
import './Header.css';

const Header = (props) => (
	<header>
		<h1>MSPsych</h1>
		<nav>
			<NavLink exact activeClassName="active-nav-item" to="/">Home</NavLink>
			<NavLink activeClassName="active-nav-item" to="/residents">Residents</NavLink>
			<NavLink activeClassName="active-nav-item" to="/evaluations">Student Evaluations</NavLink>
			<NavLink activeClassName="active-nav-item" to="/account">Account</NavLink>
			<NavLink activeClassName="active-nav-item" to="/admin">Admin</NavLink>
		</nav>
	</header>
)

export default Header;
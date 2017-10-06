import React from 'react';
import {NavLink} from 'react-router-dom'
import './Header.css';

const Header = (props) => (
	<header>
		{props.user ? props.user.email : null}
		<h1>MSPsych</h1>
		<nav>
			<NavLink exact activeClassName="active-nav-item" to="/">Home</NavLink>
			<NavLink activeClassName="active-nav-item" to="/residents">Residents</NavLink>
			<NavLink activeClassName="active-nav-item" to="/evaluations">Student Evaluations</NavLink>
			<NavLink className="account" activeClassName="active-nav-item" to="/account">Account</NavLink>
			<NavLink activeClassName="active-nav-item" to="/admin">Admin</NavLink>
			<a onClick={props.login}>Login</a>
			<a onClick={props.logout}>Logout</a>
		</nav>
	</header>
)


// class Header extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		console.log(props);
// 	}

// 	render() {
// 		return (
// 			<header>
// 				{this.props.user ? this.props.user.email : null}
// 				<h1 onClick={this.props.login}>MSPsych</h1>
// 				<nav>
// 					<NavLink exact activeClassName="active-nav-item" to="/">Home</NavLink>
// 					<NavLink activeClassName="active-nav-item" to="/residents">Residents</NavLink>
// 					<NavLink activeClassName="active-nav-item" to="/evaluations">Student Evaluations</NavLink>
// 					<NavLink className="account" activeClassName="active-nav-item" to="/account">Account</NavLink>
// 					<NavLink activeClassName="active-nav-item" to="/admin">Admin</NavLink>
// 				</nav>
// 			</header>		
// 		)
// 	}
// }


export default Header;
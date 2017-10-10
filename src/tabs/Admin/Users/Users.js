import React from 'react';
import './Users.css';
import axios from '../../../connection/axios';

import CreateUsers from '../../../partials/Users/CreateUsers';
import ManageUsers from '../../../partials/Users/ManageUsers';

class Users extends React.Component {
	constructor(props) {
		super(props);

		this.createUsers = this.createUsers.bind(this);
	}

	createUsers(users) {
		axios.post(
			'/api/users',
			{users: users}
		)
		.then(response => {
			console.log(response);
			
		})
		.catch(error => {
			console.log(error);
		})
	}


	render() {
		return (
			<section>
				<h2>User Management</h2>
				<div className="panel-content">
					<CreateUsers create={this.createUsers} />
					<ManageUsers />
				</div>
			</section>
		);
	}
}

export default Users;
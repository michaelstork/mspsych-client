import React from 'react';
import './Users.css';
import axios from '../../../connection/axios';

import CreateUsers from '../../../partials/Users/CreateUsers';
import ManageUsers from '../../../partials/Users/ManageUsers';

class Users extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			users: []
		};

		this.createUsers   = this.createUsers.bind(this);
		this.deleteUser    = this.deleteUser.bind(this);
	}

	componentDidMount() {
		this.getUsers();
	}

	getUsers() {
		axios.get(
			'/api/users'
		)
		.then(response => {
			this.setState(Object.assign({}, this.state, {users: response.data}));
		})
		.catch(error => {
			console.log(error);
		})
	}

	createUsers(users) {
		return axios.post(
			'/api/users',
			{users: users}
		)
		.then(response => {
			const users = this.state.users;
			Array.prototype.push.apply(users, response.data); 
			this.setState(Object.assign({}, this.state, {users: users}));

			return response;
		})
		.catch(error => {
			console.log(error);
		})
	}

	deleteUser(id) {
		if (!window.confirm('Are you sure you want to delete this user?')) return;

		return axios.delete('/api/users/'+id).then(response => {
			this.setState(Object.assign(
				{},
				this.state,
				{users: this.state.users.filter(user => user.id !== id)}
			));

			return response;
		}).catch(error => {
			console.log(error);
		});
	}

	render() {
		return (
			<section>
				<h2>User Management</h2>
				<div className="panel-content">
					<div className="panel-item users-list-panel">
						<header>
							<input type="text" placeholder="Search" />
						</header>
						<ManageUsers users={this.state.users} deleteUser={this.deleteUser} />
					</div>
					<CreateUsers create={this.createUsers} />
				</div>
			</section>
		);
	}
}

export default Users;
import React from 'react';
import './Users.css';
import cloneDeep from 'lodash/cloneDeep';
import axios from '../../../connection/axios';

import CreateUsers from '../../../partials/Users/CreateUsers';
import ManageUsers from '../../../partials/Users/ManageUsers';

class Users extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			users: [],
			search: ''
		};

		this.createUsers  = this.createUsers.bind(this);
		this.deleteUser   = this.deleteUser.bind(this);
		this.handleSearch = this.handleSearch.bind(this);

		this.searchTimeout = null;
	}

	componentDidMount() {
		this.getUsers();
	}

	getUsers(search = null) {
		axios.get(
			'/api/users' + (search ? '?email='+search : '')
		)
		.then(response => {
			const state = cloneDeep(this.state);
			state.users = response.data;

			if (search === null) state.search = '';
			this.setState(state);
		})
		.catch(error => {
			console.log(error);
		})
	}

	createUsers(users) {
		this.getUsers();

		return axios.post(
			'/api/users',
			{users: users}
		)
		.then(response => {
			const state = cloneDeep(this.state);
			Array.prototype.push.apply(state.users, response.data);
			this.setState(state);
			return response;
		})
		.catch(error => {
			console.log(error);
		})
	}

	deleteUser(id) {
		if (!window.confirm(
			'Are you sure you want to delete this user?'
		)) return;

		return axios.delete(
			'/api/users/'+id
		)
		.then(response => {
			const state = cloneDeep(this.state);
			state.users = state.users.filter(
				user => user.id !== id
			);
			this.setState(state);

			return response;
		})
		.catch(error => {
			console.log(error);
		});
	}

	handleSearch(event) {
		window.clearTimeout(this.searchTimeout);

		const state = cloneDeep(this.state);
		state.search = event.target.value;
		this.setState(state);
		
		this.searchTimeout = window.setTimeout(() => {
			this.getUsers(this.state.search);
		}, 350);
	}

	render() {
		return (
			<section>
				<h2>User Management</h2>
				<div className="panel-content">
					<div className="panel-item list-panel-item">
						<header>
							<input
								type="text"
								onChange={this.handleSearch}
								value={this.state.search}
								placeholder="Search" />
						</header>
						<ManageUsers
							users={this.state.users}
							deleteUser={this.deleteUser} />
					</div>
					<CreateUsers create={this.createUsers} />
				</div>
			</section>
		);
	}
}

export default Users;
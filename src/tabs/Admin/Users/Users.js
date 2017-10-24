import React from 'react';
import './Users.css';
import cloneDeep from 'lodash/cloneDeep';
import axios from '../../../connection/axios';

import Loader from '../../../components/Loader/Loader';
import CreateUsers from '../../../partials/Users/CreateUsers';
import ManageUsers from '../../../partials/Users/ManageUsers';

class Users extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			users: [],
			search: '',
			inProgress: false
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
		const state = cloneDeep(this.state);
		state.inProgress = true;
		this.setState(state);

		return axios.get(
			'/api/users' + (search ? '?email='+search : '')
		)
		.then(response => {
			const state = cloneDeep(this.state);
			state.users = response.data;
			state.inProgress = false;

			if (search === null) state.search = '';
			this.setState(state);

			return response;
		})
		.catch(error => {
			console.log(error);
			const state = cloneDeep(this.state);
			state.inProgress = false;
			this.setState(state);
		})
	}

	createUsers(users) {
		const state = cloneDeep(this.state);
		state.inProgress = true;
		this.setState(state);

		return axios.post(
			'/api/users',
			{users: users}
		)
		.then(response => {
			this.getUsers().then(() => {
				this.props.notify('Users added');
			});

			return response;
		})
		.catch(error => {
			console.log(error);
			const state = cloneDeep(this.state);
			state.inProgress = false;
			this.setState(state);

			if (error.response.status === 400) {
				this.props.notify(error.response.data.message);
			}

			return error.response;
		})
	}

	deleteUser(id) {
		if (!window.confirm(
			'Are you sure you want to delete this user?'
		)) return;

		const state = cloneDeep(this.state);
		state.inProgress = true;
		this.setState(state);

		return axios.delete(
			'/api/users/'+id
		)
		.then(response => {
			const state = cloneDeep(this.state);
			state.inProgress = false;
			state.users = state.users.filter(
				user => user.id !== id
			);

			this.setState(state);
			this.props.notify('User deleted');

			return response;
		})
		.catch(error => {
			console.log(error);
			const state = cloneDeep(this.state);
			state.inProgress = false;
			this.setState(state);
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
				<h2>
					<span>User Management</span>
					<Loader loading={this.state.inProgress} />
				</h2>
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
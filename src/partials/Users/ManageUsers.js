import React from 'react';
import axios from '../../connection/axios';
import UsersList from './UsersList';
import UsersListActions from './UsersListActions';

class ManageUsers extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedUser: null,
			defaultPassword: ''
		};

		this.selectUser    = this.selectUser.bind(this);
		this.handleSubmit  = this.handleSubmit.bind(this);
		this.handleChange  = this.handleChange.bind(this);
		this.handleDelete  = this.handleDelete.bind(this);
		this.resetPassword = this.resetPassword.bind(this);
	}

	selectUser(user) {
		this.setState(Object.assign({}, this.state, {selectedUser: user}));
	}

	resetPassword(id, password) {
		return axios.put(
			'/api/users/'+id,
			{password: password}
		).then(response => {
			this.setState(Object.assign({}, this.state, {defaultPassword: ''}));
		}).catch(error => {
			console.log(error);
		});
	}

	handleSubmit(event) {
		event.preventDefault();

		this.resetPassword(
			this.state.selectedUser.id,
			this.state.defaultPassword
		);
	}

	handleChange(event) {
		this.setState(Object.assign({}, this.state, {defaultPassword: event.target.value}));
	}

	handleDelete() {
		const promise = this.props.deleteUser(
			this.state.selectedUser.id
		);

		if (!promise) return;

		promise.then(response => {
			this.setState(Object.assign({}, this.state, {selectedUser: null}));
		});
	}

	render() {
		return (
			<div className="list-panel-container">
				<UsersList
					users={this.props.users}
					select={this.selectUser}
					selected={this.state.selectedUser} />
				<UsersListActions
					selectedUser={this.state.selectedUser}
					defaultPassword={this.state.defaultPassword}
					handleDelete={() => this.handleDelete()}
					handleSubmit={this.handleSubmit}
					handleChange={this.handleChange} />
			</div>
		);
	}
}

export default ManageUsers;
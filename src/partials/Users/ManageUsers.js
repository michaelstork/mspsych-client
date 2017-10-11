import React from 'react';
import axios from '../../connection/axios';
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
		this.props.deleteUser(
			this.state.selectedUser.id
		).then(response => {
			this.setState(Object.assign({}, this.state, {selectedUser: null}));
		});
	}

	render() {
		return (
			<div className="list-panel-container">
				<ul>
					{this.props.users.map(user =>
						<li onClick={() => this.selectUser(user)}
							className={this.state.selectedUser === user ? 'selected' : ''}
							key={user.id}>
							<span>{user.email}</span>
						</li>
					)}
				</ul>

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
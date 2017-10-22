import React from 'react';
import axios from '../../connection/axios';
import cloneDeep from 'lodash/cloneDeep';
import {Link} from 'react-router-dom';

class AccountUpdate extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			current: '',
			password: '',
			confirm: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const state = cloneDeep(this.state);
		state[event.target.name] = event.target.value;
		this.setState(state);
	}

	handleSubmit(event) {
		event.preventDefault();
		axios.post(
			'/api/update-password',
			{
				current: this.state.current,
				password: this.state.password,
				confirm: this.state.confirm
			}
		)
		.then(response => {
			this.props.notify('Password has been updated');
			this.props.logout();
		})
		.catch(error => {
			this.props.notify(error.response.data.message);
		})
	}

	render() {
		return (
			<div className="account-update">
				<form onSubmit={this.handleSubmit} name="passwordUpdate">
					<div className="input-container">
						<label>Current Password</label>
						<input
							onChange={this.handleChange}
							value={this.state.current}
							name="current"
							type="password" />
					</div>
					<div className="input-container">
						<label>New Password</label>
						<input
							onChange={this.handleChange}
							value={this.state.password}
							name="password"
							type="password" />
					</div>
					<div className="input-container">
						<label>Confirm Password</label>
						<input
							onChange={this.handleChange}
							value={this.state.confirm}
							name="confirm"
							type="password" />
					</div>
					<div className="button-container">
						<Link to='/account'>
							<button type="button"
								className="cancel">Cancel</button>
						</Link>
						<button type="submit">Submit</button>
					</div>
				</form>
			</div>

		);
	}
}

export default AccountUpdate;
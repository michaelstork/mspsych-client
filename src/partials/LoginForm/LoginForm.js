import React from 'react';
import './LoginForm.css';
import {withRouter} from 'react-router';
import cloneDeep from 'lodash/cloneDeep';


class LoginForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: ''
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
		this.props.authenticate(
			this.state.email,
			this.state.password
		)
		.then((response) => {
			this.props.history.push('/');
		})
		.catch(response => {
			this.props.notify(
				response.status === 404
					? 'Invalid email or password'
					: 'Something went wrong, please try again'
			);
		});
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit} name="login">
				<div className="input-container">
					<label>Email:</label>
					<input
						type="email"
						name="email"
						value={this.state.email}
						onChange={this.handleChange}
						tabIndex="1" />
				</div>
				<div className="input-container">
					<label>Password:</label>
					<input
						type="password"
						name="password"
						value={this.state.password}
						onChange={this.handleChange}
						tabIndex="2" />
				</div>
				<button type="submit">Submit</button>
			</form>
		)
	}
}

export default withRouter(LoginForm);
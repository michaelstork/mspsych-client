import React from 'react';
import './LoginForm.css';
import {withRouter} from 'react-router';


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
		switch (event.target.name) {
			case 'email':
				this.setState(Object.assign({}, this.state, {email: event.target.value}));
				break;
			case 'password':
				this.setState(Object.assign({}, this.state, {password: event.target.value}));
				break;
			default:
				return;
		}
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.authenticate(
			this.state.email,
			this.state.password
		).then((response) => {
			this.props.history.push('/');
		}).catch(response => {
			if (response.status === 404) {
				console.log('invalid credentials');
			} else if (response.status === 401) {
				console.log('something went wrong');
			}
		});
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit} name="login">
				<p className="message">{this.props.logoutMessage}</p>
				<div className="input-container">
					<label>Email:</label>
					<input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
				</div>
				<div className="input-container">
					<label>Password:</label>
					<input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
				</div>
				<button type="submit">Submit</button>
			</form>
		)
	}
}

export default withRouter(LoginForm);
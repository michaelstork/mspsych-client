import React from 'react';

class CreateUsers extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			users: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState(Object.assign({}, this.state, {users: event.target.value}));
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.create(this.state.users);
	}

	render() {
		return (
			<div className="panel-item">
				<form name="addUsers" onSubmit={this.handleSubmit}>
					<p>Enter a list of comma-separated email addresses</p>
					<div className="input-container textarea">
						<label>Add Users:</label>
						<textarea name="users" value={this.state.users} onChange={this.handleChange} required></textarea>
					</div>
					<div className="button-container">
						<button type="submit">Submit</button>
					</div>
				</form>
			</div>
		);
	}
}


export default CreateUsers;
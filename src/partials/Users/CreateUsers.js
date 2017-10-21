import React from 'react';
import cloneDeep from 'lodash/cloneDeep';

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
		const state = cloneDeep(this.state);
		state.users = event.target.value;
		this.setState(state);
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.create(this.state.users)
			.then(response => {
				const state = cloneDeep(this.state);
				state.users = [];
				this.setState(state);
			});
	}

	render() {
		return (
			<div className="panel-item">
				<form name="addUsers" onSubmit={this.handleSubmit}>
					<p>Enter a list of comma-separated email addresses</p>
					<div className="input-container textarea">
						<label>Add Users:</label>
						<textarea
							name="users"
							value={this.state.users}
							onChange={this.handleChange}
							required>
						</textarea>
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
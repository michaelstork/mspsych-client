import React from 'react';
import cloneDeep from 'lodash/cloneDeep';

class CreateStudents extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			students: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const state = cloneDeep(this.state);
		state.students = event.target.value;
		this.setState(state);
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.create(
			this.state.students
		)
		.then(response => {
			if (response.status === 400) return;
			
			const state = cloneDeep(this.state);
			state.students = '';
			this.setState(state);
		});
	}

	render() {
		return (
			<div className="panel-item">
				<form name="addStudents" onSubmit={this.handleSubmit}>
					<p>Enter a list of comma-separated student names</p>
					<div className="input-container textarea">
						<label>Add Students:</label>
						<textarea
							name="students"
							value={this.state.students}
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


export default CreateStudents;
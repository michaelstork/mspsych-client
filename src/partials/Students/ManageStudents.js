import React from 'react';
import StudentsListActions from './StudentsListActions';

class ManageStudents extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedStudent: null
		};

		this.selectStudent = this.selectStudent.bind(this);
		this.handleDelete  = this.handleDelete.bind(this);
	}

	selectStudent(student) {
		this.setState(Object.assign({}, this.state, {selectedStudent: student}));
	}

	handleDelete() {
		const promise = this.props.deleteStudent(
			this.state.selectedStudent.id
		);

		if (!promise) return;

		promise.then(response => {
			this.setState(Object.assign({}, this.state, {selectedStudent: null}));
		});
	}

	render() {
		return (
			<div className="list-panel-container">
				<ul>
					{this.props.students.map(student =>
						<li onClick={() => this.selectStudent(student)}
							className={this.state.selectedStudent === student ? 'selected' : ''}
							key={student.id}>
							<span>{student.name}</span>
						</li>
					)}
				</ul>

				<StudentsListActions
					selectedStudent={this.state.selectedStudent}
					handleDelete={() => this.handleDelete()}/>
			</div>
		);
	}
}

export default ManageStudents;
import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import StudentsList from './StudentsList';
import StudentsListActions from './StudentsListActions';

class ManageStudents extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedStudent: null
		};

		this.selectStudent = this.selectStudent.bind(this);
		this.handleDelete  = this.handleDelete.bind(this);
		this.handleUpload  = this.handleUpload.bind(this);
	}

	selectStudent(student) {
		const state = cloneDeep(this.state);
		state.selectedStudent = student;
		this.setState(state);
	}

	handleDelete() {
		const promise = this.props.delete(
			this.state.selectedStudent.id
		);

		if (!promise) return;

		promise.then(response => {
			const state = cloneDeep(this.state);
			state.selectedStudent = null;
			this.setState(state);
		});
	}

	handleUpload(id, file) {
		return this.props.upload(id, file).then(response => {
			const selected = this.props.students.find(
				student => student.id === response.data.id
			);
			this.selectStudent(selected);
		});
	}

	render() {
		return (
			<div className="list-panel-container">
				<StudentsList
					students={this.props.students}
					select={this.selectStudent}
					selected={this.state.selectedStudent} />
				<StudentsListActions
					student={this.state.selectedStudent}
					delete={this.handleDelete}
					upload={this.handleUpload} />
			</div>
		);
	}
}

export default ManageStudents;
import React from 'react';
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
		this.setState(Object.assign({}, this.state, {selectedStudent: student}));
	}

	handleDelete() {
		const promise = this.props.delete(
			this.state.selectedStudent.id
		);

		if (!promise) return;

		promise.then(response => {
			this.setState(Object.assign({}, this.state, {selectedStudent: null}));
		});
	}

	handleUpload(id, file) {
		return this.props.upload(id, file).then(response => {
			const selected = this.props.students.find(student => student.id === response.data.id);
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
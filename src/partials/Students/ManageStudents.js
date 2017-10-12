import React from 'react';
import PhotoUpload from './PhotoUpload';
import StudentPhoto from './StudentPhoto';

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

	renderSelectedStudent() {
		return (
			<div className="selected-item">
				<i className="material-icons">school</i>
				<span>{this.state.selectedStudent ? this.state.selectedStudent.name : 'Select Student'}</span>
				{this.state.selectedStudent
					&& <i onClick={() => this.handleDelete()} className="material-icons delete">delete</i>}
			</div>
		);
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

				<div className="list-panel-actions">
					{this.renderSelectedStudent()}
					{this.state.selectedStudent
						&& <StudentPhoto student={this.state.selectedStudent} />}
					{this.state.selectedStudent
						&& <PhotoUpload id={this.state.selectedStudent.id} upload={this.handleUpload} />}
				</div>
			</div>
		);
	}
}

export default ManageStudents;
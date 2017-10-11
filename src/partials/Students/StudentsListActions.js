import React from 'react';

function renderSelectedStudent(student) {
	return (
		<div className="selected-item">
			<i className="material-icons">school</i>
			<span>{student ? student.name : 'Select Student'}</span>
		</div>
	);
}

function renderDeleteStudent(props) {
	return (
		<div className="delete-student">
			<button onClick={() => props.handleDelete()}>Delete Student</button>
		</div>
	);
}

const StudentsListActions = (props) => (
	<div className="list-panel-actions">
		{renderSelectedStudent(props.selectedStudent)}
		{props.selectedStudent && renderDeleteStudent(props)}
	</div>
);

export default StudentsListActions;
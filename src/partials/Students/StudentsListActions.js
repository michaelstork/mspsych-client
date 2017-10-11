import React from 'react';

function renderSelectedStudent(props) {
	return (
		<div className="selected-item">
			<i className="material-icons">school</i>
			<span>{props.selectedStudent ? props.selectedStudent.name : 'Select Student'}</span>
			{props.selectedStudent && <i onClick={() => props.handleDelete()} className="material-icons delete">delete</i>}
		</div>
	);
}

const StudentsListActions = (props) => (
	<div className="list-panel-actions">
		{renderSelectedStudent(props)}
	</div>
);

export default StudentsListActions;
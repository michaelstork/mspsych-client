import React from 'react';
import PhotoUpload from './PhotoUpload';
import StudentPhoto from './StudentPhoto';

function renderSelectedStudent(props) {
	return (
		<div className="selected-item">
			<i className="material-icons">school</i>
			<span>{props.student ? props.student.name : 'Select Student'}</span>
			{props.student
				&& <i onClick={() => props.delete()} className="material-icons delete">delete</i>}
		</div>
	);
}

function renderStudentPhoto(props) {
	return props.student && <StudentPhoto student={props.student} />;
}

function renderPhotoUpload(props) {
	return props.student && <PhotoUpload id={props.student.id} upload={props.upload} />
}

const StudentsListActions = (props) => (
	<div className="list-panel-actions">
		{renderSelectedStudent(props)}
		{renderStudentPhoto(props)}
		{renderPhotoUpload(props)}
	</div>
)

export default StudentsListActions;
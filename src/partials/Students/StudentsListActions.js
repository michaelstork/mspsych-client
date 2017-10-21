import React from 'react';
import PhotoUpload from './PhotoUpload';
import StudentPhoto from '../../components/StudentPhoto';

function renderDelete(props) {
	if (!props.student) {
		return null;
	}

	return (
		<i className="material-icons delete"
			onClick={
				() => props.delete()
			}>
			delete
		</i>
	);
}

function renderSelectedStudent(props) {
	return (
		<div className="selected-item">
			<i className="material-icons">school</i>
			<span>{props.student ? props.student.name : 'Select Student'}</span>
			{renderDelete(props)}
		</div>
	);
}

function renderStudentPhoto(props) {
	return <StudentPhoto student={props.student} />;
}

function renderPhotoUpload(props) {
	return <PhotoUpload id={props.student.id} upload={props.upload} />
}

const StudentsListActions = (props) => (
	<div className="list-panel-actions">
		{renderSelectedStudent(props)}
		{props.student && renderStudentPhoto(props)}
		{props.student && renderPhotoUpload(props)}
	</div>
)

export default StudentsListActions;
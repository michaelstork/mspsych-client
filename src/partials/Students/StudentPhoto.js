import React from 'react';

const StudentPhoto = (props) => (
	<div>
		{props.student.photo
			? <div className="student-photo" style={{backgroundImage: 'url("/api/storage/photos/'+props.student.photo+'")'}} />
			: <div className="student-photo" />}
	</div>
)

export default StudentPhoto;
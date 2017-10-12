import React from 'react';

const StudentsList = (props) => (
	<ul>
		{props.students.map(student =>
			<li onClick={() => props.select(student)}
				className={props.selected === student ? 'selected' : ''}
				key={student.id}>
				<span>{student.name}</span>
			</li>
		)}
	</ul>
)

export default StudentsList;
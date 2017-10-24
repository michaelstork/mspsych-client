import React from 'react';
import Moment from 'react-moment';
import Autocomplete from '../../components/Autocomplete/Autocomplete';

function renderSelectedUser(props) {
	return (
		<div className="selected-item">
			<i className="material-icons">account_circle</i>
			<span>
				{props.selectedUser
					? props.selectedUser.email
					: 'Select User'
				}
			</span>
		</div>
	);
}

function renderAssignmentsHeader(props) {
	if (props.inProgress) return null;

	if (!props.selectedUserEvals.length) {
		return (
			<header>
				<p className="none-assigned">
					No Evaluations Assigned
				</p>
			</header>
		);
	}

	return (
		<header>
			<p className="student">
				<span>Student</span>
			</p>
			<p className="type">Evaluation</p>
			<p className="date">Date</p>
		</header>
	);	
}

function renderAssignments(props) {
	if (props.inProgress) return null;

	return (
		<div className="assigned-items">
			{props.selectedUserEvals.map(item =>
				<div className="assigned-item" key={item.id}>
					<p className="student">
						<span>{item.student.name}</span>
					</p>
					<p className="type">{item.type.name}</p>
					<Moment className="date" format="M/D/YY">
						{item.created_at}
					</Moment>
				</div>
			)}
		</div>
	);
}

function renderAssignmentForm(props) {
	if (props.inProgress) return null;

	return (
		<form name="assignEval" onSubmit={props.handleSubmit}>
			<div className="input-container">
				<label>Type:</label>
				<select name="assignmentTypeId"
					onChange={props.handleChange}
					required>
					<option value=''>Select</option>
					{props.types.map(type =>
						<option value={type.id} key={type.id}>
							{type.name}
						</option>
					)}
				</select>
			</div>
			<div className="input-container">
				<label>Student:</label>
				<Autocomplete
					onSelect={props.handleSelectStudent}
					name="assignmentStudentId"
					resultBase="/api/students?name="
					resultLabelField="name"
					resultValueField="id" />
			</div>
			<button type="submit"
				disabled={!props.formIsValid}>
				Assign Evaluation
			</button>
		</form>
	);
}

const AssignmentsListActions = (props) => (
	<div className="list-panel-actions assignments-list-actions">
		{renderSelectedUser(props)}
		{props.selectedUser && renderAssignmentsHeader(props)}
		{props.selectedUser && renderAssignments(props)}
		{props.selectedUser && renderAssignmentForm(props)}
	</div>
);

export default AssignmentsListActions;
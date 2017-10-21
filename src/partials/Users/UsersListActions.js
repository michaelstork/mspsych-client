import React from 'react';

function renderDelete(props) {
	if (!props.selectedUser) {
		return null;
	}

	return (
		<i className="material-icons delete"
			onClick={
				() => props.handleDelete()
			}>
			delete
		</i>
	);	
}

function renderSelectedUser(props) {
	return (
		<div className="selected-item">
			<i className="material-icons">account_circle</i>
			<span>{props.selectedUser ? props.selectedUser.email : 'Select User'}</span>
			{renderDelete(props)}
		</div>
	);
}

function renderPasswordReset(props) {
	return (
		<form name="resetUserPassword" onSubmit={props.handleSubmit}>
			<div className="input-container">
				<label>Reset Password:</label>
				<input
					type="text"
					placeholder="New Password"
					value={props.defaultPassword}
					onChange={props.handleChange}
					required />
			</div>
			<button type="submit">Reset</button>
		</form>
	);
}

const UsersListActions = (props) => (
	<div className="list-panel-actions">
		{renderSelectedUser(props)}
		{props.selectedUser && renderPasswordReset(props)}
	</div>
);

export default UsersListActions;
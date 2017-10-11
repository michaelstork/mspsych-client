import React from 'react';

function renderSelectedUser(props) {
	return (
		<div className="selected-item">
			<i className="material-icons">account_circle</i>
			<span>{props.selectedUser ? props.selectedUser.email : 'Select User'}</span>
			{props.selectedUser && <i onClick={() => props.handleDelete()} className="material-icons delete">delete</i>}
		</div>
	);
}

function renderPasswordReset(props) {
	return (
		<form name="resetUserPassword" onSubmit={props.handleSubmit}>
			<div className="input-container">
				<label>Reset Password:</label>
				<input type="text" name="newPassword" value={props.defaultPassword} onChange={props.handleChange} required />
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
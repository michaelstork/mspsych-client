import React from 'react';

function renderSelectedUser(user) {
	return (
		<div className="selected-user">
			<i className="material-icons">account_circle</i>
			<span>{user ? user.email : 'Select User'}</span>
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

function renderDeleteUser(props) {
	return (
		<div className="delete-user">
			<button onClick={() => props.handleDelete()}>Delete User</button>
		</div>
	);
}

const UsersListActions = (props) => (
	<div className="list-panel-actions">
		{props.selectedUser && renderDeleteUser(props)}
		{renderSelectedUser(props.selectedUser)}
		{props.selectedUser && renderPasswordReset(props)}
	</div>
);

export default UsersListActions;
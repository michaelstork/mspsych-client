import React from 'react';

const UsersList = (props) => (
	<ul>
		{props.users.map(user =>
			<li onClick={() => props.select(user)}
				className={
					props.selected
						&& props.selected.id === user.id
						? 'selected'
						: ''
				}
				key={user.id}>
				<span>{user.email}</span>
			</li>
		)}
	</ul>
)

export default UsersList;
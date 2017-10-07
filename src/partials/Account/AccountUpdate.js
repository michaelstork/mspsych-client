import React from 'react';
import {Link} from 'react-router-dom';

const AccountUpdate = (props) => (
	<div className="account-update">
		{props.message
			? <p className="message">{props.message}</p>
			: ''}
		<form onSubmit={props.handleSubmit} name="passwordUpdate">
			<div className="input-container">
				<label>Current Password</label>
				<input onChange={props.handleChange} value={props.current} name="current" type="password" />
			</div>
			<div className="input-container">
				<label>New Password</label>
				<input onChange={props.handleChange} value={props.password} name="password" type="password" />
			</div>
			<div className="input-container">
				<label>Confirm Password</label>
				<input onChange={props.handleChange} value={props.confirm} name="confirm" type="password" />
			</div>
			<div className="button-container">
				<Link to='/account'>
					<button className="cancel">Cancel</button>
				</Link>
				<button type="submit">Submit</button>
			</div>
		</form>
	</div>
)

export default AccountUpdate;
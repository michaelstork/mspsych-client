import React from 'react';
import axios from '../../connection/axios';
import cloneDeep from 'lodash/cloneDeep';
import UsersList from '../Users/UsersList';
import AssignmentsListActions from './AssignmentsListActions';

class ManageAssignments extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			inProgress: false,
			selectedUser: null,
			selectedUserEvals: [],
			assignmentStudentId: '',
			assignmentTypeId: ''
		};

		this.selectUser    = this.selectUser.bind(this);
		this.handleSubmit  = this.handleSubmit.bind(this);
		this.handleChange  = this.handleChange.bind(this);
		this.handleSelectStudent  = this.handleSelectStudent.bind(this);
	}

	selectUser(user) {
		const state = cloneDeep(this.state);
		state.selectedUser = user;
		state.inProgress = true;
		this.setState(state);

		this.getUserAssignedEvals(user.id);
	}

	getUserAssignedEvals(id) {
		return axios.get(
			'/api/evaluations/user/'+id+'/assigned'
		).then(response => {
			const state = cloneDeep(this.state);
			state.selectedUserEvals = response.data;
			state.inProgress = false;
			this.setState(state);
		}).catch(error => {
			console.log(error);
			const state = cloneDeep(this.state);
			state.selectedUserEvals = [];
			state.inProgress = false;
			this.setState(state);
		});
	}

	assignEvaluation(userId, studentId, evalTypeId) {
		const state = cloneDeep(this.state);
		state.inProgress = true;
		this.setState(state);

		axios.post(
			'/api/evaluations/create',
			{
				userId: userId,
				studentId: studentId,
				evalTypeId: evalTypeId
			}
		)
		.then(response => {
			const state = cloneDeep(this.state);
			state.inProgress = false;
			state.assignmentStudentId = '';
			state.assignmentTypeId = '';
			state.selectedUserEvals.push(response.data);

			this.setState(state);
			this.props.notify('Evaluation assigned');
		})
		.catch(error => {
			console.log(error);
		});
	}

	handleSubmit(event) {
		event.preventDefault();

		this.assignEvaluation(
			this.state.selectedUser.id,
			this.state.assignmentStudentId,
			this.state.assignmentTypeId
		);
	}

	handleChange(event) {
		const state = cloneDeep(this.state);
		state[event.target.name] = event.target.value;
		this.setState(state);
	}

	handleSelectStudent(id) {
		const state = cloneDeep(this.state);
		state.assignmentStudentId = id;
		this.setState(state);
	}

	render() {
		return (
			<div className="list-panel-container">
				<UsersList
					users={this.props.users}
					select={this.selectUser}
					selected={this.state.selectedUser} />
				<AssignmentsListActions
					types={this.props.types}
					inProgress={this.state.inProgress}
					selectedUser={this.state.selectedUser}
					selectedUserEvals={this.state.selectedUserEvals}
					handleSubmit={this.handleSubmit}
					handleChange={this.handleChange}
					handleSelectStudent={this.handleSelectStudent}
					formIsValid={this.state.assignmentStudentId && this.state.assignmentTypeId} />
			</div>
		);
	}
}

export default ManageAssignments;
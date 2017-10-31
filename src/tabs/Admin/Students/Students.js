import React from 'react';
import axios from '../../../connection/axios';
import cloneDeep from 'lodash/cloneDeep';
import './Students.css';

import Loader from '../../../components/Loader/Loader';
import ManageStudents from '../../../partials/Students/ManageStudents';
import CreateStudents from '../../../partials/Students/CreateStudents';
import BatchCreateStudents from '../../../partials/Students/BatchCreateStudents';

class Students extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			students: [],
			search: '',
			inProgress: false
		};

		this.createStudents = this.createStudents.bind(this);
		this.deleteStudent  = this.deleteStudent.bind(this);
		this.updatePhoto    = this.updatePhoto.bind(this);
		this.handleSearch   = this.handleSearch.bind(this);
		this.uploadPhoto    = this.uploadPhoto.bind(this);
		this.uploadZip      = this.uploadZip.bind(this);

		this.searchTimeout = null;
	}

	componentDidMount() {
		this.getStudents();
	}

	getStudents(search = null) {
		const state = cloneDeep(this.state);
		state.inProgress = true;
		this.setState(state);

		return axios.get(
			'/api/students' + (search ? '?name='+search : '')
		)
		.then(response => {
			const state = cloneDeep(this.state);
			state.students = response.data;
			state.inProgress = false;

			if (search === null) state.search = '';
			this.setState(state);

			return response;
		})
		.catch(error => {
			console.log(error);
			const state = cloneDeep(this.state);
			state.inProgress = false;
			this.setState(state);
		});
	}

	createStudents(students) {
		const state = cloneDeep(this.state);
		state.inProgress = true;
		this.setState(state);

		return axios.post(
			'/api/students',
			{students: students}
		)
		.then(response => {
			this.getStudents().then(() => {
				this.props.notify('Students created');
			});

			return response;
		})
		.catch(error => {
			console.log(error);
			const state = cloneDeep(this.state);
			state.inProgress = false;
			this.setState(state);

			if (error.response.status === 400) {
				this.props.notify(error.response.data.message);
			}

			return error.response;
		})
	}

	deleteStudent(id) {
		if (!window.confirm(
			'Are you sure you want to delete this student?'
		)) return;

		const state = cloneDeep(this.state);
		state.inProgress = true;
		this.setState(state);

		return axios.delete(
			'/api/students/'+id
		)
		.then(response => {
			const state = cloneDeep(this.state);
			state.inProgress = false;
			state.students = state.students.filter(
				student => student.id !== id
			);

			this.setState(state);
			this.props.notify('Student deleted');

			return response;
		})
		.catch(error => {
			console.log(error);
			const state = cloneDeep(this.state);
			state.inProgress = false;
			this.setState(state);
		});
	}

	uploadPhoto(id, file) {
		const formData = new FormData();
		formData.append('photo', file);

		const state = cloneDeep(this.state);
		state.inProgress = true;
		this.setState(state);

		return axios.post(
			'/api/students/'+id,
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}
		).then(response => {
			const state = cloneDeep(this.state);
			state.inProgress = false;
			this.setState(state);

			this.updatePhoto(response.data);
			this.props.notify('Photo uploaded');

			return response;
		}).catch(error => {
			console.log(error);
		});
	}

	uploadZip(file) {
		const formData = new FormData();
		formData.append('zip', file);

		const state = cloneDeep(this.state);
		state.inProgress = true;
		this.setState(state);

		return axios.post(
			'/api/students/batch',
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}
		).then(response => {
			this.getStudents().then(() => {
				this.props.notify('Students created');
			});
			return response;
		}).catch(error => {
			console.log(error);
		})
	}

	updatePhoto(updated) {
		const state = cloneDeep(this.state);
		const student = state.students.find(
			student => student.id === updated.id
		);

		student.photo = updated.photo;

		this.setState(state);
	}

	handleSearch(event) {
		window.clearTimeout(this.searchTimeout);

		const state = cloneDeep(this.state);
		state.search = event.target.value;
		this.setState(state);

		this.searchTimeout = window.setTimeout(() => {
			this.getStudents(this.state.search);
		}, 350);
	}

	render() {
		return (
			<section>
				<h2>
					<span>Students</span>
					<Loader loading={this.state.inProgress} />
				</h2>
				<div className="panel-content">
					<div className="panel-item list-panel-item">
						<header>
							<input
								type="text"
								onChange={this.handleSearch}
								value={this.state.search}
								placeholder="Search" />
						</header>
						<ManageStudents
							students={this.state.students}
							delete={this.deleteStudent}
							upload={this.uploadPhoto} />
					</div>
					<BatchCreateStudents upload={this.uploadZip} />
					<CreateStudents create={this.createStudents} />
				</div>
			</section>
		);
	}
}

export default Students;
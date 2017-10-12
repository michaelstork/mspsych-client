import React from 'react';
import axios from '../../../connection/axios';
import './Students.css';

import ManageStudents from '../../../partials/Students/ManageStudents';
import CreateStudents from '../../../partials/Students/CreateStudents';
import BatchCreateStudents from '../../../partials/Students/BatchCreateStudents';

class Students extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			students: [],
			search: ''
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
		axios.get(
			'/api/students' + (search ? '?name='+search : '')
		)
		.then(response => {
			const state = {students: response.data};
			if (search === null) state.search = '';
			this.setState(Object.assign({}, this.state, state));
		})
		.catch(error => {
			console.log(error);
		});
	}

	createStudents(students) {
		return axios.post(
			'/api/students',
			{students: students}
		)
		.then(response => {
			this.getStudents();
			return response;
		})
		.catch(error => {
			console.log(error);
		})
	}

	deleteStudent(id) {
		if (!window.confirm('Are you sure you want to delete this student?')) return;

		return axios.delete(
			'/api/students/'+id
		).then(response => {
			this.setState(Object.assign(
				{},
				this.state,
				{students: this.state.students.filter(student => student.id !== id)}
			));

			return response;
		}).catch(error => {
			console.log(error);
		});
	}

	uploadPhoto(id, file) {
		const formData = new FormData();
		formData.append('photo', file);

		return axios.post(
			'/api/students/'+id,
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}
		).then(response => {
			this.updatePhoto(response.data);
			return response;
		}).catch(error => {
			console.log(error);
		});
	}

	uploadZip(file) {
		const formData = new FormData();
		formData.append('zip', file);

		return axios.post(
			'/api/students/batch',
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}
		).then(response => {
			this.getStudents();
			return response;
		}).catch(error => {
			console.log(error);
		})
	}

	updatePhoto(updated) {
		const students = this.state.students.slice();
		const student = students.find(student => student.id === updated.id);
		student.photo = updated.photo;
		this.setState(Object.assign({}, this.state, {students: students}));
	}

	handleSearch(event) {
		window.clearTimeout(this.searchTimeout);
		this.setState(Object.assign({}, this.state, {search: event.target.value}));
		
		this.searchTimeout = window.setTimeout(() => {
			this.getStudents(this.state.search);
		}, 350);
	}

	render() {
		return (
			<section>
				<h2>Students</h2>
				<div className="panel-content">
					<div className="panel-item list-panel-item">
						<header>
							<input type="text" onChange={this.handleSearch} value={this.state.search} placeholder="Search" />
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
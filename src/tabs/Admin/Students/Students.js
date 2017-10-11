import React from 'react';
import axios from '../../../connection/axios';
import './Students.css';

import CreateStudents from '../../../partials/Students/CreateStudents';
import ManageStudents from '../../../partials/Students/ManageStudents';

class Students extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			students: [],
			search: ''
		};

		this.createStudents = this.createStudents.bind(this);
		this.deleteStudent  = this.deleteStudent.bind(this);
		this.handleSearch   = this.handleSearch.bind(this);

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
		})
	}

	createStudents(students) {
		this.getStudents();

		return axios.post(
			'/api/students',
			{students: students}
		)
		.then(response => {
			const students = this.state.students;
			Array.prototype.push.apply(students, response.data); 
			this.setState(Object.assign({}, this.state, {students: students}));

			return response;
		})
		.catch(error => {
			console.log(error);
		})
	}

	deleteStudent(id) {
		if (!window.confirm('Are you sure you want to delete this student?')) return;

		return axios.delete('/api/students/'+id).then(response => {
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
						<ManageStudents students={this.state.students} deleteStudent={this.deleteStudent} />
					</div>
					<CreateStudents create={this.createStudents} />
				</div>
			</section>
		);
	}
}

export default Students;
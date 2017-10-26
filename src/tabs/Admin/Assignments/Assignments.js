import React from 'react';
import './Assignments.css';
import axios from '../../../connection/axios';
import cloneDeep from 'lodash/cloneDeep';

import Loader from '../../../components/Loader/Loader';
import ManageAssignments from '../../../partials/Assignments/ManageAssignments';
import BatchAssignEvals from '../../../partials/Assignments/BatchAssignEvals';

class Assignments extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			users: [],
			search: '',
			types: [],
			inProgress: false
		};

		this.handleSearch = this.handleSearch.bind(this);
		this.uploadSpreadsheet = this.uploadSpreadsheet.bind(this);

		this.searchTimeout = null;
	}

	componentDidMount() {
		this.getUsers().then(this.getTypes());
	}

	getUsers(search = null) {
		const state = cloneDeep(this.state);
		state.inProgress = true;
		this.setState(state);

		return axios.get(
			'/api/users' + (search ? '?email='+search : '')
		)
		.then(response => {
			const state = cloneDeep(this.state);
			state.users = response.data;
			state.inProgress = false;

			if (search === null) state.search = '';
			this.setState(state);
		})
		.catch(error => {
			console.log(error);
			const state = cloneDeep(this.state);
			state.inProgress = false;
			this.setState(state);
		})
	}

	getTypes() {
		const state = cloneDeep(this.state);
		state.inProgress = true;
		this.setState(state);

		return axios.get(
			'/api/evaluations/types'
		)
		.then(response => {
			const state = cloneDeep(this.state);
			state.types = response.data;
			state.inProgress = false;
			this.setState(state);
		})
		.catch(error => {
			console.log(error);
			const state = cloneDeep(this.state);
			state.inProgress = false;
			this.setState(state);
		});
	}

	handleSearch(event) {
		window.clearTimeout(this.searchTimeout);

		const state = cloneDeep(this.state);
		state.search = event.target.value;
		this.setState(state);
		
		this.searchTimeout = window.setTimeout(() => {
			this.getUsers(this.state.search);
		}, 350);
	}

	uploadSpreadsheet(file) {
		const formData = new FormData();
		formData.append('spreadsheet', file);

		const state = cloneDeep(this.state);
		state.inProgress = true;
		this.setState(state);

		return axios.post(
			'/api/evaluations/import/assignments',
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}
		).then(response => {
			this.getUsers().then(() => {
				this.props.notify(response.data.message);
			});
			return response;
		}).catch(error => {
			const state = cloneDeep(this.state);
			state.inProgress = false;
			this.setState(state);

			this.props.notify(error.response.data.message);
		})
	}

	render() {
		return (
			<section>
				<h2>
					<span>Assign Evaluations</span>
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
						<ManageAssignments
							notify={this.props.notify}
							users={this.state.users}
							types={this.state.types} />
					</div>
					<BatchAssignEvals upload={this.uploadSpreadsheet} />
				</div>
			</section>
		);
	}
}

export default Assignments;
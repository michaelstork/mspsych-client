import React from 'react';
import './Assignments.css';
import axios from '../../../connection/axios';
import cloneDeep from 'lodash/cloneDeep';

import ManageAssignments from '../../../partials/Assignments/ManageAssignments';

class Assignments extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			users: [],
			search: '',
			types: []
		};

		this.handleSearch = this.handleSearch.bind(this);

		this.searchTimeout = null;
	}

	componentDidMount() {
		this.getUsers()
			.then(this.getTypes());
	}

	getUsers(search = null) {
		return axios.get(
			'/api/users' + (search ? '?email='+search : '')
		)
		.then(response => {
			const state = cloneDeep(this.state);
			state.users = response.data;

			if (search === null) state.search = '';
			this.setState(state);
		})
		.catch(error => {
			console.log(error);
		})
	}

	getTypes() {
		return axios.get(
			'/api/evaluations/types'
		)
		.then(response => {
			const state = cloneDeep(this.state);
			state.types = response.data;
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

	render() {
		return (
			<section>
				<h2>Assign Evaluations</h2>
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
				</div>
			</section>
		);
	}
}

export default Assignments;
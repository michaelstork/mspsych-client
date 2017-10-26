import React from 'react';
import './Completed.css';
import cloneDeep from 'lodash/cloneDeep';
import {Link} from 'react-router-dom';
import Loader from '../../../components/Loader/Loader';
import moment from 'moment';
import axios from '../../../connection/axios';

class Completed extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			evals: [],
			search: '',
			inProgress: false
		};

		this.handleSearch = this.handleSearch.bind(this);

		this.searchTimeout = null;
	}

	componentDidMount() {
		this.getCompletedEvals();
	}

	getCompletedEvals(search = null) {
		const state = cloneDeep(this.state);
		state.inProgress = true;
		this.setState(state);

		return axios.get(
			'/api/evaluations/completed' + (search ? '?search='+search : '')
		)
		.then(response => {
			const state = cloneDeep(this.state);
			state.evals = response.data;
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

	handleSearch(event) {
		window.clearTimeout(this.searchTimeout);

		const state = cloneDeep(this.state);
		state.search = event.target.value;
		this.setState(state);

		this.searchTimeout = window.setTimeout(() => {
			this.getCompletedEvals(this.state.search);
		}, 350);
	}

	render() {
		return (
			<section>
				<h2>Completed Evaluations</h2>
				<div className="panel-content">
					<div className="panel-item table-panel-item completed-evals-table-item">
						<header>
							<input
								type="text"
								onChange={this.handleSearch}
								value={this.state.search}
								placeholder="Search" />
						</header>
						<div className="table-panel-actions">
							<a href="/api/evaluations/export/completed" target="_blank">
								<i className="material-icons">file_download</i>
								<span>Export</span>
							</a>
							<Loader loading={this.state.inProgress} />
						</div>
						<div className="table-panel-container">
							<header>
								<div className="student">Student</div>
								<div className="evaluator">Evaluator</div>
								<div className="type">Type</div>
								<div className="date">Completed</div>
								<div className="score">Score</div>
							</header>
							{this.state.evals.map(evaluation =>
								<Link key={evaluation.id}
									className="table-panel-row"
									to={
										'/evaluations/completed/' + evaluation.id
									}>
									<div className="student">
										<span>{evaluation.student.name}</span>
									</div>
									<div className="evaluator">
										<span>{evaluation.user.email}</span>
									</div>
									<div className="type">
										<span>{evaluation.type.name}</span>
									</div>
									<div className="date">
										<span>{formatDate(evaluation.updated_at)}</span>
									</div>
									<div className="score">
										<div className="counter">
											{evaluation.average}
										</div>
									</div>
								</Link>	
							)}
						</div>
					</div>
				</div>
			</section>
		);
	}
}

function formatDate(timestamp) {
	const date = moment(timestamp);
	return date.format('M/D/YY');
}

export default Completed;
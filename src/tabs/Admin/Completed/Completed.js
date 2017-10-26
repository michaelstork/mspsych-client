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

	deleteEval(id) {
		if (!window.confirm(
			'Are you sure you want to delete this evaluation?'
		)) return;

		const state = cloneDeep(this.state);
		state.inProgress = true;
		this.setState(state);

		return axios.delete(
			'/api/evaluations/'+id
		)
		.then(response => {
			const state = cloneDeep(this.state);
			state.inProgress = false;
			state.evals = state.evals.filter(
				evaluation => evaluation.id !== id
			);

			this.setState(state);
			this.props.notify('Evaluation deleted');

			return response;
		})
		.catch(error => {
			console.log(error);
		});
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
							<a href={[
									'/api/evaluations/export/completed',
									'?token=',
									localStorage.getItem('mspsychToken')
								].join('')}>
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
									<div className="delete">
										<i className="material-icons"
											onClick={(event) => {event.preventDefault(); this.deleteEval(evaluation.id); }}>
											clear
										</i>
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
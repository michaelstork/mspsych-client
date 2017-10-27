import React from 'react';
import './Outstanding.css';
import cloneDeep from 'lodash/cloneDeep';
import Loader from '../../../components/Loader/Loader';
import moment from 'moment';
import axios from '../../../connection/axios';

class Outstanding extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			evals: [],
			search: '',
			inProgress: false
		};

		this.handleSearch = this.handleSearch.bind(this);

		this.searchTimeout = null;

		switch (process.env.REACT_APP_ENV) {
			case 'development':
				this.exportUrl = 'http://mspsych.localhost/api/evaluations/export/outstanding';
				break;
			case 'staging':
				this.exportUrl = 'http://mspsych.mstork.info/api/evaluations/export/outstanding';
				break;
			case 'production':
				this.exportUrl = 'http://mspsych.mssm.edu/api/evaluations/export/outstanding';
				break;
			default:
				break;
		}
	}

	componentDidMount() {
		this.getOutstandingEvals();
	}

	getOutstandingEvals(search = null) {
		const state = cloneDeep(this.state);
		state.inProgress = true;
		this.setState(state);

		return axios.get(
			'/api/evaluations/outstanding' + (search ? '?search='+search : '')
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
			this.getOutstandingEvals(this.state.search);
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

	emailAll() {
		console.log('email all');
	}

	sendReminder(id) {
		console.log(id);
	}

	renderEvals() {
		if (!this.state.evals.length && !this.state.inProgress) {
			return (
				<div className="table-panel-row">
					<p>No evaluations found</p>
				</div>
			);
		}

		return (
			this.state.evals.map(evaluation =>
				<div key={evaluation.id} className="table-panel-row">
					<div className="student">
						<span>{evaluation.student.name}</span>
					</div>
					<div className="evaluator">
						<i className="material-icons"
							onClick={() => this.sendReminder(evaluation.user.id)}>
							email
						</i>
						<span>{evaluation.user.email}</span>
					</div>
					<div className="type">
						<span>{evaluation.type.name}</span>
					</div>
					<div className="date">
						<span>{formatDate(evaluation.created_at)}</span>
					</div>
					<div className="delete">
						<i className="material-icons"
							onClick={() => this.deleteEval(evaluation.id)}>
							clear
						</i>
					</div>
				</div>	
			)
		);
	}

	render() {
		return (
			<section>
				<h2>Outstanding Evaluations</h2>
				<div className="panel-content">
					<div className="panel-item table-panel-item outstanding-evals-table-item">
						<header>
							<input
								type="text"
								onChange={this.handleSearch}
								value={this.state.search}
								placeholder="Search" />
						</header>
						<div className="table-panel-actions">
							<a onClick={this.emailAll}>
								<i className="material-icons">email</i>
								<span>Email All</span>
							</a>
							<a href={[
									this.exportUrl,
									'?token=',
									localStorage.getItem('mspsychToken')
								].join('')}>
								<i className="material-icons">description</i>
								<span>Export Spreadsheet</span>
							</a>
							<Loader loading={this.state.inProgress} />
						</div>
						<div className="table-panel-container">
							<header>
								<div className="student">Student</div>
								<div className="evaluator">Evaluator</div>
								<div className="type">Type</div>
								<div className="date">Assigned</div>
							</header>
							{this.renderEvals()}
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

export default Outstanding;
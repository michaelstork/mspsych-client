import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import axios from '../../../connection/axios';
import {Link} from 'react-router-dom'
import './EvalsHome.css';
import Loader from '../../../components/Loader/Loader';
import StudentPhoto from '../../../components/StudentPhoto';
import cloneDeep from 'lodash/cloneDeep';

class EvalsHome extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			types: [],
			assigned: [],
			stats: {},
			inProgress: true
		};

		this.getPercentOfTotalEvals = this.getPercentOfTotalEvals.bind(this);
	}

	componentDidUpdate(props) {
		if (!props.user && this.props.user) this.getUserEvalsData();
	}

	componentWillMount() {
		if (this.props.user) this.getUserEvalsData();
	}

	getUserEvalsData() {
		const state = cloneDeep(this.state);
		state.inProgress = true;
		this.setState(state);

		return axios.get(
			'/api/evaluations/user/'+this.props.user.id
		).then(response => {
			const state = cloneDeep(this.state);
			state.types = response.data.types;
			state.stats = response.data.stats;
			state.assigned = response.data.assigned;
			state.inProgress = false;

			this.setState(state);
		}).catch(error => {
			console.log(error);
			const state = cloneDeep(this.state);
			state.inProgress = false;
			this.setState(state);
		});
	}

	getPercentOfTotalEvals(count) {
		return parseFloat((count / this.state.stats.completedCount).toFixed(2)) * 100;
	}

	renderAssignedEvals() {
		if (!this.state.assigned.length && !this.state.inProgress) {
			return (
				<div className="assigned-evals">
					<p>You have no assigned evaluations</p>
				</div>
			);
		}

		return (
			<TransitionGroup className="assigned-evals">
				{this.state.assigned.map(evaluation =>
					<CSSTransition
						timeout={200}
						classNames="fade"
						key={evaluation.id}>
						<Link className="eval-card"
							to={this.props.match.url + '/assigned/' + evaluation.id}>
							<p>{evaluation.student.name}</p>
							<StudentPhoto student={evaluation.student} />
							<p>{evaluation.type.name}</p>
						</Link>
					</CSSTransition>
				)}
			</TransitionGroup>
		);
	}

	render() {
		return (
			<section>
				<div className="panel-content">
					<div className="panel-item eval-stats-panel-item">

						<div>
							<span>Total Evaluations Completed:</span>
							<div className="counter">{this.state.stats.completedCount}</div>
							{(this.state.stats.completedCount > 0) &&
								<Link to={this.props.match.url + '/completed'}>
									<span>View Completed Evaluations</span>
								</Link>
							}
						</div>

						{this.state.stats.completedCount >= 4 &&
							<div>
								<span>Evaluations Marked top 25%:</span>
								<div className={(this.getPercentOfTotalEvals(this.state.stats.top25Count) > 25 ? 'warning ' : '') + 'counter'}>
									{this.state.stats.top25Count}
								</div>
								<label>
									<span>{this.getPercentOfTotalEvals(this.state.stats.top25Count)}%</span> - Should not exceed 25%
								</label>
							</div>
						}

						{this.state.stats.completedCount >= 10 &&
							<div>
								<span>Evaluations Marked top 10%:</span>
								<div className={(this.getPercentOfTotalEvals(this.state.stats.top10Count) > 10 ? 'warning ' : '') + 'counter'}>
									{this.state.stats.top10Count}
								</div>
								<label>
									<span>{this.getPercentOfTotalEvals(this.state.stats.top10Count)}%</span> - Should not exceed 10%
								</label>
							</div>
						}
						
					</div>
				</div>
				<h2>
					<span>Assigned Evaluations</span>
					<Loader loading={this.state.inProgress} />
				</h2>
				<div className="panel-content">
					{this.renderAssignedEvals()}
				</div>
				<h2>
					<span>Online Evaluations</span>
					<Loader loading={this.state.inProgress} />
				</h2>
				<div className="panel-content">
					<div className="panel-item eval-types-panel-item">
						<ul>
							{this.state.types.map(type =>
								<li key={type.id}>
									<Link to={this.props.match.url + '/form/' + type.id}>{type.name}</Link>
								</li>
							)}
						</ul>
					</div>
				</div>
				<h2>Evaluations in Word Format</h2>
				<div className="panel-content">
					<div className="panel-item eval-types-panel-item">
						<p>For download and submission by email OR printing</p>
						<ul>
							<li>
								<a href="/api/storage/forms/Inpatient Attending Eval (2015-2016) (Word 97-2003).doc">
									Inpatient (Attending)
								</a>
							</li>
							<li>
								<a href="/api/storage/forms/Inpatient Resident Eval (2015-2016) (Word 97-2003).doc">
									Inpatient (Fellow/Resident)
								</a>
							</li>
							<li>
								<a href="/api/storage/forms/Selective Eval (2015-2016) (Word 97-2003).doc">
									Selective
								</a>
							</li>
							<li>
								<a href="/api/storage/forms/Oral Exam FINAL (2016-2017).docx">
									Oral Exam
								</a>
							</li>
							<li>
								<a href="/api/storage/forms/4th Year Elective Eval 2012-13.doc">
									4th Year Elective
								</a>
							</li>
						</ul>
					</div>
				</div>
			</section>
		);
	}
}

export default EvalsHome;
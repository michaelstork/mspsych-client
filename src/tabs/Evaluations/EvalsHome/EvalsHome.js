import React from 'react';
import axios from '../../../connection/axios';
import {Link} from 'react-router-dom'
import './EvalsHome.css';
import StudentPhoto from '../../../components/StudentPhoto';

class EvalsHome extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			types: [],
			assigned: [],
			stats: {}
		};
	}

	componentDidUpdate(props) {
		if (!props.user && this.props.user) this.getUserEvalsData();
	}

	componentDidMount() {
		if (this.props.user) this.getUserEvalsData();
	}

	getUserEvalsData() {
		return axios.get(
			'/api/evaluations/user/'+this.props.user.id
		).then(response => {
			this.setState(Object.assign(
				{},
				this.state,
				{
					types: response.data.types,
					stats: response.data.stats,
					assigned: response.data.assigned
				}
			));
		}).catch(error => {
			console.log(error);
		});
	}

	render() {
		return (
			<section>
				<div className="panel-content">
					<div className="panel-item eval-stats-panel-item">

						<div>
							<span>Total Evaluations Completed:</span>
							<div className="counter">{this.state.stats.completedCount}</div>
							<Link to={this.props.match.url + '/completed'}>
								<span>View Completed Evaluations</span>
							</Link>
						</div>

						{this.state.stats.completedCount >= 4 &&
							<div>
								<span>Evaluations Marked top 25%:</span>
								<div className={(this.state.stats.top25Percent > 25 ? 'warning ' : '') + 'counter'}>1</div>
								<label><span>{this.state.stats.top25Percent}%</span> - Should not exceed 25%</label>
							</div>
						}

						{this.state.stats.completedCount >= 10 &&
							<div>
								<span>Evaluations Marked top 10%:</span>
								<div className={(this.state.stats.top10Percent > 10 ? 'warning ' : '') + 'counter'}>1</div>
								<label><span>{this.state.stats.top10Percent}%</span> - Should not exceed 10%</label>
							</div>
						}
						
					</div>
				</div>
				<h2>Assigned Evaluations</h2>
				<div className="panel-content">
					<div className="assigned-evals">
						{this.state.assigned.map(evaluation =>
							<Link to={this.props.match.url + '/assigned/' + evaluation.id} key={evaluation.id} className="eval-card">
								<p>{evaluation.student.name}</p>
								<StudentPhoto student={evaluation.student} />
								<p>{evaluation.type.name}</p>
							</Link>
						)}
					</div>
				</div>
				<h2>Online Evaluations</h2>
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
								<a href="/api/storage/forms/Inpatient Attending Eval (2015-2016) (Word 97-2003).doc">Inpatient (Attending)</a>
							</li>
							<li>
								<a href="/api/storage/forms/Inpatient Resident Eval (2015-2016) (Word 97-2003).doc">Inpatient (Fellow/Resident)</a>
							</li>
							<li>
								<a href="/api/storage/forms/Selective Eval (2015-2016) (Word 97-2003).doc">Selective</a>
							</li>
							<li>
								<a href="/api/storage/forms/Oral Exam FINAL (2016-2017).docx">Oral Exam</a>
							</li>
							<li>
								<a href="/api/storage/forms/4th Year Elective Eval 2012-13.doc">4th Year Elective</a>
							</li>
						</ul>
					</div>
				</div>
			</section>
		);
	}
}

export default EvalsHome;
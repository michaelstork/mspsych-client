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
			assigned: []
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
					completedCount: response.data.completedCount,
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
				<h2>Your Evaluations</h2>
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
							<li><Link to={this.props.match.url + '/form/' + 1}>Inpatient (Attending)</Link></li>
							<li><Link to={this.props.match.url + '/form/' + 2}>Inpatient (Fellow/Resdient)</Link></li>
							<li><Link to={this.props.match.url + '/form/' + 3}>Selective</Link></li>
							<li><Link to={this.props.match.url + '/form/' + 4}>Oral Exam</Link></li>
							<li><Link to={this.props.match.url + '/form/' + 5}>4th Year Elective</Link></li>
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
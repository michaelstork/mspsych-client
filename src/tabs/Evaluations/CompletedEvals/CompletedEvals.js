import React from 'react';
import './CompletedEvals.css';
import {Link} from 'react-router-dom'
import axios from '../../../connection/axios';
import moment from 'moment';

class CompletedEvals extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			evals: []
		};
	}

	componentDidUpdate(props) {
		if (!props.user && this.props.user) this.getUserCompletedEvals();
	}

	componentDidMount() {
		if (this.props.user) this.getUserCompletedEvals();
	}

	getUserCompletedEvals() {
		return axios.get(
			'/api/evaluations/user/'+this.props.user.id+'/completed'
		).then(response => {
			this.setState(Object.assign(
				{},
				this.state,
				{evals: response.data}
			));
		}).catch(error => {
			console.log(error);
		});
	}

	render() {
		return (
			<section>
				<div className="panel-content completed-evals">
					{this.state.evals.map(evaluation =>
						<Link to={this.props.match.url + '/' + evaluation.id} key={evaluation.id} className="panel-item completed-eval-panel-item">
							<div>
								<p className="student-name">{evaluation.student.name}</p>
								<p className="eval-date">{formatDate(evaluation.created_at)}</p>
							</div>
							<p className="eval-type">{evaluation.type.name}</p>
						</Link>
					)}
				</div>
			</section>
		);
	}
}

function formatDate(timestamp) {
	const date = moment(timestamp);
	return date.format('M/D/YY');
}

export default CompletedEvals;
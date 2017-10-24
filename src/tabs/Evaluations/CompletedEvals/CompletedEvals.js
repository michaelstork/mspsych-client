import React from 'react';
import './CompletedEvals.css';
import {Link} from 'react-router-dom'
import CSSTransition from 'react-transition-group/CSSTransition';
import axios from '../../../connection/axios';
import moment from 'moment';
import cloneDeep from 'lodash/cloneDeep';

class CompletedEvals extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			evals: []
		};
	}

	componentDidUpdate(props) {
		if (!props.user && this.props.user) {
			this.getUserCompletedEvals();
		}
	}

	componentDidMount() {
		if (this.props.user) {
			this.getUserCompletedEvals();
		}
	}

	getUserCompletedEvals() {
		return axios.get(
			'/api/evaluations/user/'+this.props.user.id+'/completed'
		)
		.then(response => {
			const state = cloneDeep(this.state);
			state.evals = response.data;
			this.setState(state);
		})
		.catch(error => {
			console.log(error);
		});
	}

	render() {
		return (
			<section>
				<Link to={'/evaluations'} className="back-link">
					<i className="material-icons">arrow_back</i>
					<span>Evaluations</span>
				</Link>

				<CSSTransition
	                in={this.state.evals.length > 0}
	                classNames="fade"
	                mountOnEnter={true}
	                unmountOnExit={true}
	                timeout={350}>
					<div className="panel-content completed-evals">
						{this.state.evals.map(evaluation =>
							<Link className="panel-item completed-eval-panel-item"
								to={
									this.props.match.url + '/' + evaluation.id
								}
								key={evaluation.id}>
								<div className="eval-info-container">
									<p className="student-name">{evaluation.student.name}</p>
									<p className="eval-type-date">
										{evaluation.type.name} - {formatDate(evaluation.updated_at)}
									</p>
								</div>
								<div className="average-score-container">
									<p>Average Score:</p>
									<div className="counter">
										{parseFloat(evaluation.average.toFixed(2))}
									</div>
								</div>
							</Link>
						)}
					</div>
				</CSSTransition>
			</section>
		);
	}
}

function formatDate(timestamp) {
	const date = moment(timestamp);
	return date.format('M/D/YY');
}

export default CompletedEvals;
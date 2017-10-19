import React from 'react';
import './CompletedEval.css';
import axios from '../../../connection/axios';
import moment from 'moment';

class CompletedEval extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			evaluation: null
		};
	}

	componentDidUpdate(props) {
		if (!props.user && this.props.user) this.getCompletedEval();
	}

	componentDidMount() {
		if (this.props.user) this.getCompletedEval();
	}

	getCompletedEval() {
		axios.get(
			'/api/evaluations/'+this.props.match.params.evalId+'/results'
		).then(response => {
			this.setState(Object.assign({}, this.state, {evaluation: response.data}));
		}).catch(error => {
			console.log(error);
		})
	}

	render() {
		const evaluation = this.state.evaluation;
		if (!evaluation) return null;

		return (
			<div className="completed-eval">
				<header>
					<h2>{evaluation.type.title}</h2>
				</header>
				<div className="panel-item eval-info">
					<div>
						<label>Student:</label>
						<p>{evaluation.student.name}</p>
					</div>
					<div>
						<label>Evaluator:</label>
						<p>{evaluation.user.email}</p>
					</div>
					<div>
						<label>Date:</label>
						<p>{formatDate(evaluation.created_at)}</p>
					</div>
				</div>
				{evaluation.type.item_categories.map(category =>
					<div className="panel-item item-category" key={category.id}>
						<header>
							<h5>{category.title}</h5>
						</header>
						{category.items.map(item => 
							<div className={'eval-item-'+item.type + ' eval-item'} key={item.id}>
								<p className="eval-item-title">
									{item.content}
								</p>
								{item.type === 'numerical' && item.responses[0].value !== null &&
									<p className="eval-item-response counter">
										{item.responses[0].value}
									</p>
								}
								{item.type === 'text' &&
									<p className="eval-item-response">
										{item.responses[0].value}
									</p>
								}
							</div>
						)}
					</div>
				)}
			
			</div>
		);
	}
}

function formatDate(timestamp) {
	const date = moment(timestamp);
	return date.format('M/D/YY');
}

export default CompletedEval;
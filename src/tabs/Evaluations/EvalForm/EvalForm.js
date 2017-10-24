import React from 'react';
import './EvalForm.css';
import axios from '../../../connection/axios';
import CSSTransition from 'react-transition-group/CSSTransition';
import moment from 'moment';
import {withRouter} from 'react-router';

import InpatientForm from '../../../evals/Inpatient';
import SelectiveForm from '../../../evals/Selective';
import OralExamForm from '../../../evals/OralExam';
import FourthYearElectiveForm from '../../../evals/FourthYearElective';

class EvalForm extends React.Component {
	constructor(props) {
		super(props);

		const date = moment();

		this.state = {
			form: null,
			date: date.format('M/D/YY')
		};

		this.renderForm = this.renderForm.bind(this);
		this.submitEval = this.submitEval.bind(this);
	}

	componentDidMount() {
		const {evalId, typeId} = this.props.match.params;

		axios.get(
			'/api/evaluations/'+ (evalId ? evalId : 'type/'+typeId)
		).then(response => {
			this.setState(Object.assign({}, this.state, {form:response.data}));
		}).catch(error => {
			console.log(error);
		});
	}

	submitEval(info, items) {

		if (!validateResponsesCount(this.state.form.type.item_categories, items)) {
			alert('Please fill out the entire form');
			return;
		}

		const data = Object.assign(
			{},
			{
				evalId: (this.state.form.id || null),
				evalTypeId: this.state.form.type.id,
				userId: this.props.user.id,
				date: this.state.date,
				items: items
			},
			info
		);

		axios.post(
			'/api/evaluations',
			data
		).then(response => {
			this.props.notify('Evaluation submitted');
			this.props.history.push('/evaluations');
		}).catch(error => {
			console.log(error);
		});
	}

	renderForm(typeId) {
		switch (typeId) {
			case 1:
				return <InpatientForm form={this.state.form} evaluator={this.props.user.email} date={this.state.date} submitEval={this.submitEval} />
			case 2:
				return <InpatientForm form={this.state.form} evaluator={this.props.user.email} date={this.state.date} submitEval={this.submitEval} />
			case 3:
				return <SelectiveForm form={this.state.form} evaluator={this.props.user.email} date={this.state.date} submitEval={this.submitEval} />
			case 4:
				return <OralExamForm form={this.state.form} evaluator={this.props.user.email} date={this.state.date} submitEval={this.submitEval} />
			case 5:
				return <FourthYearElectiveForm form={this.state.form} evaluator={this.props.user.email} date={this.state.date} submitEval={this.submitEval} />
			default:
				return null;
		}
	}

	render() {
		return (
			<section>
				<div className="panel-content">
					<CSSTransition
		                in={this.state.form !== null}
		                classNames="fade"
		                mountOnEnter={true}
		                unmountOnExit={true}
		                timeout={250}>
						<div className="eval-form">
							<header>
								<h2>{this.state.form && this.state.form.type.title}</h2>
							</header>
							{this.state.form && this.renderForm(this.state.form.type.id)}
						</div>
					</CSSTransition>
				</div>
			</section>
		);
	}
}

function validateResponsesCount(categories, responses) {
	const itemIds = categories.reduce((itemIds, category) => {
		return itemIds.concat(
			category.items.reduce((categoryItemIds, item) => {
				categoryItemIds.push(item.id);
				return categoryItemIds;
			}, [])
		);
	}, []);

	return (Object.keys(responses).length === itemIds.length);
}

export default withRouter(EvalForm);
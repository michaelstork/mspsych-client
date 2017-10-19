import React from 'react';
import moment from 'moment';
import axios from '../connection/axios';
import {withRouter} from 'react-router';

class Inpatient extends React.Component {
	constructor(props) {
		super(props);

		const date = moment();

		this.state = {
			student: props.form.student ? props.form.student.name : '',
			evaluator: props.user.email,
			date: date.format('M/D/YY'),
			items: {}
		};

		this.handleInfoItemChange = this.handleInfoItemChange.bind(this);
		this.handleItemChange = this.handleItemChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInfoItemChange(event) {
		const change = {};
		change[event.target.name] = event.target.value;
		this.setState(Object.assign({}, this.state, change));
	}

	handleItemChange(id, value) {
		const items = Object.assign({}, this.state.items);
		items[id] = value;
		this.setState(Object.assign({}, this.state, {items: items}));
	}

	handleSubmit(event) {
		event.preventDefault();

		if (!validateResponsesCount(this.props.form.type.item_categories, this.state.items)) {
			alert('Please fill out the entire form');
			return;
		}

		const data = {
			evalId: (this.props.form.id || null),
			evalTypeId: this.props.form.type.id,
			userId: this.props.user.id,
			studentName: this.state.student,
			date: this.state.date,
			items: this.state.items
		};

		axios.post(
			'/api/evaluations',
			data
		).then(response => {
			console.log(response.data);
			this.props.history.push('/evaluations');
		}).catch(error => {
			console.log(error);
		});
	}

	render() {
		const form = this.props.form;

		return (
			<div className="eval-form">
				<header>
					<h2>{form.type.title}</h2>
				</header>
				<form name="eval" onSubmit={this.handleSubmit}>
					<div className="panel-item eval-info">
						<div className="input-container">
							<label>Student:</label>
							<input type="text"
								onChange={this.handleInfoItemChange}
								name="student"
								value={this.state.student}
								readOnly={form.student}
								required />
						</div>
						<div className="input-container">
							<label>Evaluator:</label>
							<input type="text"
								onChange={this.handleInfoItemChange}
								name="evaluator"
								value={this.state.evaluator}
								readOnly
								required />
						</div>
						<div className="input-container">
							<label>Date:</label>
							<input type="text"
								onChange={this.handleInfoItemChange}
								name="date"
								value={this.state.date}
								readOnly
								required />
						</div>
					</div>
					{this.props.form.type.item_categories.map(category =>
						<div className="panel-item item-category" key={category.id}>
							<header>
								<h5>{category.title}</h5>
							</header>
							{category.items.map(item => 
								<div className="eval-item" key={item.id}>
									<p className="eval-item-title">
										{item.content}
										{item.options.filter(option => option.value === null).map(option =>
											<label className="input-container" key={option.id}>
												<input type="radio"
													onChange={() => this.handleItemChange(item.id, option.value)}
													checked={this.state.items[item.id] === option.value} />
												<span>{option.content}</span>
											</label>
										)}
									</p>
									{item.type === 'numerical' &&
										<div className="eval-item-options">
											{item.options.filter(option => option.value !== null).map(option =>
												<div key={option.id}
													onClick={() => this.handleItemChange(item.id, option.value)}
													className={
														(this.state.items[item.id] === option.value ? 'selected ' : '') + 'eval-item-option'
													}>
													{option.content}
												</div>
											)}
										</div>
									}
									{item.type === 'text' &&
										<div className="eval-item-textarea input-container">
											<textarea required
												onChange={(event) => this.handleItemChange(item.id, event.target.value)}>
											</textarea>
										</div>
									}
								</div>
							)}
						</div>
					)}
					<button type="submit">Submit Evaluation</button>
				</form>
			</div>
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

export default withRouter(Inpatient);
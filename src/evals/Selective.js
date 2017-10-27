import React from 'react';
import assign from 'lodash/assign';
import EvalFormInfo from '../partials/EvalForm/EvalFormInfo';
import EvalFormCategory from '../partials/EvalForm/EvalFormCategory';

class Selective extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			student: props.form.student ? props.form.student.name : '',
			selective: '',
			items: {}
		};

		this.handleInfoItemChange = this.handleInfoItemChange.bind(this);
		this.handleItemChange = this.handleItemChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInfoItemChange(event) {
		const change = {};
		change[event.target.name] = event.target.value;
		this.setState(assign({}, this.state, change));
	}

	handleItemChange(id, value) {
		const items = assign({}, this.state.items);
		items[id] = value;
		this.setState(assign({}, this.state, {items: items}));
	}

	handleSubmit(event) {
		event.preventDefault();

		const info = {
			studentName: this.state.student,
			selective: this.state.selective
		};

		this.props.submitEval(info, this.state.items);
	}

	render() {
		const form = this.props.form;

		return (
			<form name="eval" onSubmit={this.handleSubmit}>
				<EvalFormInfo handleInfoItemChange={this.handleInfoItemChange} student={this.state.student} {...this.props}>
					<div className="panel-item eval-info-panel-item">
						<div className="input-container">
							<label>Selective:</label>
							<select onChange={this.handleInfoItemChange} name="selective" required>
								<option value=''>Select</option>
								<option value="Psychiatry Consultation/Liaison Service">Psychiatry Consultation/Liaison Service</option>
								<option value="Psychiatry Emergency Services">Psychiatry Emergency Services</option>
								<option value="Continuing Day Treatment Program">Continuing Day Treatment Program</option>
								<option value="Geriatric Psychiatry Clinic">Geriatric Psychiatry Clinic</option>
								<option value="Child Psychiatry Consultation/Liaison Service">Child Psychiatry Consultation/Liaison Service</option>
								<option value="IMA Psychiatry">IMA Psychiatry</option>
								<option value="Jack Martin Clinic">Jack Martin Clinic</option>
								<option value="other">Other</option>
							</select>
						</div>
					</div>
				</EvalFormInfo>

				{this.props.form.type.item_categories.map(category =>
					<EvalFormCategory category={category} handleItemChange={this.handleItemChange} items={this.state.items} key={category.id} />
				)}

				<button type="submit">Submit Evaluation</button>
			</form>
		);
	}
}

export default Selective;
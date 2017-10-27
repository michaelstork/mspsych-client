import React from 'react';
import assign from 'lodash/assign';
import EvalFormInfo from '../partials/EvalForm/EvalFormInfo';
import EvalFormCategory from '../partials/EvalForm/EvalFormCategory';

class FourthYearElective extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			student: props.form.student ? props.form.student.name : '',
			site: '',
			homeSchool: '',
			electiveStartDate: '',
			electiveLength: '',
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
			site: this.state.site,
			homeSchool: this.state.homeSchool,
			electiveStartDate: this.state.electiveStartDate,
			electiveLength: this.state.electiveLength
		};

		this.props.submitEval(info, this.state.items);
	}

	render() {
		const form = this.props.form;

		return (
			<form name="eval" onSubmit={this.handleSubmit}>
			<EvalFormInfo handleInfoItemChange={this.handleInfoItemChange} student={this.state.student} {...this.props}>
					<div className="panel-item eval-info-panel-item fourth-year-elective-info">
						<div className="input-container">
							<label>Site:</label>
							<select onChange={this.handleInfoItemChange} name="site" required>
								<option value=''>Select Site</option>
								<option value="Inpatient Psychiatry">Inpatient Psychiatry</option>
								<option value="Consult/Liason">Consult/Liason</option>
								<option value="Outpatient Psychiatry Department">Outpatient Psychiatry Department</option>
								<option value="Psychiatric Emergency Room">Psychiatric Emergency Room</option>
								<option value="other">Other</option>
							</select>							
						</div>
						<div className="input-container">
							<label>Home School:</label>
							<select onChange={this.handleInfoItemChange} name="homeSchool" required>
								<option value=''>Select School</option>
								<option value="Sinai Student">Sinai Student</option>
								<option value="Visiting Student">Visiting Student</option>
							</select>
						</div>
					</div>
					<div className="panel-item eval-info-panel-item fourth-year-elective-info">
						<div className="input-container">
							<label>Elective Start Date:</label>
							<input type="text" name="electiveStartDate" value={this.state.electiveStartDate} onChange={this.handleInfoItemChange} required />
						</div>
						<div className="input-container">
							<label>Elective Length:</label>
							<input type="text" name="electiveLength" value={this.state.electiveLength} onChange={this.handleInfoItemChange} required />
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

export default FourthYearElective;
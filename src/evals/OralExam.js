import React from 'react';
import assign from 'lodash/assign';
import EvalFormInfo from '../partials/EvalForm/EvalFormInfo';
import EvalFormCategory from '../partials/EvalForm/EvalFormCategory';

class OralExam extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			student: props.form.student ? props.form.student.name : '',
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
			studentName: this.state.student
		};

		this.props.submitEval(info, this.state.items);
	}

	render() {
		const form = this.props.form;

		return (
			<form name="eval" onSubmit={this.handleSubmit}>
				<EvalFormInfo handleInfoItemChange={this.handleInfoItemChange} student={this.state.student} {...this.props} />

				{this.props.form.type.item_categories.map(category =>
					<EvalFormCategory category={category} handleItemChange={this.handleItemChange} items={this.state.items} key={category.id} />
				)}

				<button type="submit">Submit Evaluation</button>
			</form>
		);
	}
}

export default OralExam;
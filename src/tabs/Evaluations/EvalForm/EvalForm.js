import React from 'react';
import './EvalForm.css';
import axios from '../../../connection/axios';

import InpatientForm from '../../../evals/Inpatient';

class EvalForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			form: null
		};

		this.renderForm = this.renderForm.bind(this);
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

	renderForm(typeId) {
		switch (typeId) {
			case 1:
				return <InpatientForm form={this.state.form} user={this.props.user} />
			case 2:
				return <InpatientForm form={this.state.form} user={this.props.user} />
			default:
				return null;
		}
	}

	render() {
		return (
			<section>
				<div className="panel-content">
					{this.state.form && this.renderForm(this.state.form.type.id)}
				</div>
			</section>
		);
	}
}

export default EvalForm;
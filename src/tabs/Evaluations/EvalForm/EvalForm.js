import React from 'react';
import './EvalForm.css';
import axios from '../../../connection/axios';

class EvalForm extends React.Component {
	constructor(props) {
		super(props);
		console.log(props);
		this.state = {
			form: null
		};

		this.renderForm = this.renderForm.bind(this);
	}

	componentDidMount() {
		const {evalId, typeId} = this.props.match.params;
		console.log(this.props.match.params);

		axios.get(
			'/api/evaluations/'+ (evalId ? evalId : 'type/'+typeId)
		).then(response => {
			this.setState(Object.assign({}, this.state, {form:response.data}));
			console.log(this.state);
		}).catch(error => {
			console.log(error);
		});
	}

	renderForm() {
		return (
			<div>
				<h2>{this.state.form.type.title}</h2>
			</div>
		);
	}

	render() {
		return (
			<section>
				<div className="panel-content">
					{this.state.form && this.renderForm()}
				</div>
			</section>
		);
	}
}

export default EvalForm;
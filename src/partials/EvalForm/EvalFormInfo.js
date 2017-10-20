import React from 'react';

const EvalFormInfo = (props) => (
	<div className="panel-item eval-info">
		<div className="input-container">
			<label>Student:</label>
			<input type="text"
				onChange={props.handleInfoItemChange}
				name="student"
				value={props.student}
				readOnly={props.form.student}
				required />
		</div>
		<div className="input-container">
			<label>Evaluator:</label>
			<input type="text"
				name="evaluator"
				value={props.evaluator}
				readOnly
				required />
		</div>
		<div className="input-container">
			<label>Date:</label>
			<input type="text"
				name="date"
				value={props.date}
				readOnly
				required />
		</div>
	</div>
)

export default EvalFormInfo;
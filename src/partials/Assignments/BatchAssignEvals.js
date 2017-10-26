import React from 'react';
import cloneDeep from 'lodash/cloneDeep';

class BatchAssignEvals extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			file: null
		};

		this.handleSubmit     = this.handleSubmit.bind(this);
		this.handleFileSelect = this.handleFileSelect.bind(this);

		this.fileInput = null;
		this.form = null
	}

	handleFileSelect(event) {
		const state = cloneDeep(this.state);
		state.file = this.fileInput.files[0];
		this.setState(state);
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.upload(this.state.file)
			.then(response => {
				const state = cloneDeep(this.state);
				state.file = null;
				this.setState(state);
				this.form.reset();
			});
	}

	render() {
		return (
			<div className="upload-spreadsheet panel-item">
				<form name="uploadSpreadsheet"
					onSubmit={this.handleSubmit}
					ref={(ref) => this.form = ref}>
					<p>Upload a spreadsheet (.xlsx, or .csv) with column headers: student, evaluator, type</p>
					<div className="input-container">
						<label>Upload Spreadsheet:</label>
						<input
							type="file"
							name="spreadsheet"
							ref={(ref) => this.fileInput = ref}
							onChange={this.handleFileSelect} />
					</div>
					<div className="button-container">
						<button type="submit"
							disabled={!this.state.file}>
							Upload
						</button>
					</div>
				</form>
			</div>
		);
	}
}

export default BatchAssignEvals;
import React from 'react';
import cloneDeep from 'lodash/cloneDeep';

class BatchCreateStudents extends React.Component {
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
			<div className="upload-zip panel-item">
				<form name="uploadZip"
					onSubmit={this.handleSubmit}
					ref={(ref) => this.form = ref}>
					<p>Upload a .zip file containing student photos, with filenames corresponding to the students' names.</p>
					<div className="input-container">
						<label>Upload Photo Archive:</label>
						<input
							type="file"
							name="zip"
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

export default BatchCreateStudents;
import React from 'react';

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
		this.setState(Object.assign({}, this.state, {file: this.fileInput.files[0]}));
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.upload(this.state.file)
			.then(response => {
				this.setState(Object.assign({}, this.state, {file: null}));
				this.form.reset();
			});
	}

	render() {
		return (
			<div className="upload-zip panel-item">
				<form onSubmit={this.handleSubmit} name="uploadZip" ref={(ref) => this.form = ref}>
					<div className="input-container">
						<label>Upload Archive:</label>
						<input
							type="file"
							name="zip"
							ref={(ref) => this.fileInput = ref}
							onChange={this.handleFileSelect} />
					</div>
					<p>Upload a .zip file containing student photos, with filenames corresponding to the students' names.</p>
					<div className="button-container">
						<button type="submit" disabled={!this.state.file}>Upload</button>
					</div>
				</form>
			</div>
		);
	}
}

export default BatchCreateStudents;
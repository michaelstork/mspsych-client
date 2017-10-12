import React from 'react';

class PhotoUpload extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			file: null
		};

		this.handleSubmit     = this.handleSubmit.bind(this);
		this.handleFileSelect = this.handleFileSelect.bind(this);

		this.fileInput = null;
		this.form = null;
	}

	handleFileSelect(event) {
		this.setState(Object.assign({}, this.state, {file: this.fileInput.files[0]}));
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.upload(
			this.props.id,
			this.state.file
		).then(() => {
			this.setState(Object.assign({}, this.state, {file : null}));
			this.form.reset();
		});
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit} name="uploadPhoto" ref={(ref) => this.form = ref}>
				<div className="input-container photo-upload-container">
					<label>Upload New Photo:</label>
					<div>
						<input
							type="file"
							name="photo"
							ref={(ref) => this.fileInput = ref}
							onChange={this.handleFileSelect}
							tabIndex="1" />
						<button type="submit" disabled={!this.state.file}>Upload</button>
					</div>
				</div>
			</form>
		);
	}
}

export default PhotoUpload;

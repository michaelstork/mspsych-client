import React from 'react';

class CreateDocument extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			categoryId: '',
			url: '',
			file: null
		};

		this.handleChange     = this.handleChange.bind(this);
		this.handleSubmit     = this.handleSubmit.bind(this);
		this.handleFileSelect = this.handleFileSelect.bind(this);

		this.fileInput = null;
	}

	handleChange(event) {
		switch (event.target.name) {
			case 'title':
				this.setState(Object.assign({}, this.state, {title: event.target.value}));
				break;
			case 'categoryId':
				this.setState(Object.assign({}, this.state, {categoryId: event.target.value}));
				break;
			case 'url':
				this.setState(Object.assign({}, this.state, {url: event.target.value}));
				break;
			default:
				return;
		}
	}

	handleFileSelect(event) {
		this.setState(Object.assign({}, this.state, {file: this.fileInput.files[0]}));
	}

	handleSubmit(event) {
		event.preventDefault();
		
		if (this.state.url.length) {
			this.props.createLink(
				this.state.title,
				this.state.categoryId,
				this.state.url
			);
		} else if (this.state.file) {
			this.props.upload(
				this.state.title,
				this.state.categoryId,
				this.state.file
			);
		}

	}

	render() {
		return (
			<div className="upload-file panel-item">
				<form onSubmit={this.handleSubmit} name="uploadFile">
					<div className="input-container">
						<label>File Title:</label>
						<input type="text" name="title" onChange={this.handleChange} tabIndex="1" />
					</div>
					<div className="input-container">
						<label>Category:</label>
						<select name="categoryId" onChange={this.handleChange} tabIndex="2">
							<option value={null}>Select Category</option>
							{this.props.categories.map(category =>
								<option value={category.id} key={category.id}>{category.title}</option>
							)}
						</select>
					</div>
					<div className="input-container">
						<label>URL:</label>
						<input type="url" name="url" onChange={this.handleChange} disabled={this.state.file} tabIndex="4" />
					</div>
					<div className="input-container">
						<label>Select File:</label>
						<input
							type="file"
							name="document"
							ref={(ref) => this.fileInput = ref}
							onChange={this.handleFileSelect}
							disabled={this.state.url.length}
							tabIndex="3" />
					</div>
					<div className="button-container">
						<button onClick={this.props.cancel} className="cancel" type="button">Cancel</button>
						<button type="submit"
							disabled={
								(!this.state.file && !this.state.url.length)
								|| !this.state.categoryId.length
								|| !this.state.title.length}>
							Create
						</button>
					</div>
				</form>
			</div>
		);
	}
}

export default CreateDocument;
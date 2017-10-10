import React from 'react';

class UploadFile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			categoryId: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		switch (event.target.name) {
			case 'title':
				this.setState(Object.assign({}, this.state, {title: event.target.value}));
				break;
			case 'categoryId':
				this.setState(Object.assign({}, this.state, {categoryId: event.target.value}));
				break;
			default:
				return;
		}
	}

	handleSubmit(event) {
		event.preventDefault();
		// this.props.upload(this.state.title);
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
					<div className="button-container">
						<button onClick={this.props.cancel} className="cancel" type="button">Cancel</button>
						<button type="submit" disabled={!this.state.title.length}>Create</button>
					</div>
				</form>
			</div>
		);
	}
}

export default UploadFile;
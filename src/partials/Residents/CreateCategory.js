import React from 'react';

class CreateCategory extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState(Object.assign({}, this.state, {title: event.target.value}));
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.create(this.state.title);
	}

	render() {
		return (
			<div className="create-category panel-item">
				<form onSubmit={this.handleSubmit} name="createCategory">
					<div className="input-container">
						<label>Title:</label>
						<input type="text" name="title" onChange={this.handleChange} tabIndex="1" />
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

export default CreateCategory;
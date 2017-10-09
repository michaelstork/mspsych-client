import React from 'react';

class CreateNews extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			content: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		switch (event.target.name) {
			case 'title':
				this.setState(Object.assign({}, this.state, {title: event.target.value}));
				break;
			case 'content':
				this.setState(Object.assign({}, this.state, {content: event.target.value}));
				break;
			default:
				return;
		}
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.create(this.state.title, this.state.content);
	}

	render() {
		return (
			<div className="create-news news-item">
				<form onSubmit={this.handleSubmit} name="createNews">
					<div className="input-container">
						<label>Title:</label>
						<input type="text" name="title" onChange={this.handleChange} tabIndex="1" />
					</div>
					<div className="input-container textarea">
						<label>Content:</label>
						<textarea name="content" onChange={this.handleChange} tabIndex="2"></textarea>
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

export default CreateNews;
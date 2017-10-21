import React from 'react';
import cloneDeep from 'lodash/cloneDeep';

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
		const state = cloneDeep(this.state);
		state[event.target.name] = event.target.value;
		this.setState(state);
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.create(
			this.state.title,
			this.state.content
		);
	}

	render() {
		return (
			<div className="create-news news-item panel-item">
				<form onSubmit={this.handleSubmit} name="createNews">
					<div className="input-container">
						<label>Title:</label>
						<input
							type="text"
							name="title"
							onChange={this.handleChange}
							tabIndex="1" />
					</div>
					<div className="input-container textarea">
						<label>Content:</label>
						<textarea
							name="content"
							onChange={this.handleChange}
							tabIndex="2">
						</textarea>
					</div>
					<div className="button-container">
						<button
							onClick={this.props.cancel}
							className="cancel"
							type="button">
							Cancel
						</button>
						<button type="submit"
							disabled={!this.state.title.length}>
							Create
						</button>
					</div>
				</form>
			</div>
		);
	}
}

export default CreateNews;
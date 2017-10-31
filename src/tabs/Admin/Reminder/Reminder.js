import React from 'react';
import './Reminder.css';
import Loader from '../../../components/Loader/Loader';
import cloneDeep from 'lodash/cloneDeep';
import axios from '../../../connection/axios';
import {withRouter} from 'react-router';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class Reminder extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			recipients: '',
			subject: '',
			inProgress: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.backToOutstandingEvaluations = this.backToOutstandingEvaluations.bind(this);

		this.quill = null;
	}

	componentDidMount() {
		const state = cloneDeep(this.state);
		state.inProgress = true;
		this.setState(state);

		axios.get(
			'api/notifications/reminder/'+ this.props.userId +'/template'
		)
		.then(response => {
			this.setState({
				recipients: response.data.recipients.join(', '),
				subject   : response.data.subject,
				inProgress: false
			});

			this.quill
				.getEditor()
				.clipboard
				.dangerouslyPasteHTML(
					response.data.template
				);
		})
		.catch(error => {
			console.log(error);
			const state = cloneDeep(this.state);
			state.inProgress = false;
			this.setState(state);
		});
	}

	handleChange(event) {
		const state = cloneDeep(this.state);
		state[event.target.name] = event.target.value;
		this.setState(state);
	}

	handleSubmit(event) {
		event.preventDefault();
		
		const state = cloneDeep(this.state);
		state.inProgress = true;
		this.setState(state);

		axios.post(
			'/api/notifications/reminder',
			{
				recipients: this.state.recipients,
				subject: this.state.subject,
				template: this.quill.getEditor().container.firstChild.innerHTML
			}
		)
		.then(response => {
			const state = cloneDeep(this.state);
			state.inProgress = false;
			this.setState(state);

			this.props.notify(response.data.message);
			this.props.history.push('/admin/outstanding');
		})
		.catch(error => {
			console.log(error);
			const state = cloneDeep(this.state);
			state.inProgress = false;
			this.setState(state);
		});
	}

	backToOutstandingEvaluations() {
		this.props.history.push('/admin/outstanding');
	}

	render() {
		return (
			<section>
				<h2>
					<span>Send Reminder Email</span>
					<Loader loading={this.state.inProgress} />
				</h2>
				<div className="panel-content">
					<form name="reminder">
						<div className="panel-item reminder-panel-item">
							<div className="input-container textarea">
								<label>To:</label>
								<textarea
									value={this.state.recipients}
									name="recipients"
									onChange={this.handleChange}
									required>
								</textarea>
							</div>
							<div className="input-container">
								<label>Subject:</label>
								<input
									value={this.state.subject}
									type="text"
									name="subject"
									onChange={this.handleChange}
									required />
							</div>
							<div className="input-container quill">
								<label>Content:</label>
								<ReactQuill
									ref={(ref) => this.quill = ref}
									defaultValue={''} />
							</div>
							<div className="button-container">
								<button
									className="cancel"
									type="button"
									onClick={this.backToOutstandingEvaluations}>
									Cancel
								</button>
								<button
									type="submit"
									onClick={this.handleSubmit}>
									Send
								</button>
							</div>
						</div>
					</form>
				</div>
			</section>
		);
	}
}

export default withRouter(Reminder);
import React from 'react';
import './Reminder.css';
import Loader from '../../../components/Loader/Loader';
import cloneDeep from 'lodash/cloneDeep';
import axios from '../../../connection/axios';
import {withRouter} from 'react-router';

class Reminder extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			recipients: '',
			subject: '',
			template: '',
			inProgress: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
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
				template  : response.data.template,
				inProgress: false
			});
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
				template: this.state.template
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
							<div className="input-container textarea">
								<label>Content:</label>
								<textarea
									className="content-input"
									value={this.state.template}
									name="template"
									onChange={this.handleChange}
									required>
								</textarea>
							</div>
							<div className="button-container">
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
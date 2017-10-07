import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import actions from '../actions';
import axios from '../connection/axios';
import {withRouter} from 'react-router';
import AccountUpdate from '../partials/Account/AccountUpdate';

class AccountUpdateContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			current: '',
			password: '',
			confirm: '',
			message: null
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		switch (event.target.name) {
			case 'current':
				this.setState(Object.assign({}, this.state, {current: event.target.value}));
				break;
			case 'password':
				this.setState(Object.assign({}, this.state, {password: event.target.value}));
				break;
			case 'confirm':
				this.setState(Object.assign({}, this.state, {confirm: event.target.value}));
				break;
			default:
				return;
		}
	}

	handleSubmit(event) {
		event.preventDefault();
		axios.post(
			'/api/update-password',
			{
				current: this.state.current,
				password: this.state.password,
				confirm: this.state.confirm
			}
		)
		.then(response => {
			this.setState(Object.assign({}, this.state, {message: response.data.message}));
			setTimeout(() => {
				this.props.actions.logout();
			}, 1500);
		})
		.catch(error => {
			this.setState(Object.assign({}, this.state, {message: error.response.data.message}));
		})
	}

	render() {
		return (
			<AccountUpdate
				current={this.state.current}
				password={this.state.password}
				confirm={this.state.confirm}
				handleChange={this.handleChange}
				handleSubmit={this.handleSubmit}
				message={this.state.message}
			/>
		);
	}
}

const mapStateToProps = state => {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AccountUpdateContainer));
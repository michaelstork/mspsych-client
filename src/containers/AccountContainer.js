import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import authActions from '../actions/auth';
import notificationsActions from '../actions/notifications';
import Account from '../tabs/Account/Account';

class AccountContainer extends React.Component {

	render() {
		return <Account
			user={this.props.user}
			authenticate={this.props.authActions.authenticate}
			logout={this.props.authActions.logout}
			match={this.props.match}
			notify={this.props.notificationsActions.notify} />
	}
}

const mapStateToProps = state => {
    return {
    	user: state.auth.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(
        	authActions,
        	dispatch
        ),
        notificationsActions: bindActionCreators(
        	notificationsActions,
        	dispatch
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer);

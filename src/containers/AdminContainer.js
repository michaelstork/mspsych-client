import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Redirect} from 'react-router-dom'
import notificationsActions from '../actions/notifications';
import Admin from '../tabs/Admin/Admin';

class AdminContainer extends React.Component {

	render() {
		const isAdmin = this.props.user && this.props.user.isAdmin;
		return (
			(isAdmin || this.props.inProgress)
				? <Admin
					user={this.props.user}
					inProgress={this.props.inProgress}
					match={this.props.match}
					notify={this.props.notificationsActions.notify} />
				: <Redirect to="/account" />
		);
	}
}

const mapStateToProps = state => {
    return {
    	user: state.auth.user,
    	inProgress: state.auth.inProgress
    };
}

function mapDispatchToProps(dispatch) {
    return {
        notificationsActions: bindActionCreators(
        	notificationsActions,
        	dispatch
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer);

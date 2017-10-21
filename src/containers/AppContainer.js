import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import authActions from '../actions/auth';
import notificationsActions from '../actions/notifications';
import App from '../App';

class AppContainer extends React.Component {

	componentWillMount() {
	    const token = localStorage.getItem('mspsychToken');
	    
	    if (!token) {
	    	this.props.authActions.logout();
	    	return;
	    }
	    
	    this.props.authActions
	        .reauthenticate()
	        .then(response => {
	            console.log('reauthentication successful');
	        }).catch(response => {
	            console.log('reauthentication failed');
	        });
	}

	render() {
		return <App
			user={this.props.user}
			notifications={this.props.notifications}
			notify={this.props.notificationsActions.notify}
			clearNotification={this.props.notificationsActions.clear}
			incrementNotification={this.props.notificationsActions.increment} />
	}
}

const mapStateToProps = state => {
    return {
    	user: state.auth.user,
    	notifications: state.notifications
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

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);

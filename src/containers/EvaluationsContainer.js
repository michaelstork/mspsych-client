import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Redirect} from 'react-router-dom'
import notificationsActions from '../actions/notifications';
import Evaluations from '../tabs/Evaluations/Evaluations';

class EvaluationsContainer extends React.Component {

	render() {
		return (
			(this.props.user || this.props.inProgress)
				? <Evaluations
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

export default connect(mapStateToProps, mapDispatchToProps)(EvaluationsContainer);

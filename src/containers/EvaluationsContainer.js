import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import Evaluations from '../tabs/Evaluations/Evaluations';

class EvaluationsContainer extends React.Component {

	render() {
		return (
			(this.props.user || this.props.inProgress)
				? <Evaluations user={this.props.user} inProgress={this.props.inProgress} match={this.props.match} />
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

export default connect(mapStateToProps)(EvaluationsContainer);

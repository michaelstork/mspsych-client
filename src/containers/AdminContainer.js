import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import Admin from '../tabs/Admin/Admin';

class AdminContainer extends React.Component {

	render() {
		return (
			((this.props.user && this.props.user.isAdmin) || this.props.inProgress)
				? <Admin user={this.props.user} inProgress={this.props.inProgress} match={this.props.match} />
				: <Redirect to="/account" />
		);
	}
}

const mapStateToProps = state => {
    return state;
}

export default connect(mapStateToProps)(AdminContainer);

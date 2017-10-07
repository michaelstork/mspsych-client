import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import actions from '../actions';
import Account from '../tabs/Account/Account';

class AccountContainer extends React.Component {

	render() {
		return <Account
			user={this.props.user}
			authenticate={this.props.actions.authenticate}
			logout={this.props.actions.logout}
			logoutMessage={this.props.logoutMessage}
			match={this.props.match} />
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer);

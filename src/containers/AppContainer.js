import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import actions from '../actions';
import App from '../App';

class AppContainer extends React.Component {

	componentWillMount() {
	    const token = localStorage.getItem('mspsychToken');
	    
	    if (!token) {
	    	this.props.actions.logout();
	    	return;
	    }
	    
	    this.props.actions
	        .reauthenticate()
	        .then(response => {
	            console.log('reauthentication successful');
	        }).catch(response => {
	            console.log('reauthentication failed:', response.data.message);
	        });
	}

	render() {
		return <App user={this.props.user} />
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

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);

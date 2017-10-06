import React, { Component } from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom'

import './App.css';
import Header from './partials/Header/Header';
import Home from './tabs/Home/Home';
import Residents from './tabs/Residents/Residents';
import Evaluations from './tabs/Evaluations/Evaluations';
import Account from './tabs/Account/Account';
import Admin from './tabs/Admin/Admin';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <div>
                    <Header user={this.props.user} login={this.props.actions.login} logout={this.props.actions.logout} />
                    
                    <div className="app-container">
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/residents" component={Residents} />
                            <Route path="/evaluations" component={Evaluations} />
                            <Route path="/account" component={Account} />
                            <Route path="/admin" component={Admin} />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

const actions = {
    login: function() {
        return {type: 'LOGIN', payload: {email: 'michael@mstork.info'}};
    },
    logout: function() {
        return {type: 'LOGOUT', payload: {email: null}};
    }
};

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

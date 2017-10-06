import React, { Component } from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom'

import './App.css';
import Header from './partials/Header/Header';
import Home from './tabs/Home/Home';
import Residents from './tabs/Residents/Residents';
import Evaluations from './tabs/Evaluations/Evaluations';
import Account from './tabs/Account/Account';
import Admin from './tabs/Admin/Admin';

import axios from './connection/axios';

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
                    <Header inProgress={this.props.inProgress} authenticate={this.props.actions.authenticate} user={this.props.user} />
                    
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

function requestAuth() {
    return {type: 'REQUEST_AUTH'};
}

function receiveAuth(user) {
    return {type: 'RECEIVE_AUTH', payload: user};
}

function authError(errorMessage) {
    return {type: 'AUTH_ERROR', payload: errorMessage};
}

const actions = {
    authenticate: function(email, password) {
        console.log('calling authenticate');
        return function (dispatch) {
            dispatch(requestAuth());

            return axios.post(
                '/api/authenticate',
                {
                    email: email,
                    password: password
                }
            )
            .then(response => {
                console.log('request success, dispatching receiveAuth with result');
                dispatch(receiveAuth(response.data))
            })
            .catch(error => {
                console.log('request error, disaptching authError');
                dispatch(authError(error.message));
            });

        }
    }
};









const mapStateToProps = state => {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

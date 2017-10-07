import React from 'react';
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

import './App.css';
import Header from './partials/Header/Header';
import Home from './tabs/Home/Home';
import Residents from './tabs/Residents/Residents';
import Evaluations from './tabs/Evaluations/Evaluations';
import Account from './tabs/Account/Account';
import Admin from './tabs/Admin/Admin';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import actions from './actions';


class App extends React.Component {

    componentWillMount() {
        const token = localStorage.getItem('mspsychToken');
        if (!token) return;
        
        this.props.actions
            .reauthenticate()
            .then(response => {
                console.log('reauthentication successful');
            }).catch(response => {
                console.log('reauthentication failed:', response.data.message);
            });
    }

    isAdmin() {
        return this.props.user && this.props.user.isAdmin;
    }

    render() {
        return (
            <Router>
                <div>
                    <Header user={this.props.user} />
                    <div className="app-container">
                        <Switch>
                            <Route exact path="/" render={() => <Home user={this.props.user} {...this.props} />} />
                            <Route path="/residents" component={Residents} />
                            <Route path="/evaluations" component={Evaluations} />
                            <Route path="/account" render={() => 
                                <Account
                                    user={this.props.user}
                                    authenticate={this.props.actions.authenticate}
                                    logout={this.props.actions.logout}
                                    {...this.props} />
                            }/>
                            {this.props.user && this.props.user.isAdmin
                                ? <Route path="/admin" component={Admin} />
                                : <Redirect to="/account" />
                            }
                            <Redirect to="/" />
                        </Switch>
                    </div>
                </div>
            </Router>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(App);

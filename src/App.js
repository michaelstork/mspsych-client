import React from 'react';
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

import './App.css';
import Header from './partials/Header/Header';
import Home from './tabs/Home/Home';
import Residents from './tabs/Residents/Residents';
import Evaluations from './tabs/Evaluations/Evaluations';
import AccountContainer from './containers/AccountContainer';
import AdminContainer from './containers/AdminContainer';

const App = (props) => (
    <Router>
        <div>
            <Header user={props.user} />
            <div className="app-container">
                <Switch>
                    <Route path="/" exact render={() => <Home user={props.user} />} />
                    <Route path="/residents" component={Residents} />
                    <Route path="/evaluations" component={Evaluations} />
                    <Route path="/account" component={AccountContainer} />
                    <Route path="/admin" component={AdminContainer} />
                    <Redirect to="/" />
                </Switch>
            </div>
        </div>
    </Router>
)

export default App;
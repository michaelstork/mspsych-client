import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import './App.css';
import Header from './partials/Header/Header';
import Home from './tabs/Home/Home';
import Residents from './tabs/Residents/Residents';
import Evaluations from './tabs/Evaluations/Evaluations';
import Account from './tabs/Account/Account';
import Admin from './tabs/Admin/Admin';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Header />
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

export default App;

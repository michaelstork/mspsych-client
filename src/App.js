import React from 'react';
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

import './App.css';
import Header from './partials/Header/Header';
import Home from './tabs/Home/Home';
import Residents from './tabs/Residents/Residents';
import Evaluations from './tabs/Evaluations/Evaluations';
import AccountContainer from './containers/AccountContainer';
import Admin from './tabs/Admin/Admin';


const App = (props) => (
    <Router>
        <div>
            <Header user={props.user} />
            <div className="app-container">
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/residents" component={Residents} />
                    <Route path="/evaluations" component={Evaluations} />
                    <Route path="/account" component={AccountContainer} />
                    {props.user && props.user.isAdmin
                        ? <Route path="/admin" component={Admin} />
                        : <Redirect to="/account" />
                    }
                    <Redirect to="/" />
                </Switch>
            </div>
        </div>
    </Router>
)

export default App;
import React from 'react';
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import CSSTransition from 'react-transition-group/CSSTransition';

import './App.css';
import Header from './partials/Header/Header';
import Notifications from './components/Notifications/Notifications';
import Home from './tabs/Home/Home';
import Residents from './tabs/Residents/Residents';
import AccountContainer from './containers/AccountContainer';
import AdminContainer from './containers/AdminContainer';
import EvaluationsContainer from './containers/EvaluationsContainer';

const App = (props) => (
    <Router>
        <div>
            <Header user={props.user} />
            <CSSTransition
                in={props.notifications.length > 0}
                classNames="container-slide"
                mountOnEnter={true}
                unmountOnExit={true}
                timeout={250}>
                <Notifications
                    notifications={props.notifications}
                    clearNotification={props.clearNotification} />
            </CSSTransition>
            <div className="app-container">
                <Switch>
                    <Route path="/" exact
                        render={() =>
                            <Home user={props.user} notify={props.notify} />
                        }
                    />
                    <Route path="/residents"
                        render={() =>
                            <Residents user={props.user} notify={props.notify} />
                        }
                    />
                    <Route path="/evaluations" component={EvaluationsContainer} />
                    <Route path="/account" component={AccountContainer} />
                    <Route path="/admin" component={AdminContainer} />
                    <Redirect to="/" />
                </Switch>
            </div>
        </div>
    </Router>
)

export default App;
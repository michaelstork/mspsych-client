import React from 'react';
import {Route, Switch} from 'react-router-dom'
import Panel from '../../components/Panel/Panel';
import './Evaluations.css';

import EvalsHome from './EvalsHome/EvalsHome';
import EvalForm from './EvalForm/EvalForm';

class Evaluations extends React.Component {

	render() {
		return (
			<Panel className="evaluations-panel with-items">
				<Switch>
					<Route exact path={this.props.match.url}
						render={(props) => 
							<EvalsHome match={props.match} user={this.props.user} />
						} />
					<Route path={this.props.match.url + '/assigned/:evalId'}
						render={(props) =>
							<EvalForm match={props.match} user={this.props.user} />
						} />
					<Route path={this.props.match.url + '/form/:typeId'}
						render={(props) =>
							<EvalForm match={props.match} user={this.props.user} />
						} />
				</Switch>
			</Panel>
		);
	}
}

export default Evaluations;
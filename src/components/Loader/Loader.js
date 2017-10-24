import React from 'react';
import loader from './Rolling.svg';
import './Loader.css';
import CSSTransition from 'react-transition-group/CSSTransition';

class Loader extends React.Component {
	constructor(props) {
		super(props);

		this.state = {active: false};
		this.timeout = null;
	}

	componentWillReceiveProps(props) {
		if (props.loading) {
			if (!this.state.active) {
				this.set();	
			}
		} else {
			this.clear();
			this.setState({active: false});
		}
	}

	componentWillUnmount() {
		this.clear();
	}

	clear() {
		clearTimeout(this.timeout);
	}

	set() {
		this.clear();
		this.timeout = setTimeout(
			() => {
				this.setState({active: true});
			},
			(this.props.timeout || 0)
		);
	}

	render() {
		return (
			<CSSTransition
			    in={this.state.active}
			    classNames="fade"
			    mountOnEnter={true}
			    unmountOnExit={true}
			    timeout={150}>
				<img src={loader} alt="Loading" className="loader" />
			</CSSTransition>
		);
	}
}

export default Loader;
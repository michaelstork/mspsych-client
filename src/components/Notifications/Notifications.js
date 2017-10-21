import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import './Notifications.css';

class Notifications extends React.Component {
	constructor(props) {
		super(props);

		this.timers = {};
		this.stopTimer = this.stopTimer.bind(this);
		this.setTimer = this.setTimer.bind(this);
	}

	componentWillReceiveProps(props) {

		if (props.notifications.length > this.props.notifications.length) {
			// remove new notification after timeout
			const id = props.notifications.slice().pop().id;
			this.setTimer(id);
		} else {
			// reset timer on any incremented notifications
			props.notifications.forEach((notification, index) => {
				if (notification.count > this.props.notifications.find(item => item.id === notification.id).count) {
					this.stopTimer(notification.id);
					this.setTimer(notification.id);
				}
			});
		}
	}

	setTimer(id) {
		this.timers[id] = setTimeout(() => {
			this.props.clearNotification(id);
		}, 5000);
	}

	stopTimer(id) {
		clearTimeout(this.timers[id]);
	}

	render() {
		return (
			<div className="notifications-container">
				<TransitionGroup>
					{this.props.notifications.map((notification) =>
						<CSSTransition timeout={300} classNames="slide" key={notification.id}>
							<div className="notification-item" onClick={() => this.stopTimer(notification.id)}>
								<p>{notification.content} ({notification.count})</p>
							</div>
						</CSSTransition>
					)}
				</TransitionGroup>
			</div>
		);
	}
}

export default Notifications;
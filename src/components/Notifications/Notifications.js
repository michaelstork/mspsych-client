import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import './Notifications.css';

class Notifications extends React.Component {
	constructor(props) {
		super(props);

		this.timers = {};
		this.duration = 10000;

		this.closeNotification = this.closeNotification.bind(this);
	}

	componentWillReceiveProps(props) {

		if (props.notifications.length > this.props.notifications.length) {
			// if first notification, set to remove after timeout
			if (!this.props.notifications.length) {
				this.setTimer(props.notifications[0].id);
			}

		} else {
			// reset timer on current notification if it's been incremented
			props.notifications.forEach((notification, index) => {
				if (notification.count > this.props.notifications.find(item => item.id === notification.id).count) {
					if (this.props.notifications[0].id === notification.id) {
						this.stopTimer(notification.id);
						this.setTimer(notification.id);
					}
				}
			});
		}
	}

	setTimer(id) {
		this.timers[id] = setTimeout(() => this.expireNotification(id), this.duration);
	}

	expireNotification(id) {
		// set timer on next notification
		if (this.props.notifications.length > 1) {
			this.setTimer(this.props.notifications[1].id);
		}

		this.props.clearNotification(id);
	}

	closeNotification(id) {
		clearTimeout(this.timers[id]);
		this.expireNotification(id);
	}

	stopTimer(id) {
		clearTimeout(this.timers[id]);
	}

	render() {
		return (
			<CSSTransition
				in={this.props.notifications.length > 0}
				classNames="container-slide"
				mountOnEnter={true}
				unmountOnExit={true}
				timeout={300}>
				<div className="notifications-container">
					<TransitionGroup>
						{this.props.notifications.map((notification) =>
							<CSSTransition timeout={300} classNames="item-slide" key={notification.id}>
								<div className="notification-item">
									<p>{notification.content} ({notification.count})</p>
									<i onClick={() => this.closeNotification(notification.id)} className="material-icons">clear</i>
								</div>
							</CSSTransition>
						)}
					</TransitionGroup>
				</div>
			</CSSTransition>
		);
	}
}

export default Notifications;
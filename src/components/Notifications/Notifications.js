import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import './Notifications.css';

class Notifications extends React.Component {
	constructor(props) {
		super(props);

		this.timers = {};
		this.duration = 3500;
	}

	componentWillReceiveProps(props) {
		if (!props.notifications.length) return;

		if (!this.props.notifications.length) {
			// if first notification, set to remove after timeout
			this.setTimer(props.notifications[0].id);
		} else {
			// reset timer on current notification if it's been incremented
			const currentItem = this.props.notifications[0];
			const currentItemUpdated = props.notifications.find(
				item => item.id === currentItem.id
			);

			if (!currentItemUpdated) return;

			if (currentItemUpdated.count > currentItem.count) {
				this.stopTimer(currentItem.id);
				this.setTimer(currentItem.id);
			}
		}
	}

	setTimer(id) {
		this.timers[id] = setTimeout(
			() => this.expireNotification(id),
			this.duration
		);
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

	renderItem(notification) {
		return (
			<CSSTransition
				timeout={300}
				classNames="item-slide"
				key={notification.id}>
				<div className="notification-item">
					<p>
						<span className="notification-content">
							{notification.content}
						</span>
						{notification.count > 1 &&
							<span className="notification-count">
								({notification.count})
							</span>
						}
					</p>
					<i className="material-icons"
						onClick={() => this.closeNotification(notification.id)}>
						clear
					</i>
				</div>
			</CSSTransition>
		);
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
							this.renderItem(notification)
						)}
					</TransitionGroup>
				</div>
			</CSSTransition>
		);
	}
}

export default Notifications;
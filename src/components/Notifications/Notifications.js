import React from 'react';
import rafScroll from 'raf-scroll';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import './Notifications.css';

class Notifications extends React.Component {
	constructor(props) {
		super(props);

		this.timers = {};
		this.duration = 3500;
		this.container = null;
		this.isFixed = false;
		this.headerHeight = 68;
	}

	componentDidMount() {
		rafScroll.add(event => this.handleScroll(event.scrollY));
		this.setTimer(this.props.notifications[0].id);
	}

	componentWillUnmount() {
		rafScroll.remove();
	}

	componentWillReceiveProps(props) {
		if (!props.notifications.length) return;
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

	handleScroll(scroll) {
		if (scroll > this.headerHeight && !this.isFixed) {
			this.container.classList.add('fixed')
			this.isFixed = true;
		}
		if (scroll < this.headerHeight && this.isFixed) {
			this.container.classList.remove('fixed')
			this.isFixed = false;
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
			<div className="notifications-container"
				ref={(ref) => this.container = ref}>
				<TransitionGroup>
					{this.props.notifications.map((notification) =>
						this.renderItem(notification)
					)}
				</TransitionGroup>
			</div>
		);
	}
}

export default Notifications;
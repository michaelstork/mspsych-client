import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';

const NotificationItem = (props) => (
	<CSSTransition
		timeout={300}
		classNames="item-slide">
		<div className="notification-item">
			<p>
				<span className="notification-content">
					{props.notification.content}
				</span>
				{props.notification.count > 1 &&
					<span className="notification-count">
						({props.notification.count})
					</span>
				}
			</p>
			<i className="material-icons"
				onClick={() => props.close(props.notification.id)}>
				clear
			</i>
		</div>
	</CSSTransition>
)

export default NotificationItem;
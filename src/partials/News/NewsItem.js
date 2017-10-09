import React from 'react';
import Moment from 'react-moment';

const NewsItem = (props) => (
	<div className="news-item">
		{props.user && props.user.isAdmin
			&& <i onClick={() => props.delete(props.item.id)} className="material-icons">clear</i>}
		<h4>{props.item.title}</h4>
		<p className="news-item-author">
			{props.item.user.email} on <Moment format="dddd\, MMM Do \a\t h:mm A">{props.item.created_at}</Moment>
		</p>
		<p className="news-item-content" dangerouslySetInnerHTML={{__html: props.item.content}} />
	</div>
)

export default NewsItem;
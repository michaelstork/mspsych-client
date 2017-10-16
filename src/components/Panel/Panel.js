import React from 'react';
import './Panel.css';

const Panel = (props) => (
	<div className={'panel' + (props.className ? ' ' + props.className : '')}>
		{props.children}
	</div>
)

export default Panel;
import React from 'react';
import './Panel.css';

const Panel = (props) => (
	<section className={'panel' + (props.className ? ' ' + props.className : '')}>
		{props.children}
	</section>
)

export default Panel;
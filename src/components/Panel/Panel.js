import React from 'react';
import './Panel.css';

const Panel = (props) => (
	<section className={props.className + ' panel'}>
		{props.children}
	</section>
)

export default Panel;
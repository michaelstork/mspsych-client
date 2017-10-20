import React from 'react';

const EvalItemTextrea = (props) => (
	<div className="eval-item-textarea input-container">
		<textarea required
			onChange={(event) => props.handleItemChange(props.item.id, event.target.value)}>
		</textarea>
	</div>
)

export default EvalItemTextrea;
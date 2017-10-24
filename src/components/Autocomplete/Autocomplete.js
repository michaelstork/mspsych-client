import React from 'react';
import './Autocomplete.css';
import axios from '../../connection/axios';
import cloneDeep from 'lodash/cloneDeep';

class Autocomplete extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			search: '',
			results: [],
			value: null
		}

		this.handleSearch = this.handleSearch.bind(this);
		this.searchTimeout = null;
	}

	getResults(search = '') {
		if (!search.length) {
			this.setState({search: search, results: []});
			return;
		}

		axios.get(
			this.props.resultBase + search
		)
		.then(response => {
			const state = cloneDeep(this.state);
			state.results = response.data;
			this.setState(state);
		})
		.catch(error => {
			console.log(error);
		});
	}

	handleSearch(event) {
		window.clearTimeout(this.searchTimeout);

		const state = cloneDeep(this.state);
		state.search = event.target.value;
		state.value = null;
		
		this.setState(state);
		this.props.onSelect(null);
		
		this.searchTimeout = window.setTimeout(() => {
			this.getResults(this.state.search);
		}, 350);
	}

	handleSelect(label, value) {
		const state = cloneDeep(this.state);
		state.value = value;
		state.search = label;
		state.results = [];
		this.setState(state);

		this.props.onSelect(value);
	}

	render() {
		return (
			<div className="autocomplete-container">
				<input type="text"
					placeholder="Search..."
					onChange={this.handleSearch}
					value={this.state.search} />
				<div className={
					[
						'autocomplete-results',
						this.state.results.length ? 'active' : ''
					].join(' ')
				}>
					<ul>
						{this.state.results.map(item =>
							<li key={item[this.props.resultValueField]}
								onClick={() =>
									this.handleSelect(
										item[this.props.resultLabelField],
										item[this.props.resultValueField]
									)
								}>
								{item[this.props.resultLabelField]}
							</li>
						)}
					</ul>
				</div>
			</div>
		);
	}
}

export default Autocomplete;
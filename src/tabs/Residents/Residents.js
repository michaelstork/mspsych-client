import React from 'react';
import Panel from '../../components/Panel/Panel';
import './Residents.css';

const Residents = (props) => (
	<Panel>
		<h2>Residents</h2>
		<div className="file-groups">
			<div className="file-group">
				<h3>Resident Resource Materials</h3>
				<ul>
					<li>
						<a>Biopsychosocial Formulation Diagram</a>
					</li>
					<li>
						<a>Guide to the Psychiatric Interview and Writing HPIs</a>
					</li>
					<li>
						<a>Guide to the Mental Status Exam</a>
					</li>
				</ul>
			</div>

			<div className="file-group">
				<h3>Inpatient Resources: IDTPs</h3>
				<ul>
					<li>
						<a>Biopsychosocial Formulation Diagram</a>
					</li>
					<li>
						<a>Guide to the Psychiatric Interview and Writing HPIs</a>
					</li>
					<li>
						<a>Guide to the Psychiatric Interview and Writing HPIs</a>
					</li>
					<li>
						<a>Guide to the Mental Status Exam</a>
					</li>
					<li>
						<a>Guide to the Psychiatric Interview and Writing HPIs</a>
					</li>
				</ul>
			</div>

			<div className="file-group">
				<h3>Inpatient Resources: Risk Assessments</h3>
				<ul>
					<li>
						<a>Biopsychosocial Formulation Diagram</a>
					</li>
					<li>
						<a>Guide to the Psychiatric Interview and Writing HPIs</a>
					</li>
					<li>
						<a>Guide to the Mental Status Exam</a>
					</li>
					<li>
						<a>Guide to the Psychiatric Interview and Writing HPIs</a>
					</li>
				</ul>
			</div>

			<div className="file-group">
				<h3>Resident Resource Materials</h3>
				<ul>
					<li>
						<a>Biopsychosocial Formulation Diagram</a>
					</li>
					<li>
						<a>Guide to the Psychiatric Interview and Writing HPIs</a>
					</li>
					<li>
						<a>Guide to the Mental Status Exam</a>
					</li>
				</ul>
			</div>
		</div>
	</Panel>
)

export default Residents;
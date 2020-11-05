import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class TestChart extends Component {
	constructor(props) {
		super(props);

		this.state = {
			series: [
				{
					name: 'Sanitizers',
					data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
				},
				{
					name: 'Gloves',
					data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
				},
				{
					name: 'Masks',
					data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
				},
				{
					name: 'Gowns',
					data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
				}
			],
			options: {
				chart: {
					height: 350,
					type: 'line',
					zoom: {
						enabled: false
					}
				},
				dataLabels: {
					enabled: false
				},
				stroke: {
					curve: 'straight'
				},
				title: {
					text: 'Product Trends by Month',
					align: 'left'
				},
				grid: {
					row: {
						colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
						opacity: 0.5
					}
				},
				xaxis: {
					categories: [
						'Jan',
						'Feb',
						'Mar',
						'Apr',
						'May',
						'Jun',
						'Jul',
						'Aug',
						'Sep'
					]
				}
			}
		};
	}
	render() {
		return (
			<div className="app">
				<div className="row">
					<div className="mixed-chart">
						<Chart
							options={this.state.options}
							series={this.state.series}
							type="line"
							height="500"
							width="700"
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default TestChart;

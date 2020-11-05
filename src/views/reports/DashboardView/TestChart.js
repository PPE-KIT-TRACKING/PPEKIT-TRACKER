import React, { PureComponent } from 'react';
import Chart from 'react-apexcharts';
import moment from 'moment'
class TestChart extends PureComponent {
	constructor(props) {
		super(props);
		const { activity } = props;
		let data = [[0], [0], [0], [0]];
		let categories = ['started'];
		if (activity) {
			activity.map(act => {
				for (let index = 0; index < 4; index++) {
					let array = data[index];
					if (act.index !== index)
						data[index].push(array[array.length - 1]);
					else data[index].push(act.item.quantity);
				}
				categories.push(
					moment(act.timestamp).format('YYYY-MM-DD HH:mm')
				);
			});
		}
		this.state = {
			series: [
				{
					name: 'Sanitizers',
					data: data[0]
				},
				{
					name: 'Gloves',
					data: data[1]
				},
				{
					name: 'Masks',
					data: data[2]
				},
				{
					name: 'Gowns',
					data: data[3]
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
					text: 'Inventory Updates with time.',
					align: 'left'
				},
				grid: {
					row: {
						colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
						opacity: 0.5
					}
				},
				xaxis: {
					categories: categories
				}
			}
		};
	}
	componentWillReceiveProps(props) {
		console.log("local props", props)
		const { activity } = props;
		let data = [[0], [0], [0], [0]];
		let categories = ['started'];
		if (activity) {
			activity.map(act => {
				for (let index = 0; index < 4; index++) {
					let array = data[index];
					if (act.index !== index)
						data[index].push(array[array.length - 1]);
					else data[index].push(act.item.quantity);
				}
				categories.push(
					moment(act.timestamp).format('YYYY-MM-DD HH:mm')
				);
			});
		}
		this.setState({
			series: [
				{
					name: 'Sanitizers',
					data: data[0]
				},
				{
					name: 'Gloves',
					data: data[1]
				},
				{
					name: 'Masks',
					data: data[2]
				},
				{
					name: 'Gowns',
					data: data[3]
				}
			],
			options: {
				xaxis: {
					categories: categories
				}
			}
		});
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
							height="550"
							width="700"
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default TestChart;

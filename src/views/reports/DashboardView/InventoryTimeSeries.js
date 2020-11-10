import React, { PureComponent } from 'react';
import Chart from 'react-apexcharts';
import moment from 'moment';
import { Box, Card, CardContent, CardHeader, Divider } from '@material-ui/core';
class InventoryTimeSeries extends PureComponent {
	constructor(props) {
		super(props);
		const { activity } = props;
		let data = [[0], [0], [0], [0]];
		let newdata = [];
		let categories = ['started'];
		if (activity) {
			for (let index = 0; index < activity.length; index++) {
				for (
					let index1 = 0;
					index1 < Object.keys(activity[index]).length;
					index1++
				) {
					const currActiv = activity[index][index1];
					data[currActiv.index].push(Number(currActiv.item.quantity));
				}
				if (Object.keys(activity[index]).length > 0)
					categories.push(
						moment(activity[index][0].timestamp).format(
							'YYYY-MM-DD HH:mm'
						)
					);
			}
			let lengthArr = [
				data[0].length,
				data[1].length,
				data[2].length,
				data[3].length
			];
			let maxLen = Math.max(...lengthArr);
			for (let obj of data) {
				newdata.push([...obj]);
			}
			for (let i = 0; i < 4; i++) {
				for (let j = 0; j < maxLen - data[i].length; j++) {
					newdata[i].push(newdata[i][newdata[i].length - 1]);
				}
			}
		}
		this.state = {
			series: [
				{
					name: 'Sanitizers',
					data: newdata[0]
				},
				{
					name: 'Gloves',
					data: newdata[1]
				},
				{
					name: 'Masks',
					data: newdata[2]
				},
				{
					name: 'Gowns',
					data: newdata[3]
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
					curve: 'smooth'
				},
				title: {
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
		console.log('local props', props);
		const { activity } = props;
		let data = [[0], [0], [0], [0]];
		let categories = ['started'];
		let newdata = [];
		if (activity) {
			for (let index = 0; index < activity.length; index++) {
				for (
					let index1 = 0;
					index1 < Object.keys(activity[index]).length;
					index1++
				) {
					const currActiv = activity[index][index1];
					data[currActiv.index].push(Number(currActiv.item.quantity));
				}
				if (Object.keys(activity[index]).length > 0)
					categories.push(
						moment(activity[index][0].timestamp).format(
							'YYYY-MM-DD HH:mm'
						)
					);
			}
			let lengthArr = [
				data[0].length,
				data[1].length,
				data[2].length,
				data[3].length
			];
			let maxLen = Math.max(...lengthArr);
			for (let obj of data) {
				newdata.push([...obj]);
			}
			for (let i = 0; i < 4; i++) {
				for (let j = 0; j < maxLen - data[i].length; j++) {
					newdata[i].push(newdata[i][newdata[i].length - 1]);
				}
			}
		}
		this.setState({
			series: [
				{
					name: 'Sanitizers',
					data: newdata[0]
				},
				{
					name: 'Gloves',
					data: newdata[1]
				},
				{
					name: 'Masks',
					data: newdata[2]
				},
				{
					name: 'Gowns',
					data: newdata[3]
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
			<Card>
				<CardHeader title="Inventory Updates with time." />
				<Divider />
				<CardContent>
					<Box height={560} position="relative">
						<div className="app">
							<div className="row">
								<div className="mixed-chart">
									<Chart
										options={this.state.options}
										series={this.state.series}
										type="line"
										height="540"
										width="600"
									/>
								</div>
							</div>
						</div>
					</Box>
				</CardContent>
			</Card>
		);
	}
}

export default InventoryTimeSeries;

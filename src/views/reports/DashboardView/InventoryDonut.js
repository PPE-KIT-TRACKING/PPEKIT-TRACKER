import React, { PureComponent } from 'react';
import Chart from 'react-apexcharts';
import moment from 'moment';
import { Box, Card, CardContent, CardHeader, Divider } from '@material-ui/core';

class InventoryDonut extends PureComponent {
	constructor(props) {
		super(props);
		const { inventory } = props;
		const series = [];
		const legends = [];
		if (inventory)
			inventory.map(e => {
				series.push(e.quantity);
				legends.push(e.name);
			});
		this.state = {
			series: series,
			options: {
				chart: {
					width: 380,
					type: 'donut'
				},
				plotOptions: {
					pie: {
						startAngle: -45
					}
				},
				dataLabels: {
					enabled: false
				},
				fill: {
					type: 'gradient'
				},
				legend: {
					formatter: function(val, opts) {
						return (
							legends[opts.seriesIndex] +
							'-' +
							opts.w.globals.series[opts.seriesIndex]
						);
					}
				},
				responsive: [
					{
						breakpoint: 480,
						options: {
							chart: {
								width: 200
							},
							legend: {
								position: 'bottom'
							}
						}
					}
				]
			}
		};
	}
	componentWillReceiveProps(props) {
		const { inventory } = props;
		const series = [];
		const legends = [];
		if (inventory)
			inventory.map(e => {
				series.push(e.quantity);
				legends.push(e.name);
			});
		this.state = {
			series: series,
			options: {
				legend: {
					formatter: function(val, opts) {
						return (
							legends[opts.seriesIndex] +
							'-' +
							opts.w.globals.series[opts.seriesIndex]
						);
					}
				}
			}
		};
	}

	render() {
		return (
			<Card>
				<CardHeader title="Percentage of Inventory Items" />
				<Divider />
				<CardContent>
					<Box height={300} position="relative">
						<div className="app">
							<div className="row">
								<div className="mixed-chart">
									<Chart
										options={this.state.options}
										series={this.state.series}
										type="donut"
										width={400}
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

export default InventoryDonut;

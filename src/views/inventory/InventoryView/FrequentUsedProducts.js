import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import {
	Box,
	Card,
	CardContent,
	CardHeader,
	Divider,
	Typography,
	colors,
	makeStyles,
	useTheme
} from '@material-ui/core';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import PhoneIcon from '@material-ui/icons/Phone';
import TabletIcon from '@material-ui/icons/Tablet';

const useStyles = makeStyles(() => ({
	root: {
		height: '100%'
	}
}));

const FrequentUsedProducts = ({ className, ...rest }) => {
	const classes = useStyles();
	const theme = useTheme();

	const data = {
		datasets: [
			{
				data: [63, 15, 22],
				backgroundColor: [
					colors.indigo[500],
					colors.red[600],
					colors.orange[600],
					colors.green[500],
					colors.blue
				],
				borderWidth: 8,
				borderColor: colors.common.white,
				hoverBorderColor: colors.common.white
			}
		],
		labels: ['Desktop', 'Tablet', 'Mobile']
	};

	const options = {
		animation: false,
		cutoutPercentage: 80,
		layout: { padding: 0 },
		legend: {
			display: false
		},
		maintainAspectRatio: false,
		responsive: true,
		tooltips: {
			backgroundColor: theme.palette.background.default,
			bodyFontColor: theme.palette.text.secondary,
			borderColor: theme.palette.divider,
			borderWidth: 1,
			enabled: true,
			footerFontColor: theme.palette.text.secondary,
			intersect: false,
			mode: 'index',
			titleFontColor: theme.palette.text.primary
		}
	};

	const products = [
		{
			title: 'Desktop',
			value: 63,
			icon: LaptopMacIcon,
			color: colors.indigo[500]
		},
		{
			title: 'Tablet',
			value: 15,
			icon: TabletIcon,
			color: colors.red[600]
		},
		{
			title: 'Mobile',
			value: 23,
			icon: PhoneIcon,
			color: colors.orange[600]
		},
		{
			title: 'Desktop',
			value: 63,
			icon: LaptopMacIcon,
			color: colors.indigo[500]
		},
		{
			title: 'Tablet',
			value: 15,
			icon: TabletIcon,
			color: colors.red[600]
		},
		{
			title: 'Mobile',
			value: 23,
			icon: PhoneIcon,
			color: colors.orange[600]
		}
	];

	return (
		<Card className={clsx(classes.root, className)} {...rest}>
			<CardHeader title="Frequently Used Products" />
			<Divider />
			<CardContent>
				<Box height={300} position="relative">
					<Doughnut data={data} options={options} />
				</Box>
				<Box display="flex" justifyContent="center" mt={2}>
					{products.map(({ color, title, value }) => (
						<Box key={title} p={1} textAlign="center">
							<Typography color="textPrimary" variant="body1">
								{title}
							</Typography>
							<Typography style={{ color }} variant="h2">
								{burnrate}%
							</Typography>
						</Box>
					))}
				</Box>
			</CardContent>
		</Card>
	);
};

FrequentUsedProducts.propTypes = {
	className: PropTypes.string
};

export default FrequentUsedProducts;

import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
	Avatar,
	Box,
	Card,
	CardContent,
	Grid,
	Typography,
	colors,
	makeStyles
} from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';

const useStyles = makeStyles(theme => ({
	root: {
		height: '100%'
	},
	avatar: {
		backgroundColor: colors.green[600],
		height: 56,
		width: 56
	},
	differenceIcon: {
		color: colors.green[900]
	},
	differenceValue: {
		color: colors.green[900],
		marginRight: theme.spacing(1)
	}
}));

const TotalCustomers = ({ className, ...props }) => {
	const classes = useStyles();
	const { item, burnrate, isHospital } = props;
	return (
		<Card className={clsx(classes.root, className)} {...props}>
			<CardContent>
				<Grid container justify="space-between" spacing={3}>
					<Grid item>
						<Typography
							color="textSecondary"
							gutterBottom
							variant="h6"
						>
							{item.name}
						</Typography>
						<Typography color="textPrimary" variant="h3">
							{burnrate + ' units'}
						</Typography>
					</Grid>
					<Grid item>
						<Avatar className={classes.avatar}>
							<PeopleIcon />
						</Avatar>
					</Grid>
				</Grid>
				<Box mt={2} display="flex" alignItems="center">
					<ArrowUpwardIcon className={classes.differenceIcon} />
					{/* <Typography
						className={classes.differenceValue}
						variant="body2"
					>
						{0}
					</Typography> */}
					<Typography color="textSecondary" variant="caption">
						{isHospital
							? 'Burn Rate per day*'
							: 'Supply Rate per day*'}
					</Typography>
				</Box>
			</CardContent>
		</Card>
	);
};

TotalCustomers.propTypes = {
	className: PropTypes.string
};

export default TotalCustomers;

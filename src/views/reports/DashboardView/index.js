import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/app/common/components/Page';
import InventoryTimeSeries from './InventoryTimeSeries';
import InventoryDonut from './InventoryDonut';
import BurnRate from './BurnRate';
import { Navigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: theme.palette.background.dark,
		minHeight: '100%',
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3)
	}
}));

const products = [
	{
		name: 'Sanitizer',
		percent: '0%',
		burnrate: 160,
		color: 'blue'
	},
	{
		name: 'Masks',
		percent: '0%',
		burnrate: 50,
		color: 'red'
	},
	{
		name: 'Gloves',
		percent: '0%',
		burnrate: 10,
		color: 'green'
	},
	{
		name: 'Gown',
		percent: '0%',
		burnrate: 120,
		color: 'yellow'
	}
];
const calcuateBurnrate = activity => {
	if (!activity || activity.length === 0) return [0, 0, 0, 0];
	activity.sort((a, b) => {
		const KeyA = new Date(a.timestamp);
		const keyB = new Date(b.timestamp);
		if (KeyA > keyB) return 1;
		else if (KeyA < keyB) return -1;
		return 0;
	});

	const burnRate = [0, 0, 0, 0];
	for (let index = 0; index < activity.length; index++) {
		const currActiv = activity[index];

		if (currActiv.quantityDiff < 0)
			burnRate[currActiv.index] += -1 * currActiv.quantityDiff;
	}
	const firstDate = new Date(activity[0].timestamp);
	const lastDate = new Date(activity[activity.length - 1].timestamp);
	const days = parseInt((lastDate - firstDate) / (1000 * 60 * 60 * 24), 10);
	return burnRate.map(val => parseFloat(val / days).toFixed(2));
};

const Dashboard = props => {
	const { auth, profile } = props;
	const classes = useStyles();
	const location = useLocation();
	if (!auth.uid) {
		return <Navigate to="/login" state={{ from: location }} />;
	}
	const { inventory, activity } = profile;
	const burnRate = calcuateBurnrate(activity);
	const isHospital = profile.type === 'hospital';
	return (
		<Page className={classes.root} title="Dashboard">
			<Container maxWidth={false}>
				<Grid container spacing={1}>
					{inventory &&
						inventory.map((product, index, obj) => (
							<Grid item lg={3} sm={6} xl={3} xs={12}>
								<BurnRate
									item={product}
									burnrate={burnRate[index]}
									isHospital={isHospital}
								/>
							</Grid>
						))}

					<Grid item lg={7} md={12} xl={9} xs={12}>
						<InventoryTimeSeries activity={activity} />
					</Grid>
					<Grid item lg={4} md={6} xl={3} xs={12}>
						<InventoryDonut
							inventory={inventory}
							activity={activity}
						/>
					</Grid>
				</Grid>
			</Container>
		</Page>
	);
};

const mapState = state => {
	return {
		auth: state.firebase.auth,
		profile: state.firebase.profile
	};
};

export default connect(mapState, null)(Dashboard);

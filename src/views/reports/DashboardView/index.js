import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/app/common/components/Page';
import Budget from './Budget';
// import LatestOrders from './LatestOrders';
// import LatestProducts from './LatestProducts';
import Sales from './Sales';
// import TasksProgress from './TasksProgress';
// import TotalCustomers from './TotalCustomers';
// import TotalProfit from './TotalProfit';
// import FrequentUsedProducts from './FrequentUsedProducts';
// import { firestoreConnect } from 'react-redux-firebase';
// import { compose } from 'redux';
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

const Dashboard = props => {
	const { auth } = props;
	const classes = useStyles();
	const location = useLocation();
	if (!auth.uid) {
		return <Navigate to="/login" state={{ from: location }} />;
	}

	return (
		<Page className={classes.root} title="Dashboard">
			<Container maxWidth={false}>
				<Grid container spacing={3}>
					{products &&
						products.map(product => (
							<Grid item lg={3} sm={6} xl={3} xs={12}>
								{/* <TotalCustomers product={product} /> */}
							</Grid>
						))}

					<Grid item lg={8} md={12} xl={9} xs={12}>
						<Sales />
					</Grid>
					<Grid item lg={4} md={6} xl={3} xs={12}>
						{/* <FrequentUsedProducts products={products} /> */}
					</Grid>
				</Grid>
			</Container>
		</Page>
	);
};

const mapState = state => {
	return {
		auth: state.firebase.auth
	};
};

export default connect(mapState, null)(Dashboard);

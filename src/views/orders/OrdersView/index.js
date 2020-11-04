import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/app/common/components/Page';
import LatestOrders from './LatestOrders';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Navigate, useLocation } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: theme.palette.background.dark,
		minHeight: '100%',
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3)
	}
}));

const Orders = props => {
	const { allOrders, auth, profile } = props;
	const classes = useStyles();
	const location = useLocation();
	if (!auth.uid) {
		return <Navigate to="/login" state={{ from: location }} />;
	}
	let orders = null;
	if (allOrders) {
		if (profile.type === 'hospital')
			orders = allOrders.filter(order => order.hospital.uid === auth.uid);
		else
			orders = allOrders.filter(
				order => order.manufacturer.uid === auth.uid
			);
	}
	return (
		<Page className={classes.root} title="Orders">
			<Container maxWidth={false}>
				<Grid container spacing={4}>
					<Grid item lg={10} md={14} xl={11} xs={14}>
						<LatestOrders profile={profile} orders={orders} />
					</Grid>
				</Grid>
			</Container>
		</Page>
	);
};

const mapState = state => {
	return {
		allOrders: state.firestore.ordered.orders,
		auth: state.firebase.auth,
		profile: state.firebase.profile
	};
};

export default compose(connect(mapState), firestoreConnect(['orders']))(Orders);

import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/app/common/components/Page';
import LatestOrders from './LatestOrders';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Navigate, useLocation } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: theme.palette.background.dark,
		minHeight: '100%',
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3)
	},
	skeleton: {
		position: 'fixed',
		top: '32%',
		left: '50%',
		transform: 'translate(-50%, -50%)'
	},
}));

const Orders = props => {
	const { allOrders, auth, profile, requesting } = props;
	const classes = useStyles();
	const location = useLocation();

	if (!auth.uid) {
		return <Navigate to="/login" state={{ from: location }} />;
	}
	let orders = null;
	if (allOrders) {
		if (profile.type === 'hospital')
			orders = allOrders.filter(order => {
				return order.hospital ? order.hospital.uid === auth.uid : false;
			});
		else
			orders = allOrders.filter(order => {
				return order.manufacturer
					? order.manufacturer.uid === auth.uid
					: false;
			});
	}
	return (
		<Page className={classes.root} title="Orders">
			<Container maxWidth={false}>
				<Grid container spacing={4}>
					<Grid item lg={10} md={14} xl={11} xs={14}>
						{requesting.length === 0 || requesting.orders  ? (
							// <CircularProgress className={ classes.loader}/>
							<Skeleton
								className={classes.skeleton}
								variant="rect"
								width={930}
								height={230}
							/>
						) : (
							<LatestOrders profile={profile} orders={orders} />
						)}
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
		profile: state.firebase.profile,
		requesting: state.firestore.status.requesting
	};
};

export default compose(connect(mapState), firestoreConnect(['orders']))(Orders);

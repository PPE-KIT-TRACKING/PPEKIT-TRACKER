import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/app/common/components/Page';
import LatestOrders from './LatestOrders';
import { connect } from 'react-redux';
import { loadOrders } from './ordersActions';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: theme.palette.background.dark,
		minHeight: '100%',
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3)
	}
}));

const Orders = props => {
	const { allOrders, loadOrders, auth, profile } = props;
	const classes = useStyles();
	const navigate = useNavigate();
	if (!auth.uid) navigate('/login', { replace: false });
	let orders = null;
	console.log(profile);
	if (allOrders && profile.orders) {
		orders = allOrders.filter(order => profile.orders.includes(order.id));
	}
	return (
		<Page className={classes.root} title="Orders">
			<Container maxWidth={false}>
				<Grid container spacing={4}>
					<Grid item lg={10} md={14} xl={11} xs={14}>
						<LatestOrders loadOrders={loadOrders} orders={orders} />
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

const mapActions = {
	loadOrders
};

export default compose(
	connect(mapState, mapActions),
	firestoreConnect(['orders'])
)(Orders);

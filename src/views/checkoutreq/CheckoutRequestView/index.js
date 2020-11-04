import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Page from 'src/app/common/components/Page';
import Checkout from './Checkout';
import { connect } from 'react-redux';
import { removeRequest } from '../../requests/RequestsView/requestsActions';
import { changeOrderStatus } from '../../orders/OrdersView/ordersActions';
import { addToHospitalInventory } from '../../inventory/InventoryView/inventoryActions'
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

const CheckoutRequestView = props => {
	const {
		auth,
		requests,
		removeRequest,
		changeOrderStatus,
		addToHospitalInventory
	} = props;
	const navigate = useNavigate();
	if (!auth.uid) navigate('/login', { replace: false });

	const classes = useStyles();
	return (
		<Page className={classes.root} title="Customers">
			<Container maxWidth={false}>
				<Checkout
					requests={requests}
					removeRequest={removeRequest}
					changeOrderStatus={changeOrderStatus}
					addToHospitalInventory={addToHospitalInventory}
				/>
			</Container>
		</Page>
	);
};

const mapState = state => {
	return {
		requests: state.firestore.ordered.requests,
		auth: state.firebase.auth
	};
};

const actions = {
	removeRequest,
	changeOrderStatus,
	addToHospitalInventory
};

export default compose(
	connect(mapState, actions),
	firestoreConnect([
		{
			collection: 'requests'
		}
	])
)(CheckoutRequestView);

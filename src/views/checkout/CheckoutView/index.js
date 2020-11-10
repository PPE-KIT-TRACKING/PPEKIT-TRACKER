import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Page from 'src/app/common/components/Page';
import Checkout from './Checkout';
import { connect } from 'react-redux';
import { insertOrder } from '../../orders/OrdersView/ordersActions';
import { insertRequest } from '../../requests/RequestsView/requestsActions';

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: theme.palette.background.dark,
		minHeight: '100%',
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3)
	}
}));

const CheckoutView = props => {
	const classes = useStyles();

	return (
		<Page className={classes.root} title="Customers">
			<Container maxWidth={false}>
				<Checkout
					cart_items={props}
					insertOrder={props.insertOrder}
					insertRequest={props.insertRequest}
				/>
			</Container>
		</Page>
	);
};

const mapStatetoProps = state => {
	return {
		market: state.market,
		profile: state.firebase.profile,
		auth: state.firebase.auth
	};
};
const mapActions = {
	insertOrder,
	insertRequest
};
export default connect(mapStatetoProps, mapActions)(CheckoutView);

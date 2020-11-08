import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Page from 'src/app/common/components/Page';
import Checkout from './Checkout';
import { connect } from 'react-redux';
import { useState } from 'react';
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
	console.log('props: ', props);

	return (
		<Page className={classes.root} title="Customers">
			<Container maxWidth={false}>
				<Checkout 
					cart_items = {props}
				/>
			</Container>
		</Page>
	);
};

const mapStatetoProps = state => {
	return {
		market: state.market
	};
};
export default connect(mapStatetoProps, null)(CheckoutView);

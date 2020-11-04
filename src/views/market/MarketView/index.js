import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Page from 'src/app/common/components/Page';
import Toolbar from './Toolbar';
import ProductCard from './ProductCard';
import data from './data';
import { addToCart } from '../MarketView/marketActions';
const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: theme.palette.background.dark,
		minHeight: '100%',
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3)
	},
	productCard: {
		height: '100%'
	}
}));

const ProductList = props => {
	const classes = useStyles();
	const [products] = useState(data);

	return (
		<Page className={classes.root} title="Market">
			<Container maxWidth={false}>
				<Toolbar />
				<Box mt={3}>
					<Grid container spacing={3}>
						{products.map(product => (
							<Grid item key={product.id} lg={4} md={6} xs={12}>
								<ProductCard
									className={classes.productCard}
									product={product}
									addToCart={props.addToCart}
								/>
							</Grid>
						))}
					</Grid>
				</Box>
				<Box mt={3} display="flex" justifyContent="center">
					<Pagination color="primary" count={3} size="small" />
				</Box>
			</Container>
		</Page>
	);
};

const mapActions = {
	addToCart
};

export default connect(null, mapActions)(ProductList);

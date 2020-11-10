import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
	listItem: {
		padding: theme.spacing(1, 0)
	},
	total: {
		fontWeight: 700
	},
	title: {
		marginTop: theme.spacing(2)
	}
}));

export default function Review(props) {
	const addresses = [
		props.cart_items.cart_items.profile.state +
			', ' +
			props.cart_items.cart_items.profile.country
	];

	const classes = useStyles();
	const products = props.cart_items.cart_items.market;
	return (
		<React.Fragment>
			<Typography variant="h6" gutterBottom>
				Order summary
			</Typography>
			<List disablePadding>
				{products.map(product => (
					<ListItem className={classes.listItem} key={product.title}>
						<ListItemText
							primary={product.title}
							secondary={product.description}
						/>
						<Typography variant="body2">{product.count}</Typography>
					</ListItem>
				))}
			</List>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<Typography
						variant="h6"
						gutterBottom
						className={classes.title}
					>
						Customer Basic Info
					</Typography>
					<Typography gutterBottom>
						{props.cart_items.cart_items.profile.firstName +
							' ' +
							props.cart_items.cart_items.profile.lastName}
					</Typography>
					<Typography gutterBottom>{addresses.join('')}</Typography>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { Formik } from 'formik';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';



const useStyles = makeStyles(theme => ({
	listItem: {
		padding: theme.spacing(1, 0)
	},
	total: {
		fontWeight: 700
	},
	title: {
		marginTop: theme.spacing(2)
	},
	button: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(1)
	}
}));

export default function Review(props) {
	const classes = useStyles();
	const { hospital, orders, handleAcceptRequest } = props;

	const hospitaldetails = [
		hospital.firstName + ' ' + hospital.lastName,
		hospital.state + ' , ' + hospital.country,
		hospital.email,
		hospital.phone
	];

	return (
		<React.Fragment>
			<Formik
				initialValues={{}}
				onSubmit={values => {
					handleAcceptRequest(values);
				}}
			>
				{({
					errors,
					handleBlur,
					handleChange,
					handleSubmit,
					touched,
					values
				}) => (
					<form onSubmit={handleSubmit}>
						<Typography variant="h6" gutterBottom>
							Request summary
						</Typography>
						<List disablePadding>
							{orders &&
								orders.map((order, idx) => (
									<ListItem
										className={classes.listItem}
										key={order.item.name}
									>
										<ListItemText
											primary={order.item.name}
											secondary={
												'Quantity : ' + order.quantity
											}
										/>
										{/* <Typography variant="body2">
											{product.price}
										</Typography> */}
										<Input
											id="standard-adornment-amount"
											value={values.amount}
											onChange={handleChange}
											name={idx}
											startAdornment={
												<InputAdornment position="start">
													₹
												</InputAdornment>
											}
										/>
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
									Hospital Details
								</Typography>
								{hospitaldetails.map(e => (
									<Typography gutterBottom>{e}</Typography>
								))}
							</Grid>
							<Grid
								item
								container
								direction="column"
								xs={12}
								sm={6}
							></Grid>
						</Grid>
						<Button
							variant="contained"
							color="primary"
							onClick={handleSubmit}
							className={classes.button}
						>
							Accept Request
						</Button>
					</form>
				)}
			</Formik>
		</React.Fragment>
	);
}

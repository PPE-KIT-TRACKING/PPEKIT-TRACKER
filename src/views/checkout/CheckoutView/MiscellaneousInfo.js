import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import * as Yup from 'yup';

export default function MiscellaneousInfo(props) {
	const handleSubmit = () => {};
	console.log('props of miscell: ', props);
	const products = props.cart_items.cart_items.market;
	const useStyles = makeStyles(theme => ({
		button: {
			marginTop: theme.spacing(3),
			marginLeft: theme.spacing(1)
		}
	}));
	const classes = useStyles();
	return (
		<React.Fragment>
			<React.Fragment>
				<Formik
					initialValues={{
						expectedDate: new Date()
					}}
					onSubmit={values => {
						props.handlePlaceOrder(values);
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
								Order Details Enquiry
							</Typography>
							<Grid container spacing={3}>
								<Grid item xs={12} md={6}>
									<TextField
										required
										id="cardName"
										label="Certificate No"
										fullWidth
										autoComplete="cc-name"
										name="certificateNo"
										value={values.certificateNo}
										onChange={handleChange}
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<TextField
										id="cardNumber"
										label="Expected Delivery Date"
										type="date"
										defaultValue="2020-11-10"
										name="expectedDate"
										value={values.expectedDate}
										onChange={handleChange}
										InputLabelProps={{
											shrink: true
										}}
									/>
								</Grid>
								<Button
									variant="contained"
									color="primary"
									onClick={handleSubmit}
									className={classes.button}
								>
									Place Order
								</Button>
							</Grid>
						</form>
					)}
				</Formik>
			</React.Fragment>
		</React.Fragment>
	);
}

import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Navigate, useLocation } from 'react-router-dom';

export default function MiscellaneousInfo(props) {
	const useStyles = makeStyles(theme => ({
		button: {
			marginTop: theme.spacing(3),
			marginLeft: theme.spacing(1)
		}
	}));
	const location = useLocation();
	const to = location.state ? location.state.from.pathname : '/app/dashboard';
	const classes = useStyles();
	return (
		<React.Fragment>
			<React.Fragment>
				<Formik
					initialValues={{
						expectedDate: null,
						certificateNo: ''
					}}
					onSubmit={values => {
						props.handlePlaceOrder(values);
						return <Navigate to={to} state={{ from: location }} />;
					}}
					validationSchema={Yup.object().shape({
						certificateNo: Yup.string()
							.max(255)
							.required('Certificate number is required'),
						expectedDate: Yup.date()
							.required('Enter date')
							.nullable()
							.default(undefined)
					})}
				>
					{({
						errors,
						handleBlur,
						handleChange,
						handleSubmit,
						isSubmitting,
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
										error={Boolean(
											touched.certificateNo &&
												errors.certificateNo
										)}
										fullWidth
										helperText={
											touched.certificateNo &&
											errors.certificateNo
										}
										id="cardName"
										label="Certificate No"
										autoComplete="cc-name"
										name="certificateNo"
										value={values.certificateNo}
										onChange={handleChange}
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<TextField
										id="cardNumber"
										error={Boolean(
											touched.expectedDate &&
												errors.expectedDate
										)}
										fullWidth
										helperText={
											touched.expectedDate &&
											errors.expectedDate
										}
										label="Expected Delivery Date"
										type="date"
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

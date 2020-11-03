import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Divider,
	Grid,
	TextField,
	makeStyles
} from '@material-ui/core';
import * as Yup from 'yup';
import { Formik } from 'formik';

const states = [
	{
		value: 'maharashtra',
		label: 'Maharashtra'
	},
	{
		value: 'gujrat',
		label: 'Gujrat'
	},
	{
		value: 'rajasthan',
		label: 'Rajasthan'
	}
];

const useStyles = makeStyles(() => ({
	root: {}
}));

const ProfileDetails = ({ className, ...props }) => {
	const classes = useStyles();
	const { profile, saveDetails } = props;

	return (
		<Formik
			initialValues={{
				firstName: profile.firstName,
				lastName: profile.lastName,
				email: profile.email,
				phone: profile.phone,
				state: profile.state,
				country: profile.country
			}}
			validationSchema={Yup.object().shape({
				email: Yup.string()
					.email('Must be a valid email')
					.max(255)
					.required('Email is required'),
				phone: Yup.string()
					.max(10)
					.min(10)
					.required('Phone number is required')
			})}
			onSubmit={values => {
				const { email, ...user } = values;
				saveDetails(user);
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
				<form
					className={clsx(classes.root, className)}
					{...props}
					onSubmit={handleSubmit}
				>
					<Card>
						<CardHeader
							subheader="The information can be edited"
							title="Profile"
						/>
						<Divider />
						<CardContent>
							<Grid container spacing={3}>
								<Grid item md={6} xs={12}>
									<TextField
										fullWidth
										helperText="Please specify the first name"
										label="First name"
										name="firstName"
										onChange={handleChange}
										required
										value={values.firstName}
										variant="outlined"
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<TextField
										fullWidth
										label="Last name"
										name="lastName"
										onChange={handleChange}
										required
										value={values.lastName}
										variant="outlined"
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<TextField
										fullWidth
										label="Email Address"
										name="email"
										required
										value={values.email}
										variant="outlined"
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<TextField
										fullWidth
										label="Phone Number"
										name="phone"
										onChange={handleChange}
										type="number"
										value={values.phone}
										variant="outlined"
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<TextField
										fullWidth
										label="Country"
										name="country"
										onChange={handleChange}
										required
										value={values.country}
										variant="outlined"
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<TextField
										fullWidth
										label="Select State"
										name="state"
										onChange={handleChange}
										required
										select
										SelectProps={{ native: true }}
										value={values.state}
										variant="outlined"
									>
										{states.map(option => (
											<option
												key={option.value}
												value={option.value}
											>
												{option.label}
											</option>
										))}
									</TextField>
								</Grid>
							</Grid>
						</CardContent>
						<Divider />
						<Box display="flex" justifyContent="flex-end" p={2}>
							<Button
								color="primary"
								variant="contained"
								onClick={handleSubmit}
							>
								Save details
							</Button>
						</Box>
					</Card>
				</form>
			)}
		</Formik>
	);
};

ProfileDetails.propTypes = {
	className: PropTypes.string
};

export default ProfileDetails;

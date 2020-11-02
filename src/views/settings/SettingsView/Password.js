import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Divider,
	TextField,
	makeStyles
} from '@material-ui/core';
import * as Yup from 'yup';
import { Formik } from 'formik';

const useStyles = makeStyles({
	root: {}
});

const Password = ({ className, ...props }) => {
	const classes = useStyles();
	const { updatePassword } = props;
	return (
		<Formik
			initialValues={{
				password: '',
				confirm: '',
				oldpassword: ''
			}}
			validationSchema={Yup.object().shape({
				password: Yup.string()
					.max(255)
					.required(' New password is required'),
				confirm: Yup.string()
					.max(255)
					.required('Confirm password is required'),
				oldpassword: Yup.string()
					.max(255)
					.required('Old password is required')
			})}
			onSubmit={values => {
				const { password, confirm, oldpassword } = values;
				updatePassword(oldpassword, confirm, password === confirm);
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
					onSubmit={handleSubmit}
					className={clsx(classes.root, className)}
					{...props}
				>
					<Card>
						<CardHeader
							subheader="Update password"
							title="Password"
						/>
						<Divider />
						<CardContent>
							<TextField
								error={Boolean(
									touched.oldpassword && errors.oldpassword
								)}
								fullWidth
								helperText={
									touched.oldpassword && errors.oldpassword
								}
								label="Old password"
								margin="normal"
								name="oldpassword"
								onChange={handleChange}
								type="password"
								value={values.oldpassword}
								variant="outlined"
							/>
							<TextField
								error={Boolean(
									touched.password && errors.password
								)}
								fullWidth
								helperText={touched.password && errors.password}
								label="Password"
								margin="normal"
								name="password"
								onChange={handleChange}
								type="password"
								value={values.password}
								variant="outlined"
							/>
							<TextField
								error={Boolean(
									touched.confirm && errors.confirm
								)}
								fullWidth
								helperText={touched.confirm && errors.confirm}
								label="Confirm password"
								margin="normal"
								name="confirm"
								onChange={handleChange}
								type="password"
								value={values.confirm}
								variant="outlined"
							/>
						</CardContent>
						<Divider />
						<Box display="flex" justifyContent="flex-end" p={2}>
							<Button
								onClick={handleSubmit}
								color="primary"
								variant="contained"
							>
								Update
							</Button>
						</Box>
					</Card>
				</form>
			)}
		</Formik>
	);
};

Password.propTypes = {
	className: PropTypes.string
};

export default Password;

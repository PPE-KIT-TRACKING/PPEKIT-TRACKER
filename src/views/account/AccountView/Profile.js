import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
	Avatar,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Divider,
	Typography,
	makeStyles
} from '@material-ui/core';
import { Upload } from 'react-feather';

const useStyles = makeStyles(() => ({
	root: {},
	avatar: {
		height: 100,
		width: 100
	},
	input: {
		display: 'none',
		margin: 100
	}
}));

const Profile = ({ className, ...props }) => {
	const classes = useStyles();
	const { profile, upload } = props;
	const user = {
		avatar: profile.avatar,
		state: profile.state,
		country: profile.country,
		type: profile.type,
		name: profile.firstName + ' ' + profile.lastName,
		timezone: 'GMT+5:30'
	};
	const [image, setImage] = useState(null);

	const handleUpload = () => {
		if (image) upload(image);
	};
	const handleChange = e => {
		if (e.target.files[0]) {
			setImage(e.target.files[0]);
		}
	};

	return (
		<Card className={clsx(classes.root, className)} {...props}>
			<CardContent>
				<Box alignItems="center" display="flex" flexDirection="column">
					<Avatar
						className={classes.avatar}
						src={
							user.avatar || '/static/images/avatars/avatar_6.png'
						}
					/>
					<Typography color="textPrimary" gutterBottom variant="h3">
						{user.name}
					</Typography>
					<Typography color="textSecondary" variant="body1">
						{`${user.state} ${user.country}`}
					</Typography>
					<Typography
						className={classes.dateText}
						color="textSecondary"
						variant="body1"
					>
						{`${moment().format('hh:mm A')} ${user.timezone}`}
					</Typography>
				</Box>
			</CardContent>
			<Divider />
			<CardActions>
				{/* <input
					accept="image/*"
					className={classes.input}
					id="contained-button-file"
					multiple
					type="file"
					style={{ display: 'none' }}
				/>
				<label htmlFor="contained-button-file">
					<Button color="primary" fullWidth variant="text">
						Upload picture
					</Button>
				</label> */}

				<input
					accept="image/*"
					className={classes.input}
					id="contained-button-file"
					multiple
					type="file"
					onChange={handleChange}
				/>
				<label htmlFor="contained-button-file">
					<Button
						variant="contained"
						color="primary"
						component="span"
					>
						Choose
					</Button>
				</label>
				<Button
					variant="outlined"
					color="primary"
					component="span"
					fullWidth
					onClick={handleUpload}
				>
					Upload
				</Button>
			</CardActions>
		</Card>
	);
};

Profile.propTypes = {
	className: PropTypes.string
};

export default Profile;

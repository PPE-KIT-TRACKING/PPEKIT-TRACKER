import React, { forwardRef } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	stickToBottom: {
		width: '100%',
		position: 'fixed',
		bottom: 0
	}
}));
function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link
				color="inherit"
				href="https://github.com/PPE-KIT-TRACKING/PPEKIT-TRACKER"
			>
				ppetracker.org
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const Page = forwardRef(({ children, title = '', ...rest }, ref) => {
	const classes = useStyles();
	return (
		<div ref={ref} {...rest}>
			<Helmet>
				<title>{title}</title>
			</Helmet>
			{children}
			<BottomNavigation className={classes.stickToBottom}>
				<Copyright />
			</BottomNavigation>
		</div>
	);
});

Page.propTypes = {
	children: PropTypes.node.isRequired,
	title: PropTypes.string
};

export default Page;

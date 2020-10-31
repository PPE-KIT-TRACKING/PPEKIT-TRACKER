import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import NavBar from './NavBar';
import TopBar from './TopBar';
import { connect } from 'react-redux';
import { logout } from '../../../views/auth/authActions';
import { useNavigate } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: theme.palette.background.dark,
		display: 'flex',
		height: '100%',
		overflow: 'hidden',
		width: '100%'
	},
	wrapper: {
		display: 'flex',
		flex: '1 1 auto',
		overflow: 'hidden',
		paddingTop: 64,
		[theme.breakpoints.up('lg')]: {
			paddingLeft: 256
		}
	},
	contentContainer: {
		display: 'flex',
		flex: '1 1 auto',
		overflow: 'hidden'
	},
	content: {
		flex: '1 1 auto',
		height: '100%',
		overflow: 'auto'
	}
}));

const DashboardLayout = props => {
	const { auth, profile, logout } = props;
	const navigate = useNavigate();
  
  if (!auth.uid) navigate('/login', { replace: false });
  console.log("dashboard");
  const classes = useStyles();
	const [isMobileNavOpen, setMobileNavOpen] = useState(false);

	return (
		<div className={classes.root}>
			<TopBar
				logout={logout}
				onMobileNavOpen={() => setMobileNavOpen(true)}
			/>
			<NavBar
				onMobileClose={() => setMobileNavOpen(false)}
				openMobile={isMobileNavOpen}
				profile={profile}
				email={auth.email}
			/>
			<div className={classes.wrapper}>
				<div className={classes.contentContainer}>
					<div className={classes.content}>
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	);
};

const mapState = state => ({
	auth: state.firebase.auth,
	profile: state.firebase.profile
});

const mapActions = {
	logout
};
export default connect(mapState, mapActions)(DashboardLayout);
import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/app/common/components/Page';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';
import { saveDetails, upload } from './accountActions';
import { connect } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: theme.palette.background.dark,
		minHeight: '100%',
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3)
	}
}));

const Account = props => {
	const classes = useStyles();
	const { auth, profile, saveDetails, upload } = props;
	const location = useLocation();
	if (!auth.uid) {
		return <Navigate to="/login" state={{ from: location }} />;
	}

	return (
		<Page className={classes.root} title="Account">
			<Container maxWidth="lg">
				<Grid container spacing={3}>
					<Grid item lg={8} md={6} xs={12}>
						<ProfileDetails
							profile={{ email: auth.email, ...profile }}
							saveDetails={saveDetails}
						/>
					</Grid>
					<Grid item lg={4} md={6} xs={12}>
						<Profile profile={profile} upload={upload} />
					</Grid>
				</Grid>
			</Container>
		</Page>
	);
};

const mapState = state => ({
	auth: state.firebase.auth,
	profile: state.firebase.profile
});

const mapActions = {
	saveDetails,
	upload
};

export default connect(mapState, mapActions)(Account);

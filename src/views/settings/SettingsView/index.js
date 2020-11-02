import React from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/app/common/components/Page';
import Password from './Password';
import { updatePassword } from '../../auth/authActions';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: theme.palette.background.dark,
		minHeight: '100%',
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3)
	}
}));

const SettingsView = props => {
	const classes = useStyles();
	const { updatePassword } = props;

	return (
		<Page className={classes.root} title="Settings">
			<Container maxWidth="lg">
				{/* <Notifications /> */}
				<Box mt={3}>
					<Password updatePassword={updatePassword} />
				</Box>
			</Container>
		</Page>
	);
};

const mapActions = {
	updatePassword
};

export default connect(null, mapActions)(SettingsView);

import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Page from 'src/app/common/components/Page';
import Requests from './Requests';

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: theme.palette.background.dark,
		minHeight: '100%',
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3),
		'& > *': {
			borderBottom: 'unset'
		}
	}
}));

const RequestsView = props => {
	const classes = useStyles();
	return (
		<Page className={classes.root} title="Requests">
			<Container maxWidth={false}>
				<Requests />
			</Container>
		</Page>
	);
};

export default RequestsView;

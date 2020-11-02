import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/app/common/components/Page';

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: theme.palette.background.dark,
		minHeight: '100%',
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3)
	}
}));

const GlobalTransactions = () => {
	const classes = useStyles();

	return (
		<Page className={classes.root} title="Market">
			<Container maxWidth="lg">
				<Grid container spacing={3}>
					<h1>Global Transactions</h1>
				</Grid>
			</Container>
		</Page>
	);
};

export default GlobalTransactions;

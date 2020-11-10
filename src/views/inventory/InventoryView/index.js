import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/app/common/components/Page';
import TasksProgress from './TasksProgress';
import { Navigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeFromInventory, addToInventory } from './inventoryActions';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: theme.palette.background.dark,
		minHeight: '100%',
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3)
	}
}));

const Inventory = props => {
	const { auth, profile, removeFromInventory, addToInventory } = props;
	const inventory = profile.inventory;
	const isHospital = profile.type === 'hospital';
	const classes = useStyles();
	const location = useLocation();
	if (!auth.uid) {
		return <Navigate to="/login" state={{ from: location }} />;
	}

	return (
		<Page className={classes.root} title="Inventory">
			<Container maxWidth={false}>
				<Grid container spacing={3}>
					{inventory ? (
						inventory.map((product, index, obj) => (
							<Grid item lg={3} sm={6} xl={3} xs={12}>
								<TasksProgress
									product={product}
									isHospital={isHospital}
									removeFromInventory={removeFromInventory}
									addToInventory={addToInventory}
									index={index}
								/>
							</Grid>
						))
					) : (
						<Grid container>
							<Grid item lg={3} sm={6} xl={3} xs={12}>
								<Skeleton
									// className={classes.loader}
									variant="rect"
									width={300}
									height={140}
								/>
							</Grid>
							<Grid item lg={3} sm={6} xl={3} xs={12}>
								<Skeleton
									// className={classes.loader}
									variant="rect"
									width={300}
									height={140}
								/>
							</Grid>
							<Grid item lg={3} sm={6} xl={3} xs={12}>
								<Skeleton
									// className={classes.loader}
									variant="rect"
									width={300}
									height={140}
								/>
							</Grid>
							<Grid item lg={3} sm={6} xl={3} xs={12}>
								<Skeleton
									// className={classes.loader}
									variant="rect"
									width={300}
									height={140}
								/>
							</Grid>
						</Grid>
					)}
				</Grid>
			</Container>
		</Page>
	);
};

const mapState = state => {
	return {
		auth: state.firebase.auth,
		profile: state.firebase.profile
	};
};
const mapActions = {
	removeFromInventory,
	addToInventory
};

export default connect(mapState, mapActions)(Inventory);

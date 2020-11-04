import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
	Avatar,
	Box,
	Card,
	CardContent,
	Grid,
	LinearProgress,
	Typography,
	makeStyles,
	colors,
	ButtonGroup,
	Button,
	Dialog,
	DialogContent,
	DialogContentText,
	DialogActions,
	TextField,
	DialogTitle
} from '@material-ui/core';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';

const useStyles = makeStyles(() => ({
	root: {
		height: '100%'
	},
	avatar: {
		backgroundColor: '#303f9f',
		height: 75,
		width: 75
	}
}));

const TasksProgress = ({ className, ...rest }) => {
	const classes = useStyles();
	const [current, setCurrent] = React.useState(0);
	const [total, setTotal] = React.useState(0);

	const handleAddProducts = () => {
		setCurrent(0);
		console.log(typeof total, typeof current);
		setTotal(Number(total) + Number(current));
	};

	const handleRemoveProducts = () => {
		setCurrent(0);
		let a = Number(total);
		let b = Number(current);
		if (a - b >= 0) setTotal(a - b);
		else setTotal(0);
	};

	return (
		<Card className={clsx(classes.root, className)} {...rest}>
			<CardContent>
				<Grid container justify="space-between" spacing={3}>
					<Grid item>
						<Typography
							color="textSecondary"
							gutterBottom
							variant="h6"
						>
							PRODUCT NAME
						</Typography>
						<Typography color="textPrimary" variant="h3">
							{total}
						</Typography>
					</Grid>
					<Grid item>
						<Avatar className={classes.avatar}>
							<InsertChartIcon />
						</Avatar>
					</Grid>
				</Grid>
				<Box mt={3}>
					<Grid container spacing={1}>
						<Grid item lg={3} sm={6} xl={3} xs={12}>
							<TextField
								type="number"
								id="standard-basic"
								value={current}
								onChange={e => setCurrent(e.target.value)}
							/>
						</Grid>

						<Grid item lg={3} sm={6} xl={3} xs={12}>
							<ButtonGroup
								variant="contained"
								color="primary"
								aria-label="contained primary button group"
							>
								<Button onClick={handleAddProducts}>Add</Button>
								<Button onClick={handleRemoveProducts}>
									Remove
								</Button>
							</ButtonGroup>
						</Grid>
					</Grid>
				</Box>
			</CardContent>
		</Card>
	);
};

TasksProgress.propTypes = {
	className: PropTypes.string
};

export default TasksProgress;

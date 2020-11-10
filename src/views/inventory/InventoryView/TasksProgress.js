import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
	Avatar,
	Box,
	Card,
	CardContent,
	Grid,
	Typography,
	makeStyles,
	ButtonGroup,
	Button,
	TextField
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
	root: {
		height: '100%'
	},
	avatar: {
		backgroundColor: '#A3E4D7',
		height: 75,
		width: 75
	}
}));

const TasksProgress = ({ className, ...props }) => {
	const classes = useStyles();
	const [current, setCurrent] = React.useState(0);
	const {
		isHospital,
		product,
		removeFromInventory,
		addToInventory,
		index
	} = props;

	const handleAddProducts = () => {
		addToInventory(index, Number(current));
		setCurrent(0);
	};

	const handleRemoveProducts = () => {
		removeFromInventory(
			[{ index: index, quantity: Number(current) }],
			null
		);
		setCurrent(0);
	};

	return (
		<Card className={clsx(classes.root, className)} {...props}>
			<CardContent>
				<Grid container justify="space-between" spacing={3}>
					<Grid item>
						<Typography
							color="textSecondary"
							gutterBottom
							variant="h6"
						>
							{product.name}
						</Typography>
						<Typography color="textPrimary" variant="h3">
							{product.quantity}
						</Typography>
					</Grid>
					<Grid item>
						<Avatar
							className={classes.avatar}
							src={
								'/static/images/products/product_' +
								(index + 1) +
								'.png'
							}
						>
							{/* <InsertChartIcon /> */}
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
								onChange={e =>
									e.target.value >= 0
										? setCurrent(e.target.value)
										: setCurrent(0)
								}
							/>
						</Grid>

						<Grid item lg={3} sm={6} xl={3} xs={12}>
							<ButtonGroup
								variant="contained"
								color="primary"
								aria-label="contained primary button group"
							>
								{!isHospital ? (
									<Button onClick={handleAddProducts}>
										Add
									</Button>
								) : (
									<Button onClick={handleRemoveProducts}>
										Remove
									</Button>
								)}
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

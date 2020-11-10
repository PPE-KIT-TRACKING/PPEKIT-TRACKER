import React from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
	Box,
	Button,
	Card,
	CardHeader,
	Chip,
	Divider,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TableSortLabel,
	Tooltip,
	makeStyles,
	Slide,
	AppBar,
	Typography,
	IconButton,
	Dialog,
	Toolbar,
	CardContent,
	CardActions,
	Avatar,
	Container
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
	root: {},
	actions: {
		justifyContent: 'flex-end'
	},
	appBar: {
		position: 'relative'
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1
	}
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const Profile = ({ className, user, completedDate, props }) => {
	const classes = useStyles();
	if (!user || user === {}) {
		return (
			<Container maxWidth="lg">
				<Typography color="textPrimary" gutterBottom variant="h3">
					Order is Still Pending or Expired..!
				</Typography>
			</Container>
		);
	}
	return (
		<Container maxWidth="lg">
			<Card className={clsx(classes.root, className)} {...props}>
				<CardContent>
					<Box
						alignItems="center"
						display="flex"
						flexDirection="column"
					>
						<Avatar
							className={classes.avatar}
							src={
								user.avatar ||
								'/static/images/avatars/avatar_6.png'
							}
						/>
						<Typography
							color="textPrimary"
							gutterBottom
							variant="h3"
						>
							{user.firstName + ' ' + user.lastName}
						</Typography>
						<Typography color="textPrimary" variant="body1">
							{user.email}
						</Typography>
						<Typography color="textPrimary" variant="body1">
							{`${user.state} ${user.country}`}
						</Typography>
						<Typography color="textPrimary" variant="body1">
							{'Completed Date - ' +
								moment(completedDate).format('DD/MM/YYYY')}
						</Typography>
					</Box>
				</CardContent>
				<Divider />
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};

const LatestOrders = ({ className, ...props }) => {
	const classes = useStyles();
	const { profile, orders } = props;
	const [open, setOpen] = React.useState(false);
	const isHospital = profile.type === 'hospital';
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Card className={clsx(classes.root, className)} {...props}>
			<CardHeader title="Latest Orders" />
			<Divider />
			<PerfectScrollbar>
				<Box minWidth={700}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Order Ref</TableCell>
								<TableCell>Item Name</TableCell>
								<TableCell>Quantity</TableCell>
								<TableCell sortDirection="desc">
									<Tooltip enterDelay={300} title="Sort">
										<TableSortLabel active direction="desc">
											Expected date
										</TableSortLabel>
									</Tooltip>
								</TableCell>
								<TableCell>Cost Offered</TableCell>
								<TableCell>Status</TableCell>
								<TableCell>Supplier Detail</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{orders &&
								orders.map(order => (
									<TableRow hover key={order.id}>
										<TableCell>{order.ref}</TableCell>
										<TableCell>{order.itemName}</TableCell>
										<TableCell>{order.quantity}</TableCell>
										<TableCell>
											{moment(order.expectedDate).format(
												'DD/MM/YYYY'
											)}
										</TableCell>
										<TableCell>
											{order.costOffered}
										</TableCell>
										<TableCell>
											<Chip
												color="primary"
												label={order.status}
												size="small"
											/>
										</TableCell>
										<TableCell>
											<Button
												variant="outlined"
												color="primary"
												size="small"
												className={classes.button}
												startIcon={<InfoIcon />}
												onClick={handleClickOpen}
											>
												More Info
											</Button>
											<Dialog
												// fullScreen
												open={open}
												onClose={handleClose}
												TransitionComponent={Transition}
											>
												<AppBar
													className={classes.appBar}
												>
													<Toolbar>
														<IconButton
															edge="start"
															color="inherit"
															onClick={
																handleClose
															}
															aria-label="close"
														>
															<CloseIcon />
														</IconButton>
														<Typography
															variant="h6"
															className={
																classes.title
															}
														>
															{!isHospital
																? 'Hospital'
																: 'Manufacturer'}{' '}
															Details
														</Typography>
													</Toolbar>
												</AppBar>
												{/* to add */}
												{}
												{isHospital ? (
													<Profile
														className={className}
														user={
															order.manufacturer
														}
														completedDate={
															order.completedDate
														}
														props={props}
													/>
												) : (
													<Profile
														className={className}
														user={order.hospital}
														completedDate={
															order.completedDate
														}
														props={props}
													/>
												)}
												{/*  */}
											</Dialog>
										</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table>
				</Box>
			</PerfectScrollbar>
			{/* <Box display="flex" justifyContent="flex-end" p={2}>
				<Button
					color="primary"
					endIcon={<ArrowRightIcon />}
					size="small"
					variant="text"
				>
					View all
				</Button>
			</Box> */}
		</Card>
	);
};

LatestOrders.propTypes = {
	className: PropTypes.string
};

export default LatestOrders;

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import Review from './Review';
import { useNavigate, useParams } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
	appBar: {
		position: 'relative'
	},
	layout: {
		width: 'auto',
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
			width: 600,
			marginLeft: 'auto',
			marginRight: 'auto'
		}
	},
	paper: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
		padding: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
			marginTop: theme.spacing(6),
			marginBottom: theme.spacing(6),
			padding: theme.spacing(3)
		}
	},
	stepper: {
		padding: theme.spacing(3, 0, 5)
	},
	buttons: {
		display: 'flex',
		justifyContent: 'flex-end'
	},
	button: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(1)
	}
}));

const steps = ['Review your order'];

function getStepContent(step, hospital, orders, handleAcceptRequest) {
	switch (step) {
		case 0:
			return (
				<Review
					hospital={hospital}
					orders={orders}
					handleAcceptRequest={handleAcceptRequest}
				/>
			);
		default:return (<div></div>)
	}
}

function Checkout(props) {
	const classes = useStyles();
	const [activeStep] = React.useState(0);
	const params = useParams();
	const location = useLocation();
	const navigate = useNavigate();

	const {
		addToHospitalInventory,
		changeOrderStatus,
		inventory,
		requests,
		removeFromInventory,
	} = props;
	let request = null;
	if (requests)
		request = requests.find(request => request.id === params.requestId);

	

	const handleAcceptRequest = costOffered => {
		let canRequestCompleted = true;
		for (const order of request.ppeNeeded) {
			if (order.quantity > inventory[order.item.index].quantity)
				canRequestCompleted = false;
		}
		let pointer = 0;
		if (canRequestCompleted) {
			const items = [];
			let orderId = null;
			for (const order of request.ppeNeeded) {
				changeOrderStatus(order.orderId, costOffered[pointer], false);
				pointer += 1;
				orderId = order.orderId;
				items.push({
					index: order.item.index,
					quantity: order.quantity
				});
			}
			addToHospitalInventory(orderId, items);
			removeFromInventory(items, request.id);
			// removeRequest(request.id);
			toastr.success('Success', 'Request completed..!');
		} else
			toastr.error(
				'Error',
				'Inventory is not enough for this request...!'
			);
		navigate('/app/requests', { from: location });
	};

	

	return (
		<React.Fragment>
			<CssBaseline />
			<main className={classes.layout}>
				{requests && (
					<Paper className={classes.paper}>
						<Typography component="h1" variant="h4" align="center">
							Checkout
						</Typography>
						<Stepper
							activeStep={activeStep}
							className={classes.stepper}
						>
							{steps.map(label => (
								<Step key={label}>
									<StepLabel>{label}</StepLabel>
								</Step>
							))}
						</Stepper>
						<React.Fragment>
							<React.Fragment>
								{getStepContent(
									activeStep,
									request.hospital,
									request.ppeNeeded,
									handleAcceptRequest
								)}
							</React.Fragment>
						</React.Fragment>
					</Paper>
				)}
			</main>
		</React.Fragment>
	);
}

export default Checkout;

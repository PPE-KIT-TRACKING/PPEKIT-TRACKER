import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import PaymentForm from './MiscellaneousInfo';
import Review from './Review';
import MiscellaneousInfo from './MiscellaneousInfo';
import { v4 as uuid } from 'uuid';
import { useNavigate, useParams } from 'react-router-dom';
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

const steps = ['Review your order', 'Miscellaneous Details'];

function getStepContent(step, props, handlePlaceOrder) {
	switch (step) {
		case 0:
			return <Review cart_items={props}></Review>;
		case 1:
			return (
				<MiscellaneousInfo
					cart_items={props}
					handlePlaceOrder={handlePlaceOrder}
				/>
			);
		default:
			throw new Error('Unknown step');
	}
}

export default function Checkout(props) {
	const classes = useStyles();
	const location = useLocation();
	const navigate = useNavigate();
	const [activeStep, setActiveStep] = React.useState(0);

	const handleNext = props => {
		const products = props.cart_items.market;
		if (products.length === 0) {
			setActiveStep(activeStep);
		} else {
			setActiveStep(activeStep + 1);
		}
	};

	const handleBack = () => {
		setActiveStep(activeStep - 1);
	};

	const handlePlaceOrder = values => {
		const products = props.cart_items.market;
		const profile = props.cart_items.profile;
		const request = {
			location: profile.state + ', ' + profile.country,
			name: profile.firstName + ' ' + profile.lastName,
			requiredby: values.expectedDate,
			certificate: values.certificateNo,
			hospital: {
				...props.cart_items.profile,
				uid: props.cart_items.auth.uid
			},
			ppeNeeded: []
		};
		for (let i = 0; i < products.length; i++) {
			let order = {
				status: 'pending',
				expectedDate: new Date(values.expectedDate),
				ref: uuid(),
				createdAt: new Date(),
				costOffered: '-',
				quantity: products[i].count,
				itemName: products[i].title,
				hospital: {
					...profile,
					uid: props.cart_items.auth.uid
				}
			};
			let orderId = uuid();
			// console.log('order: ', order);

			props.insertOrder(order, orderId);
			request.ppeNeeded.push({
				orderId: orderId,
				quantity: products[i].count,
				item: {
					index: products[i].index,
					name: products[i].title
				}
			});
		}
		props.insertRequest(request);
		navigate('/app/dashboard', { from: location });
	};
	return (
		<React.Fragment>
			<CssBaseline />
			<main className={classes.layout}>
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
						{activeStep === steps.length ? (
							<div></div>
						) : (
							<React.Fragment>
								{getStepContent(
									activeStep,
									props,
									handlePlaceOrder
								)}
								<div className={classes.buttons}>
									{activeStep !== 0 && (
										<Button
											onClick={handleBack}
											className={classes.button}
										>
											Back
										</Button>
									)}
									{activeStep !== steps.length - 1 ? (
										<Button
											variant="contained"
											color="primary"
											onClick={() => handleNext(props)}
											className={classes.button}
										>
											Next
										</Button>
									) : (
										<div></div>
									)}
								</div>
							</React.Fragment>
						)}
					</React.Fragment>
				</Paper>
			</main>
		</React.Fragment>
	);
}

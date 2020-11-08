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
import AddressForm from './AddressForm';
import PaymentForm from './MiscellaneousInfo';
import Review from './Review';
import MiscellaneousInfo from './MiscellaneousInfo';

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="https://material-ui.com/">
				ppetracker.org
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

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

function getStepContent(step, props) {
	switch (step) {
		case 0:
			return <Review cart_items={props}></Review>;
		case 1:
			return <MiscellaneousInfo />;
		default:
			throw new Error('Unknown step');
	}
}

export default function Checkout(props) {
	const classes = useStyles();
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

	const handleDone = () => {};

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
							<React.Fragment>
								<Typography variant="h5" gutterBottom>
									Thank you for your order.
								</Typography>
								<Typography variant="subtitle1">
									Your order number is #2001539. We have
									placed your order to desired manufacturer.
									Your order is under process at
									manufacturer's end.
								</Typography>
								<Button
									variant="contained"
									color="primary"
									onClick={handleDone}
									className={classes.button}
								>
									Done
								</Button>
							</React.Fragment>
						) : (
							<React.Fragment>
								{getStepContent(activeStep, props)}
								<div className={classes.buttons}>
									{activeStep !== 0 && (
										<Button
											onClick={handleBack}
											className={classes.button}
										>
											Back
										</Button>
									)}
									<Button
										variant="contained"
										color="primary"
										onClick={() => handleNext(props)}
										className={classes.button}
									>
										{activeStep === steps.length - 1
											? 'Place order'
											: 'Next'}
									</Button>
								</div>
							</React.Fragment>
						)}
					</React.Fragment>
				</Paper>
				<Copyright />
			</main>
		</React.Fragment>
	);
}

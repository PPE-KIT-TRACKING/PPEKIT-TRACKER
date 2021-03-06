import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import moment from 'moment';
import { insertRequest } from './requestsActions';
import { Navigate, useLocation } from 'react-router-dom';
import { removeRequest } from '../../requests/RequestsView/requestsActions';
import Skeleton from '@material-ui/lab/Skeleton';
import {
	changeOrderStatus,
} from '../../orders/OrdersView/ordersActions';

const useRowStyles = makeStyles({
	root: {
		'& > *': {
			borderBottom: 'unset'
		}
	}
});

function Row(props) {
	const { row } = props;
	const [open, setOpen] = React.useState(false);
	const classes = useRowStyles();
	const navigate = useNavigate();
	const handleSupply = event => {
		navigate(`/app/checkoutreq/${event.currentTarget.id}`, {
			requestId: event.currentTarget.id
		});
	};

	return (
		<React.Fragment>
			<TableRow className={classes.root}>
				<TableCell>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => setOpen(!open)}
					>
						{open ? (
							<KeyboardArrowUpIcon />
						) : (
							<KeyboardArrowDownIcon />
						)}
					</IconButton>
				</TableCell>
				<TableCell component="th" scope="row">
					{row.name}
				</TableCell>
				<TableCell align="right">{row.location}</TableCell>
				<TableCell align="right">
					{moment(row.requiredby).format('DD/MM/YYYY')}
				</TableCell>
				<TableCell align="right">{row.certificate}</TableCell>
				<TableCell align="right">
					<Button
						variant="contained"
						color="primary"
						size="small"
						className={classes.button}
						startIcon={<LocalShippingIcon />}
						onClick={handleSupply}
						id={row.id}
					>
						Supply
					</Button>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell
					style={{ paddingBottom: 0, paddingTop: 0 }}
					colSpan={6}
				>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box margin={1}>
							<Typography
								variant="h6"
								gutterBottom
								component="div"
							>
								PPE Needed
							</Typography>
							<Table size="small" aria-label="purchases">
								<TableHead>
									<TableRow>
										<TableCell>Item</TableCell>
										<TableCell align="right">
											Quantity
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{row.ppeNeeded.map(ppeNeededRow => (
										<TableRow key={ppeNeededRow.item.name}>
											<TableCell
												component="th"
												scope="row"
											>
												{ppeNeededRow.item.name}
											</TableCell>
											<TableCell align="right">
												{ppeNeededRow.quantity}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
}

Row.propTypes = {
	row: PropTypes.shape({
		location: PropTypes.string.isRequired,
		certificate: PropTypes.string.isRequired,
		requiredby: PropTypes.string.isRequired,
		ppeNeeded: PropTypes.arrayOf(
			PropTypes.shape({
				quantity: PropTypes.number.isRequired,
				item: PropTypes.object.isRequired
			})
		).isRequired,
		name: PropTypes.string.isRequired,
		makeproposal: PropTypes.number.isRequired
	}).isRequired
};

const skeletonStyle = {
	position: 'fixed',
	top: '32%',
	left: '50%',
	transform: 'translate(-50%, -50%)'
};

function Requests(props) {
	const { profile } = props;
	let requests = props.requests;

	const location = useLocation();
	if (profile.type === 'hospital')
		return (
			<Navigate
				to={location.state.from.pathname}
				state={{ from: location }}
			/>
		);
	if (!requests) {
		return (
			<Skeleton
				className={skeletonStyle}
				variant="rect"
				width={1200}
				height={180}
			/>
		);
	}
	requests = [...requests];
	const currentDate = new Date();
	for (const request of requests) {
		const requiredby = new Date(request.requiredby);
		if (currentDate > requiredby) {
			for (const order of request.ppeNeeded)
				changeOrderStatus(order.orderId, '', true);
			removeRequest(request.id);
		}
	}

	if (requests) {
		requests.sort((a, b) => {
			const KeyA = new Date(a.requiredby);
			const keyB = new Date(b.requiredby);
			if (KeyA > keyB) return 1;
			else if (KeyA < keyB) return -1;
			return 0;
		});
	}
	return (
		<TableContainer component={Paper}>
			<Table aria-label="collapsible table">
				<TableHead>
					<TableRow>
						<TableCell />
						<TableCell>Hospital Name</TableCell>
						<TableCell align="right">Location</TableCell>
						<TableCell align="right">Required by</TableCell>
						<TableCell align="right">Certificate No</TableCell>
						<TableCell align="right">Make a Proposal</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{requests &&
						requests.map(request => (
							<Row key={request.name} row={request} />
						))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

const mapState = state => {
	return {
		requests: state.firestore.ordered.requests,
		profile: state.firebase.profile
	};
};

const mapActions = {
	insertRequest,
	changeOrderStatus,
	removeRequest
};

export default compose(
	connect(mapState, mapActions),
	firestoreConnect([
		{
			collection: 'requests'
		}
	])
)(Requests);

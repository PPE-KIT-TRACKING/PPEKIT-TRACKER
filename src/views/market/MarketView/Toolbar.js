import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import clsx from 'clsx';
import {
	Box,
	Button,
	Card,
	CardContent,
	TextField,
	InputAdornment,
	SvgIcon,
	makeStyles
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const useStyles = makeStyles(theme => ({
	root: {},
	importButton: {
		marginRight: theme.spacing(1)
	},
	exportButton: {
		marginRight: theme.spacing(1)
	}
}));

const Toolbar = ({ className, ...rest }) => {
	const classes = useStyles();
	const navigate = useNavigate();

	const handleCheckout = () => {
		navigate('/app/checkout', { replace: true });
	};

	return (
		<div className={clsx(classes.root, className)} {...rest}>
			<Box mt={3}>
				<Card>
					<CardContent>
						<Box maxWidth={500}>
							<TextField
								fullWidth
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<SvgIcon
												fontSize="small"
												color="action"
											>
												<SearchIcon />
											</SvgIcon>
										</InputAdornment>
									)
								}}
								placeholder="Search product"
								variant="outlined"
							/>
							<Box mt={1}></Box>
							<Button
								variant="contained"
								color="primary"
								className={classes.button}
								startIcon={<AddShoppingCartIcon />}
								onClick={handleCheckout}
							>
								Checkout
							</Button>
						</Box>
					</CardContent>
				</Card>
			</Box>
		</div>
	);
};

Toolbar.propTypes = {
	className: PropTypes.string
};

export default Toolbar;

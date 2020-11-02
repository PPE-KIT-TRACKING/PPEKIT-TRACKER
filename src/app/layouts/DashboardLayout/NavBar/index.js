import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
	Avatar,
	Box,
	Button,
	Divider,
	Drawer,
	Hidden,
	List,
	Typography,
	makeStyles
} from '@material-ui/core';
import {
	AlertCircle as AlertCircleIcon,
	BarChart as BarChartIcon,
	Settings as SettingsIcon,
	ShoppingBag as ShoppingBagIcon,
	User as UserIcon,
	Users as UsersIcon,
	Globe as GlobalIcon,
	Database as InventoryIcon,
	List as OrdersIcon,
	Edit as RequestsIcon
} from 'react-feather';
import NavItem from './NavItem';


const hospitalitems = [
	{
		href: '/app/dashboard',
		icon: BarChartIcon,
		title: 'Dashboard'
	},
	{
		href: '/app/market',
		icon: ShoppingBagIcon,
		title: 'Market Place'
	},
	{
		href: '/app/inventory',
		icon: InventoryIcon,
		title: 'Inventory'
	},
	{
		href: '/app/orders',
		icon: OrdersIcon,
		title: 'Orders'
	},
	{
		href: '/app/account',
		icon: UserIcon,
		title: 'Account'
	},
	{
		href: '/app/settings',
		icon: SettingsIcon,
		title: 'Settings'
	}
	
];

const manufactureritems = [
	{
		href: '/app/dashboard',
		icon: BarChartIcon,
		title: 'Dashboard'
	},
	{
		href: '/app/orders',
		icon: OrdersIcon,
		title: 'Orders'
	},
	{
		href: '/app/requests',
		icon: RequestsIcon,
		title: 'Requests'
	},
	{
		href: '/app/account',
		icon: UserIcon,
		title: 'Account'
	},
	{
		href: '/app/settings',
		icon: SettingsIcon,
		title: 'Settings'
	}
];

const useStyles = makeStyles(() => ({
	mobileDrawer: {
		width: 256
	},
	desktopDrawer: {
		width: 256,
		top: 64,
		height: 'calc(100% - 64px)'
	},
	avatar: {
		cursor: 'pointer',
		width: 64,
		height: 64
	}
}));

const NavBar = ({ onMobileClose, openMobile, ...props }) => {
	const classes = useStyles();
	const location = useLocation();

	const { profile, email } = props;

	const user = {
		avatar: profile.avatar,
		name: profile.firstName + ' ' + profile.lastName,
		email: email,
		usertype: profile.type
	};

	const items =
		user.usertype === 'hospital'
			? hospitalitems
			: user.usertype === 'manufacturer'
			? manufactureritems
			: [];

	useEffect(() => {
		if (openMobile && onMobileClose) {
			onMobileClose();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.pathname]);

	const content = (
		<Box height="100%" display="flex" flexDirection="column">
			<Box
				alignItems="center"
				display="flex"
				flexDirection="column"
				p={2}
			>
				<Avatar
					className={classes.avatar}
					component={RouterLink}
					src={user.avatar}
					to="/app/account"
				/>
				<Typography
					className={classes.name}
					color="textPrimary"
					variant="h5"
				>
					{user.name}
				</Typography>
				<Typography color="textSecondary" variant="body2">
					{user.email}
				</Typography>
				<Typography color="textSecondary" variant="body2">
					{user.usertype}
				</Typography>
			</Box>
			<Divider />
			<Box p={2}>
				<List>
					{items.map(item => (
						<NavItem
							href={item.href}
							key={item.title}
							title={item.title}
							icon={item.icon}
						/>
					))}
				</List>
			</Box>
			<Box flexGrow={1} />
			<Box p={2} m={2} bgcolor="background.dark">
				<Box display="flex" justifyContent="center" mt={2}>
					<Button
						color="primary"
						component="a"
						href="https://github.com/PPE-KIT-TRACKING/PPEKIT-TRACKER"
						variant="contained"
					>
						Source Code
					</Button>
				</Box>
			</Box>
		</Box>
	);
	return (
		<>
			<Hidden lgUp>
				<Drawer
					anchor="left"
					classes={{ paper: classes.mobileDrawer }}
					onClose={onMobileClose}
					open={openMobile}
					variant="temporary"
				>
					{content}
				</Drawer>
			</Hidden>
			<Hidden mdDown>
				<Drawer
					anchor="left"
					classes={{ paper: classes.desktopDrawer }}
					open
					variant="persistent"
				>
					{content}
				</Drawer>
			</Hidden>
		</>
	);
};

NavBar.propTypes = {
	onMobileClose: PropTypes.func,
	openMobile: PropTypes.bool
};

NavBar.defaultProps = {
	onMobileClose: () => {},
	openMobile: false
};

export default NavBar;

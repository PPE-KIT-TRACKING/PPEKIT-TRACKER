import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
	AppBar,
	Box,
	Hidden,
	IconButton,
	Toolbar,
	makeStyles,
	Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';
import Logo from 'src/app/common/components/Logo';

const useStyles = makeStyles(() => ({
	root: {},
	avatar: {
		width: 60,
		height: 60
	}
}));

const TopBar = ({ className, onMobileNavOpen, ...props }) => {
	const classes = useStyles();

	const handleLogout = () => {
		props.logout();
	};

	return (
		<AppBar
			className={clsx(classes.root, className)}
			elevation={0}
			{...props}
		>
			<Toolbar>
				<RouterLink to="/">
					<Logo />
				</RouterLink>
				<Typography variant="h4">
					<span> &nbsp; PPE TRACKER</span>
				</Typography>
				<Box flexGrow={1}></Box>

				<Hidden mdDown>
					{/* <IconButton color="inherit">
						<Badge
							badgeContent={notifications.length}
							color="primary"
							variant="dot"
						>
							<NotificationsIcon />
						</Badge>
					</IconButton> */}
					<IconButton color="inherit" onClick={handleLogout}>
						<InputIcon />
					</IconButton>
				</Hidden>
				<Hidden lgUp>
					<IconButton color="inherit" onClick={onMobileNavOpen}>
						<MenuIcon />
					</IconButton>
				</Hidden>
			</Toolbar>
		</AppBar>
	);
};

TopBar.propTypes = {
	className: PropTypes.string,
	onMobileNavOpen: PropTypes.func
};

export default TopBar;

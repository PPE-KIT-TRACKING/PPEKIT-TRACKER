import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//   },
//   details: {
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   content: {
//     flex: '1 0 auto',
//   },
//   cover: {
//     width: 200,
//   },
//   controls: {
//     display: 'flex',
//     alignItems: 'center',
//     paddingLeft: theme.spacing(1),
//     paddingBottom: theme.spacing(1),
//   },
//   playIcon: {
//     height: 38,
//     width: 38,
//   },
// }));

// export default function ProductCard() {
//   const classes = useStyles();
//   const theme = useTheme();

//   return (
//     <Card className={classes.root}>
//       <div className={classes.details}>
//         <CardContent className={classes.content}>
//           <Typography component="h5" variant="h5">
//             Live From Space
//           </Typography>
//           <Typography variant="subtitle1" color="textSecondary">
//             Mac Miller
//           </Typography>
//         </CardContent>
//         <div className={classes.controls}>
//           <IconButton aria-label="previous">
//             {<RemoveIcon />}
//           </IconButton>
//           <IconButton aria-label="play/pause">
//             <PlayArrowIcon className={classes.playIcon} />
//             {/* <OutlinedInput></OutlinedInput> */}
//           </IconButton>
//           <IconButton aria-label="next">
//             {<AddIcon />}
//           </IconButton>
//         </div>
//       </div>
//       <CardMedia
//         className={classes.cover}
//         image="/static/images/avatars/avatar_1.png"
//         title="Live from space album cover"
//       />
//     </Card>
//   );
// }

// ProductCard.propTypes = {
//   className: PropTypes.string,
//   product: PropTypes.object.isRequired
// };

// import React from 'react';
// import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Avatar, Box, Divider, Grid, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: 100
		}
	},
	statsItem: {
		alignItems: 'center',
		display: 'flex'
	},
	statsIcon: {
		marginRight: theme.spacing(1)
	}
}));

const ProductCard = ({ className, product, ...rest }) => {
	const initialState = 0;
	const [quantity, setCount] = useState(initialState);
	function addProduct(props, product) {
		product.count = quantity;
		props.addToCart(product);
		setCount(0);
	}
	function changeCounter(value) {
		if (value === 'increment') {
			setCount(prevCount => prevCount + 1);
		} else if (value === 'decrement') {
			if (quantity !== 0) {
				setCount(prevCount => prevCount - 1);
			}
		}
	}

	const classes = useStyles();
	return (
		<Card className={clsx(classes.root, className)} {...rest}>
			<CardContent>
				<Box display="flex" justifyContent="center" mb={3}>
					<Avatar
						alt="Product"
						src={product.media}
						variant="square"
						color="g"
					/>
				</Box>
				<Typography
					align="center"
					color="textPrimary"
					gutterBottom
					variant="h4"
				>
					{product.title}
				</Typography>
				<Typography align="center" color="textPrimary" variant="body1">
					{product.description}
				</Typography>
			</CardContent>
			<Box flexGrow={1} />
			<Divider />
			<Box p={2}>
				<Grid container justify="space-between" spacing={2}>
					<Grid className={classes.statsItem} item>
						<IconButton
							aria-label="previous"
							onClick={() => changeCounter('decrement')}
						>
							{<RemoveIcon />}
						</IconButton>
						{/* <PlayArrowIcon className={classes.playIcon} /> */}
						<TextField
							id="quantity"
							label="Quantity"
							variant="outlined"
							size="small"
							value={quantity}
						/>
						<IconButton
							aria-label="next"
							onClick={() => changeCounter('increment')}
						>
							{<AddIcon />}
						</IconButton>
					</Grid>

					<Grid className={classes.statsItem} item>
						<Button
							variant="contained"
							color="primary"
							className={classes.button}
							startIcon={<AddCircleIcon />}
							onClick={() => addProduct(rest, product)}
						>
							Add
						</Button>
					</Grid>
				</Grid>
			</Box>
		</Card>
	);
};

ProductCard.propTypes = {
	className: PropTypes.string,
	product: PropTypes.object.isRequired
};

export default ProductCard;

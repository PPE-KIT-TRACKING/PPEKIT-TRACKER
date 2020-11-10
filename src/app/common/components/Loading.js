import React from 'react';
import Page from 'src/app/common/components/Page';
import { Container, makeStyles } from '@material-ui/core';
import ReactLoading from 'react-loading';



const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: theme.palette.background.dark,
		minHeight: '100%',
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3)
    },
    loader:{ position: "fixed", top: "65%", left: "50%", transform: "translate(-50%, -50%)" }
}));

const Loading = () => {
	const classes = useStyles();
	return (
		<Page className={classes.root} title="Loading">
			<Container maxWidth={false}>
				<ReactLoading
					type={'bubbles'}
					color={'#3f51b5'}
					height={380}
					width={300}
					className={classes.loader}
				/>
			</Container>
		</Page>
	);
};


export default Loading;


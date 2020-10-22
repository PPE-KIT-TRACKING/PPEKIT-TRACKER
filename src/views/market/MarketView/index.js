import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Market = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Market"
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <h1>Market Place</h1>
        </Grid>
      </Container>
    </Page>
  );
};

export default Market;

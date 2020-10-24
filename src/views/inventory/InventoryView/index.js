import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Inventory = () => {
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
          <div>
            <h1>Inventory</h1>
          </div>
        </Grid>
      </Container>
    </Page>
  );
};

export default Inventory;

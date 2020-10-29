import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/app/common/components/Page';
import LatestOrders from './LatestOrders';




const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Orders = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Orders"
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={4}
        >
          <Grid
            item
            lg={10}
            md={14}
            xl={11}
            xs={14}
          >
            <LatestOrders />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Orders;

import React from 'react';
import {
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/app/common/components/Page';
import Checkout from './Checkout'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CheckoutRequestView = () => {
  const classes = useStyles();
  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Container maxWidth={false}>
        <Checkout/>
      </Container>
    </Page>
  );
};

export default CheckoutRequestView;

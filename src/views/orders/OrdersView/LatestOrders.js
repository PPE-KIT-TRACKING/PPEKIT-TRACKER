import React from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  makeStyles
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { connect } from 'react-redux';
import { loadOrders } from './ordersActions';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

const LatestOrders = ({ className, ...props }) => {
  const classes = useStyles();
  const orders = props.orders;
  props.loadOrders();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...props}
    >
      <CardHeader title="Latest Orders" />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={700}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Order Ref
                </TableCell>
                <TableCell>
                  Item Name
                </TableCell>
                <TableCell>
                  Quantity
                </TableCell>
                <TableCell sortDirection="desc">
                  <Tooltip
                    enterDelay={300}
                    title="Sort"
                  >
                    <TableSortLabel
                      active
                      direction="desc"
                    >
                      Date
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  Cost Offered
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
                <TableCell>
                  Supplier Detail
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders && orders.map((order) => (
                <TableRow
                  hover
                  key={order.id}
                >
                  <TableCell>
                    {order.ref}
                  </TableCell>
                  <TableCell>
                    {order.itemName}
                  </TableCell>
                  <TableCell>
                    {order.quantity}
                  </TableCell>
                  <TableCell>
                    {moment(order.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    {order.costOffered}
                  </TableCell>
                  <TableCell>
                    <Chip
                      color="primary"
                      label={order.status}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      className={classes.button}
                      startIcon={<InfoIcon />}
                    >
                      More Info
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};

LatestOrders.propTypes = {
  className: PropTypes.string
};

const mapState = (state) => {
  return {
		orders: state.firestore.ordered.orders
  };
}

const mapActions = {
  loadOrders
}

export default compose(
  connect(mapState, mapActions),
  firestoreConnect([{
    collection:"orders"
  }])
)(LatestOrders);

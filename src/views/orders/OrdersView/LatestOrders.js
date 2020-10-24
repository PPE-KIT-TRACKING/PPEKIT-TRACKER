import React, { useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
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


const data = [
  {
    id: uuid(),
    ref: 'CDD1049',
    amount: 30.5,
    supplier: {
      name: 'Ekaterina Tankova'
    },
    createdAt: 1555016400000,
    status: 'pending',
    costOffered: 1000,
    itemName: "Sanitizer",
    quantity:10
  },
  {
    id: uuid(),
    ref: 'CDD1048',
    amount: 25.1,
    supplier: {
      name: 'Cao Yu'
    },
    createdAt: 1555016400000,
    status: 'delivered',
    costOffered: 1000,
    itemName: "Sanitizer",
    quantity:10
  },
  {
    id: uuid(),
    ref: 'CDD1047',
    amount: 10.99,
    supplier: {
      name: 'Alexa Richardson'
    },
    createdAt: 1554930000000,
    status: 'refunded',
    costOffered: 1000,
    itemName: "Sanitizer",
    quantity:10
    
  },
  {
    id: uuid(),
    ref: 'CDD1046',
    amount: 96.43,
    supplier: {
      name: 'Anje Keizer'
    },
    createdAt: 1554757200000,
    status: 'pending',
    costOffered: 1000,
    itemName: "Sanitizer",
    quantity:10
  },
  {
    id: uuid(),
    ref: 'CDD1045',
    amount: 32.54,
    supplier: {
      name: 'Clarke Gillebert'
    },
    createdAt: 1554670800000,
    status: 'delivered',
    costOffered: 1000,
    itemName: "Sanitizer",
    quantity:10
  },
  {
    id: uuid(),
    ref: 'CDD1044',
    amount: 16.76,
    supplier: {
      name: 'Adam Denisov'
    },
    createdAt: 1554670800000,
    status: 'delivered',
    costOffered: 1000,
    itemName: "Sanitizer",
    quantity:10
  }
];

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

const LatestOrders = ({ className, ...rest }) => {
  const classes = useStyles();
  const [orders] = useState(data);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
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
              {orders.map((order) => (
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

export default LatestOrders;

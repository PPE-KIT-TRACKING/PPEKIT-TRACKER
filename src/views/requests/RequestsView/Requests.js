import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import { useNavigate } from 'react-router-dom';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(name, location, requiredby, verified) {
  return {
    name,
    location,
    requiredby,
    verified,
    ppeNeeded: [
      { item: 'Sanitizers', quantity: 3 },
      { item: 'Masks', quantity: 1 },
    ],
  };
}

function Row(props) {

  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const navigate = useNavigate();
  const handleSupply = () => { 
    navigate('/app/checkoutreq', { replace: true });
  }

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.location}</TableCell>
        <TableCell align="right">{row.requiredby}</TableCell>
        <TableCell align="right">{row.verified}</TableCell>
        <TableCell align="right">
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            startIcon={<LocalShippingIcon />}
            onClick={handleSupply}
          >
            Supply
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                PPE Needed
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.ppeNeeded.map((ppeNeededRow) => (
                    <TableRow key={ppeNeededRow.item}>
                      <TableCell component="th" scope="row">
                        {ppeNeededRow.item}
                      </TableCell>
                      <TableCell align="right">{ppeNeededRow.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    location: PropTypes.string.isRequired,
    verified: PropTypes.string.isRequired,
    requiredby: PropTypes.string.isRequired,
    ppeNeeded: PropTypes.arrayOf(
      PropTypes.shape({
        quantity: PropTypes.number.isRequired,
        item: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    makeproposal: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData('Ankur Hospital', 'New Delhi', '31/10/2020', 'Yes'),
  createData('Vishal Hospital', 'New Delhi', '31/10/2020', 'Yes'),
  createData('Kriplani Hospital', 'New Delhi', '31/10/2020', 'Yes'),
];



export default function Requests() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Hospital Name</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Required by</TableCell>
            <TableCell align="right">Verified</TableCell>
            <TableCell align="right">Make a Proposal</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

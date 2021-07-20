import React from 'react';
// import { useDispatch } from 'react-redux';{ useEffect, useState }
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';



function preventDefault(event) {
  event.preventDefault();
}


const useStyles = makeStyles((theme) => ({
  display: {
    display: "none",
    displayPrint: "none",
    visibility: "hidden" 
  },
   root: {
    width: '25%',
  },
  container: {
    maxHeight: 440,
  },
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const Orders = (company) => {

  let companyData = company.company;
 
  let Profit = companyData.numberOfStocks * companyData.currentPrice
  
  const classes = useStyles();
  return (
    <React.Fragment>
      <Table size="small">
        <TableHead align="center">
          <TableRow>
            <TableCell>Date of purchase</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Stocks</TableCell>
            <TableCell>Price of purchase</TableCell>
            <TableCell>Current price</TableCell>
            <TableCell align="right">Profit(+-)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody  >
            <TableRow key={companyData.id} width='25%'>
              {/* <Company className={classes.item} company={company} >Date</Company> */}
              <TableCell  >{companyData.dateOfPurchase}</TableCell>
              <TableCell width='25%'>{companyData.name}</TableCell>
              <TableCell width='25%'>{companyData.numberOfStocks} </TableCell>
              <TableCell width='25%'>{companyData.bothPrice} $</TableCell>
              <TableCell width='25%'>{companyData.currentPrice} $</TableCell>
              <TableCell width='25%' align="right">{Profit} $</TableCell>
            </TableRow>
        </TableBody>
      </Table>´
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
      
    </React.Fragment>
  );
}

export default Orders;





import React from 'react';
// import { useDispatch } from 'react-redux';{ useEffect, useState }
import { makeStyles } from '@mui/material/core/styles';
import Table from '@mui/material/core/Table';
import TableBody from '@mui/material/core/TableBody';
import TableCell from '@mui/material/core/TableCell';
import TableHead from '@mui/material/core/TableHead';
import TableRow from '@mui/material/core/TableRow';






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
        {/* <TableHead align="center">
          <TableRow>
            <TableCell>Date of purchase</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Stocks</TableCell>
            <TableCell>Price of purchase</TableCell>
            <TableCell>Current price</TableCell>
            <TableCell align="right">Value</TableCell>
          </TableRow>
        </TableHead> */}
        <TableBody  >
            <TableRow key={companyData.id} width='25%'>
              {/* <Company className={classes.item} company={company} >Date</Company> */}
              <TableCell width='19%'  >{companyData.dateOfPurchase}</TableCell>
              <TableCell width='19%'>{companyData.name}</TableCell>
              <TableCell width='19%'>{companyData.numberOfStocks} </TableCell>
              <TableCell width='19%'>{companyData.bothPrice} $</TableCell>
              <TableCell width='15%'>{companyData.currentPrice} $</TableCell>
              <TableCell width='19%' align="right" >{Profit} $</TableCell>
            </TableRow>
        </TableBody>
      </Table>´
    
      
    </React.Fragment>
  );
}

export default Orders;





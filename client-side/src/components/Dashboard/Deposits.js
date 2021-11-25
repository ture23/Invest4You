import React from 'react';
// import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
// import InvestorRelations from '../InvestorRelations/InvestorRelations';

// function preventDefault(event) {
//   event.preventDefault();
// }

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits(companies) {
  const classes = useStyles();
  let companyData = companies.companies
  let array = [];
  let summary;
  
  companyData.forEach(el => {
    let sum = el.numberOfStocks * el.currentPrice
    array.push(sum)
    // console.log(array)
    const reducer = (accumulator, curr) => accumulator + curr;
  
  
     summary = (array.reduce(reducer) * 0.89)
    // return summarray
  })
  
  
 
  console.log(summary)
  return (
    <React.Fragment>
      <Title>Trenutni Kapital</Title>
      <Typography component="p" variant="h4">
        { summary } €
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
         24 Lip, 2021
      </Typography>
      {/* <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div> */}
      {/* <div display='none' >
        <InvestorRelations summary={summary}/>
      </div> */}
    </React.Fragment>
  );
}
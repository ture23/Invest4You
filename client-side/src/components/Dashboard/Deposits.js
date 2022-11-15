import React from 'react';
// import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
// import Chart from './Chart';
// import { useDispatch } from 'react-redux';
// import { createPrice } from '../../action/company'
import { useSelector } from 'react-redux'




const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits(companies) {
  const classes = useStyles();
  let companyData = companies.companies
  let array = [];
  let priceArray = []
  let summaryPrice;
  // const dispatch = useDispatch();

  const price = useSelector((state) => state.price)
  
  companyData.forEach(el => {
    let sum = el.numberOfStocks * el.currentPrice
    array.push(sum)
    const reducer = (accumulator, curr) => accumulator + curr;
  
  
     summaryPrice = (array.reduce(reducer) * 0.89)
  })

  price.forEach(el => {
     priceArray.push(el.price)
   })
  // const lastValueinPriceArray = priceArray[priceArray.length - 1]
  
  // if (lastValueinPriceArray !== summaryPrice) {
  //   return dispatch(createPrice(summaryPrice))
  // }

  return (
    <React.Fragment>
      <Title>Trenutni Kapital</Title>
      <Typography component="p" variant="h4">
        { summaryPrice } €
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
import React, { useEffect, useState} from 'react';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';

import { GetAllPrices } from '../../action/company'


// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}


export default function Chart(companies) {
  const theme = useTheme()
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(0);

  const price = useSelector((state) => state.price)
  let companyData = companies.companies
  let arraycompaniprice = [];
  let arrayPortifolioValue = []; 
  let arrayDate = []
  let summary;
  // let graphData = []
  let Newdate = new Date();
   let data = [
       
  ];

  price.forEach(el => {
    arrayDate.push(el.createdAt.substring(0, 7))
    arrayPortifolioValue.push(el.price)
    data.push(createData(el.createdAt.substring(0, 7), el.price))

  })
  
  var date = Newdate.getFullYear() + '-' + (Newdate.getMonth() + 1) + '-' + Newdate.getDate();
  
  companyData.forEach(el => {
    let sum = el.numberOfStocks * el.currentPrice
    arraycompaniprice.push(sum)
      // console.log(array)
      const reducer = (accumulator, curr) => accumulator + curr;
    
    
  summary = (arraycompaniprice.reduce(reducer) * 0.85) 
  summary = Math.floor(summary)
  
  
  })
 


   const [NewPrice, setNewPrice] = useState({
            price: summary
     })
  
  
 
  useEffect(() => {
          dispatch(GetAllPrices());
     }, [dispatch])
  
  //   // TREBA SAD UZETI PODATKE OD       dispatch(GetAllPrices()) I UBACITI IH U LINACHART SA DATUMOM 


  
  return (
    <React.Fragment>
      <Title>Stanje od prvog ulaganja</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Dobit (€)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}

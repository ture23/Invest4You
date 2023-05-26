import React from 'react'
// '''''''''''''''''''''''''''''''''''''''''//
import Container from '@mui/material/core/Container';
// ''''''''''''''''''''''''''''''''''''''''''//
import Chart from "react-google-charts"
import InvestorsNews from './InvestorsNews';
import useStyles from './styles'
import { useSelector } from 'react-redux'


export default function InvestorRelations({summary}) {
    // const summ = useSelector((state) => state.summary)
    const classes = useStyles();
    const novosti = useSelector((state) => state.news)
    function getData(data) {
        return data.map(item => {
            return [item.title, item.url]
        })
    }
    // unit test
    
    return (
        <Container className={classes.container} >
            <div className={classes.box} fontSize="small" >
            
                <Chart
                    width={'600px'}
                    height={'400px'}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Ivestitor', 'Postotak ulaganja'],
                        ['Marko Olivera Turic', 3607],
                        ['Franjo Dujo', 724],
                        ['Nikola Marina Vukovic', 724],
                        ['Goran Terezija Grebenar', 724], // Below limit.
                        ['Marko Ivana Matosevic', 5928], // Below limit.
                        ['Mario Biljaka', 682], // Below limit.
                        ['Josip Vukovic', 910], // Below limit.
                    ]}
                    options={{
                        title: 'Udio Investitora',
                        // sliceVisibilityThreshold: 0.2, // 20%
                    }}
                    rootProps={{ 'data-testid': '7' }}
                />
            </div>
            
            <InvestorsNews novosti={novosti}/>


        </Container>
        
    )
}

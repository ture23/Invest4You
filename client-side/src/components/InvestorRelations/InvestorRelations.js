import React from 'react'
// '''''''''''''''''''''''''''''''''''''''''//
import Container from '@material-ui/core/Container';
// ''''''''''''''''''''''''''''''''''''''''''//
import Chart from "react-google-charts"
import InvestorsNews from './InvestorsNews';
import useStyles from './styles'
import { useSelector } from 'react-redux'


export default function InvestorRelations({summary, news}) {
    // const summ = useSelector((state) => state.summary)
    const classes = useStyles();
    const novosti = useSelector((state) => state.news)
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
                        ['Marko Olivera Turic', 1000],
                        ['Franjo Dujo', 1000],
                        ['Nikola Marina Vukovic', 1000],
                        ['Goran Terezija Grebenar', 1000], // Below limit.
                        ['Marko Ivana Matosevic', 1000], // Below limit.
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

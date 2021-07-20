import React from 'react'
// '''''''''''''''''''''''''''''''''''''''''//
import Container from '@material-ui/core/Container';
// ''''''''''''''''''''''''''''''''''''''''''//
import Chart from "react-google-charts"


export default function InvestorRelations(summary) {
    // const summ = useSelector((state) => state.summary)

    // console.log(summ)
    return (
        <Container>
            <div  fontSize="small" >
            
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



        </Container>
        
    )
}

import React from 'react';
import {Grid, CircularProgress} from '@material-ui/core'
import { useSelector } from 'react-redux'

import useStyles from './styles';
import Company from './Company/company';



const Companies = ({setCurrentId}) => {
    const companies = useSelector((state) => state.company)
    const classes = useStyles();

    // console.log(companies);
    return (
        !companies.length ? <CircularProgress /> : (
            <Grid className={classes.container} direction-sm-row  container alignItems="center" spacing={6}>
                {
                    companies.map((company) => (
                        <Grid kay={company._id} className={classes.item} alignItems="center" direction-xs-row item xs={12} sm={6}>
                            <Company className={classes.item} company={company} setCurrentId={setCurrentId} /> 
                        </Grid>
                    ))
                }

            </Grid>
       )
    );
}

export default Companies;
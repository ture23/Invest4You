import React from 'react';
import { useSelector } from 'react-redux'


import { Container, Typography, CardMedia } from '@material-ui/core';
import useStyles from './style';


const CompanyOverview = () => {
    const classes = useStyles();
    const company = useSelector((state) => state.company)
    console.log(company._id)
    return (
        <div>
            <Container className={classes.container}>
                CompanyOverviewCompanyOverviewCompanyOverviewCompanyOverviewCompanyOverviewCompanyOverviewCompanyOverview
                <Typography variant="h6"></Typography>
                <CardMedia className={classes.media} image={company.selectedFile} title="Paella dish" />

            </Container>
        </div>
    )
}

export default CompanyOverview;
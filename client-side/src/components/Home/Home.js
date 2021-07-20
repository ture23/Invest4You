import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { Container, Typography, Grow, Grid } from '@material-ui/core';

import Companies from '../Companies/companies'
import Form from '../Forms/form'

// import useStyles from './styles';
import { getAllCompanies } from '../../action/company';

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    container: {
    maxWidth: '100%',
      width: '100%'
  },
    grid: {
      maxWidth: '50%',
      float: 'right',
      
  },
  text: {
    fontSize: '22px',
    textAlign: 'center'
  },
  item: {
    maxWidth: '20%'
  }
}));



const App = () => {
    const classes = useStyles();
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
    // const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));


  useEffect(() => {
    // const user = JSON.parse(localStorage.getItem('profile'));
       

       dispatch(getAllCompanies());
      //  console.log(user.data.user.name) item xs={12} sm={6}

    }, [currentId, dispatch])
  return (
    <Container className={classes.container} >
      <Grow in>
        <Container className={classes.container}>
          <Grid container className={classes.container} justify="space-between" alignItems="stretch" spacing={3}>
              <Grid className={classes.container} direction-sm-row  >
                <Companies className={classes.item} setCurrentId={setCurrentId} />                
             </Grid>
              {((user?.result?.role === "admin") && (
                <Grid item xs={12} sm={4}> 
                    <Form currentId={currentId}  setCurrentId={setCurrentId} />
                </Grid>
            ))}
            {(user?.result?.role === "user" || !user) && (
                <Grid className={classes.grid} variant="h6" align="center">
                  <Typography className={classes.text}>

                  </Typography>
                </Grid>
            )}
            
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;
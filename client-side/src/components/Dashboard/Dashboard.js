import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@mui/material/core/styles';
import CssBaseline from '@mui/material/core/CssBaseline';
import Box from '@mui/material/core/Box';
import Typography from '@mui/material/core/Typography';
import Container from '@mui/material/core/Container';
import Grid from '@mui/material/core/Grid';
import Paper from '@mui/material/core/Paper';
import Link from '@mui/material/core/Link';

import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import { useDispatch } from 'react-redux';

import TableCell from '@mui/material/core/TableCell';
import TableHead from '@mui/material/core/TableHead';
import TableRow from '@mui/material/core/TableRow';
import TableBody from '@mui/material/core/TableBody';



import { useSelector } from 'react-redux'

import { getAllCompanies, GetAllPrices } from '../../action/company';
import InvestorRelations from '../InvestorRelations/InvestorRelations';



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Invest4You
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function preventDefault(event) {
  event.preventDefault();
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  invR: {
    display: 'none'
  }
}));

export default function Dashboard( summary, price ) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(0);

  
  
  
  const companies = useSelector((state) => state.company)
  console.log(companies);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
 
     useEffect(() => {
        if (window.performance) {

          dispatch(getAllCompanies());
          dispatch(GetAllPrices())
        }
     }, [currentId, dispatch,])
 

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
   
    <div>
      {user ? (<div className={classes.root} >
        <CssBaseline />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper className={fixedHeightPaper}>
                  <Chart companies={companies} />
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper className={fixedHeightPaper}>
                 
                  <Deposits companies={companies}/>
                      
                </Paper>
              </Grid>
              {/* Recent Orders */}
              
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <TableHead>
                      <TableRow>
                        <TableCell width='20%' >Date of purchase</TableCell>
                        <TableCell width='20%'>Company</TableCell>
                        <TableCell width='20%' >Stocks</TableCell>
                        <TableCell width='20%' >Price of purchase</TableCell>
                        <TableCell width='20%' >Current price</TableCell>
                        <TableCell width='20%'  align="right">Value</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                  Current Portfolio
                  {companies.map((company) => (
                    <Orders company={company} />
                  ))}
                  </TableBody>
                  <div className={classes.seeMore}>
                    <Link color="primary" href="#" onClick={preventDefault}>
                      See more orders
                    </Link>
                  </div>
                </Paper>
              </Grid>
              
            </Grid>
            <Box pt={4}>
              <Copyright />
            </Box>
          </Container>
        </main>
      </div>) : (
          <Paper className={classes.paper} variant="outlined">
            <InvestorRelations className={classes.invR} companies={companies} />
                <Typography variant="h6" align="center" >
                    Please Sing In to see more!!!!
                </Typography>
            </Paper>
      )}
    </div>
  );
}
import React from 'react'
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';



import CompanyOverview from './components/Companies/Company/companyOverview';
import Navbar2 from './components/Navbar/Navbar2';
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import Footer from './Footer';
import Dashboard from './components/Dashboard/Dashboard';
import InvestorRelations from './components/InvestorRelations/InvestorRelations';


const useStyles = makeStyles((theme) => ({
    container: {
        maxWidth: '2100px'
    }
}));

const App = () => {
  const classes = useStyles();
  
    
    return (
        <BrowserRouter>
            <Container className={classes.container}  maxwidth='100%'>
                <Navbar2 />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/CompanyOverview" exact component={CompanyOverview} />
                    <Route path="/auth" exact component={Auth} />
                    <Route path="/MyAccount" exact component={Dashboard} />
                    <Route path="/ir" exact component={InvestorRelations} />
                </Switch>
                <Footer/>
            </Container>
        </BrowserRouter>
      
    )
}

export default App; 
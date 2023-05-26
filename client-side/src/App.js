import React, {useEffect} from 'react'
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';


import CompanyOverview from './components/Companies/Company/companyOverview';
import Navbar2 from './components/Navbar/Navbar2';
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import ForgotPassword from './components/Auth/ForgotPassword'
import Footer from './Footer';
import Dashboard from './components/Dashboard/Dashboard';
import InvestorRelations from './components/InvestorRelations/InvestorRelations';
import UserProfile from './components/User/UserProfile';
import AllUsers from './components/User/AllUsers';
import { getAllUsers } from './action/user';


const useStyles = makeStyles((theme) => ({
    container: {
        maxWidth: '2100px'
    }
}));

const App = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getAllUsers());
        // dispatch(getMe());
    }, [dispatch]);

  
    
    return (
        <BrowserRouter>
            <Container className={classes.container}  maxwidth='100%'>
                <Navbar2 />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/CompanyOverview" exact component={CompanyOverview} />
                    <Route path="/auth" exact component={Auth} />
                    <Route path="/forgotPassword" exact component={ForgotPassword} />
                    <Route path="/MyAccount" exact component={Dashboard} />
                    <Route path="/ir" exact component={InvestorRelations} />
                    <Route path="/me" exact component={UserProfile} />
                    <Route path="/users/all" exact component={AllUsers} />
                </Switch>
                <Footer/>
            </Container>
        </BrowserRouter>
      
    )
}

export default App; 
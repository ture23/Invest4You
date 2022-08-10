import React, { useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';


//  Avatar,, Button
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'
// import DropDownMenu from '../Dashboard/DropDownMenu'

const useStyles = makeStyles((theme) => ({
  root: {
        flexGrow: 1,
        marginBottom: '4%'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
      flexGrow: 1,
      marginLeft: '5px',
      fontSize: '35px'
    },
    name: {
        flexGrow: 1,
        marginLeft: '5px'
}
  
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    // const classes = useStyles();
    const [user, setUser]  = useState(JSON.parse(localStorage.getItem('profile1')));
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    
    const logOut = () => {
        dispatch({ type: 'LOGOUT' });

        history.push('/')
        setUser(null);
    }


    useEffect((logOut, user) => {
     


        const token = user.token;

        if (token) {
            const decodedToken = decode(token)

            if (decodedToken.exp * 1000 < new Date().getTime()) logOut();
            
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMyAccount = () => {
    history.push('/MyAccount')
    setAnchorEl(null);
  }
   const handleIR = () => {
     history.push('/ir')
     setAnchorEl(null);
  }
  const goHome = () => {
    history.push('/')
  }
  return (
    <div className={classes.root}>
        <FormGroup>
            {user? ( <FormControlLabel      
                control={<Switch checked={auth} onChange={handleChange} onClick={logOut} aria-label="login switch" />}
                label='Logout'/> 
              ): (
                  <FormControlLabel      
                    control={<Switch component={Link} to="/auth"  checked={auth} onChange={handleChange} aria-label="login switch" />}
                    label='Login'/> 
            )}      
           
      </FormGroup>
        <AppBar position="static">
            <Toolbar>
                {user? (
                  <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                      {/* <DropDownMenu /> */}
                  </IconButton>
                ): (null)}
                
                <Typography name="hover-feedback" onClick={goHome} variant="h6" className={classes.title}>
                    <IconButton color="inherit" >Invest4You</IconButton>
                </Typography>
                {user && (
                      
                    <div>
                        
                            
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                              <AccountCircle />
                              <Typography className={classes.name} variant="h6">{user?.result?.name}</Typography>
                        </IconButton>
                        
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleIR}>Investor Relations</MenuItem>
                            <MenuItem onClick={handleMyAccount} 
                              // control={<Switch component={Link} to="/MyAccount"
                              // checked={auth}
                              // onChange={handleChange}
                              // aria-label="login switch" />}
                              >Dashboard</MenuItem>
                        </Menu>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    </div>
  );
}

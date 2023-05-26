import React, { useState, useEffect} from 'react';
import { makeStyles } from '@mui/material/core/styles';

import IconButton from '@mui/material/core/IconButton';
import AccountCircle from '@mui/material/icons/AccountCircle';
import FormGroup from '@mui/material/core/FormGroup';
import MenuItem from '@mui/material/core/MenuItem';
import Menu from '@mui/material/core/Menu';
import Button from '@mui/material/core/Button';


import { AppBar, Toolbar, Typography } from '@mui/material/core';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'

const useStyles = makeStyles((theme) => ({
  root: {
        flexGrow: 1,
        marginBottom: '4%',
        position: 'fixed',
        zIndex: 1,
        
  },
  navi: {
    zIndex:0
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
  },
  LogIn: {
      backgroundColor: 'hsl(134, 64%, 50%)',
      '&:hover': {
        backgroundColor: '#0069d9',
        color: 'white'
      },
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
     


        const token = user?.token;

        if (token) {
            const decodedToken = decode(token)

            if (decodedToken.exp * 1000 < new Date().getTime()) logOut();
            
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

  // const handleChange = (event) => {
  //   setAuth(event.target.checked);
  // };

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
  const getMe = () => {
    history.push('/Me');
    setAnchorEl(null);

  }
  const allUsers = () => {
    history.push('/Users');
    setAnchorEl(null);
  }

    
 
  const goHome = () => {
    history.push('/')
  }
  return (
    <div className={classes.root}>
        <FormGroup className={classes.navi}>
          
               
           
      </FormGroup>
        <AppBar >
            <Toolbar>
                {user? (
                  <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                      {/* <DropDownMenu /> */}
                  </IconButton>
                ): (null)}
                
                <Typography name="hover-feedback" onClick={goHome} variant="h6" className={classes.title}>
                    <IconButton color="inherit" >Invest4You</IconButton>
                </Typography>
                {!user? (
                      
                  <Button variant="contained" color="default" href="/auth" className={classes.LogIn}>
                    Login
                  </Button>
                ): (
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
                          <MenuItem onClick={getMe}>My Account</MenuItem>
                          <MenuItem onClick={allUsers}>All Users</MenuItem>
                          <MenuItem onClick={handleIR}>Investor Relations</MenuItem>
                          <MenuItem onClick={handleMyAccount} 
                                // control={<Switch component={Link} to="/MyAccount"
                                // checked={auth}
                                // onChange={handleChange}
                                // aria-label="login switch" />}
                          >Dashboard</MenuItem>
                          <MenuItem onClick={logOut}>LogOut</MenuItem>
                        </Menu>
                    </div>
                  )}
            </Toolbar>
        </AppBar>
    </div>
  );
}



// <FormControlLabel      
//                 control={<Switch checked={auth} onChange={handleChange} onClick={logOut} aria-label="login switch" />}
//                 label='Logout'/> 
import React from 'react';
import useStyles from './styles';

import EditIcon from '@mui/icons-material/Edit';
import Container from '@material-ui/core/Container';
import Avatar from '@mui/material/Avatar';
import {Button, Box, Typography, TextField, Paper } from '@material-ui/core'

// html template for the CurrentUser profile page
export default function UserProfile({ user }) {

   
    console.log(user)
    
    const classes = useStyles();
    const CurrentUser = JSON.parse(localStorage.getItem('profile'));
    console.log(CurrentUser.result);
    

    return (
        <Container className={classes.container} maxWidth='md'>
            <Box className={classes.box}>
                <Box className={classes.box}>
                    <Avatar className={classes.avatar}   sx={{ width: 80, height: 80 }}>
                        <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" />
                        <EditIcon />
                    </Avatar>
                    <h1>{CurrentUser.result.name}</h1>
                </Box>
                <hr/>
                <Box className={classes.box}>
                    <Typography className={classes.typography} variant="h5">
                        Email:
                        <Typography
                            className={classes.typography}
                            variant="h6">
                            {CurrentUser.result.email}
                        </Typography >
                    </Typography>
                    <Typography className={classes.typography} variant="h5">
                        Ulozeni Kapital:
                        <Typography
                            className={classes.typography}
                            variant="h6">
                            {CurrentUser.result.capital}
                        </Typography >
                    </Typography>
                    
                    <Typography className={classes.typography} variant="h5">
                        Trenutni Kapital:
                        <Typography
                            className={classes.typography}
                            variant="h6">
                            {CurrentUser.result.capital}
                        </Typography>
                    </Typography >
                </Box>
                <hr />
                <Box>

                    <Paper className={classes.paper}>
                        <Typography variant="h5" component="h3">
                            Promjeni Sifru
                        </Typography>
                        <Box  className={classes.box}>
                            <TextField className={classes.textfield}
                                id="standard-password-input"
                                label="Current Password"
                                type="password"
                                autoComplete="current-password"
                            />

                        </Box>
                        <Box  className={classes.box}>
                             <TextField className={classes.textfield}
                                id="filled-password-input"
                                label="New Password"
                                type="password"
                                autoComplete="current-password"
                            />
                        </Box>
                        <Box className={classes.box}>
                                <TextField className={classes.textfield}
                                id="filled-password-input"
                                label="Repeat Password"
                                type="password"
                                autoComplete="current-password"
                            />
                        </Box>
                        <Box className={classes.box}>
                            
                            <Button variant="contained" color="success">Outlined</Button>
                        </Box>
                           


                    </Paper>
                </Box>
               
            </Box>
        
        
        </Container>
    )
}


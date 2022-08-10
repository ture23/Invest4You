
import React, {useState} from 'react'
import {Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom'
import useStyles from './styles' 
import Input from './input'
import Icon from './icon'
import {signup, singin} from '../../action/auth'
 
const initialState = { firstname: '', lastname: '', email: '', password: '', passwordConfirm: '' };

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSingUp, setIsSingUp] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory()
    const [formData, setFormData] = useState(initialState);

    const handelShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword )

    const handelSubmit = (e) => {
        e.preventDefault();
        if (isSingUp) {
            dispatch(signup(formData, history)); 
        } else {
            dispatch(singin(formData, history)); 
            
        }
        history.push('/')
    }
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const switchMode = () => {
        setIsSingUp((prevIsSingUp) => !prevIsSingUp);
        setShowPassword(false);
    }

    const googleFailure = (error) => {
        console.log(error)
    };


    const googleSuccess = async (res) => {
        const result = res.profileObj;
        const token = res.tokenId;

        try {
            dispatch({ type: 'AUTH', data: { result, token } })
            history.push('/')
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    };
    

    return (
        <Container className={classes.container} component="main" maxwidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar} >
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5" >{isSingUp ? 'Sing Up' : 'Log In'}</Typography>
                <form className={classes.form} onSubmit={handelSubmit}>
                    <Grid container spacing={2}>
                        {isSingUp && (
                        <>
                            <Input name="firstname" label="First Name" handleChange={handleChange}  half  />
                            <Input name="lastname" label="Last Name" handleChange={handleChange}  half />
                        </>       
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="password" handleChange={handleChange} type={showPassword ? "text" : "password"} handelShowPassword={handelShowPassword} />
                        {isSingUp && <Input name="passwordConfirm" label="Repeat Password" handleChange={handleChange}type="passwordConfirm"/> }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSingUp ? 'Sing Up' : 'Log In'}
                    </Button>
                    <GoogleLogin
                        clientId="613985626492-46m31uene351eqnomljqrk2j9utk0pfn.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button
                                className={classes.googleButton}
                                color="primary"
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon />}
                                variant="contained"
                            >
                                Google Log In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSingUp ? 'Have Account!!! Log In ' : 'Don\'t have Account!!! Sing Up'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth

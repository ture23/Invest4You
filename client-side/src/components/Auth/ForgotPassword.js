
import React, {useState} from 'react'
import {Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
// import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom'
import useStyles from './styles' 
import Input from './input'
// import Icon from './icon'
import {forgotPassword} from '../../action/auth'
 
const initialState = { firstname: '', lastname: '', email: '', password: '', passwordConfirm: '' };

const ForgotPassword = () => {
    const classes = useStyles();
    // const [showPassword, setShowPassword] = useState(false);
    // const [isSingUp, setIsSingUp] = useState(false);
    // const [isPassForgot, setPassForgot] = useState();
    const dispatch = useDispatch();
    const history = useHistory()
    const [formData, setFormData] = useState(initialState);

    // const handelShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword )

    const handelSubmit = (e) => {
        console.log('email poslan')
        dispatch(forgotPassword(formData, history))
    }
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const switchMode = () => {
     history.push('/auth')
    }
    //  const switchTOFOrgotPass = () => {
    //    history.push('/forgotPassword')
    // }

    // const googleFailure = (error) => {
    //     console.log(error)
    // };


    // const googleSuccess = async (res) => {
    //     const result = res?.profileObj;
    //     const token = res?.tokenId;

    //     try {
    //         dispatch({ type: 'AUTH', data: { result, token } })
    //         history.push('/')
    //         window.location.reload();
    //     } catch (error) {
    //         console.log(error)
    //     }
    // };
    
// PUT JE USPOSTAVLJEN TREBA DALJE ZA PROMJENU SIFRE I GRESKE 
    return (
        <Container className={classes.container} component="main" maxwidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar} >
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5" >Send Recovery Email</Typography>
                <form className={classes.form} onSubmit={handelSubmit}>
                    <Grid container spacing={2}>
                     
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        Send Email
                    </Button>
                   
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                             'Don\'t have Account!!! Sing Up'
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default ForgotPassword

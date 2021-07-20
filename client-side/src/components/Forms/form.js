import React, {useState, useEffect} from 'react';
import FileBase64 from 'react-file-base64';
import { Button, Typography, TextField, Paper } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'

import useStyles from './styles';
import {createCompany, updateCompany} from '../../action/company'
// import { updatePost } from '../../../../srver/controllers/posts';
const Form = ({currentId, setCurrentId }) => {

    const [copanytData, setcompanytData] = useState({
            name: '',
            address: '',
            descriptionFull: '',
            descriptionSmall: '',
            bothPrice: '',
            currentPrice: '',
            myValuePrice: '',
            numberOfStocks: '',
            dateOfPurchase: '',
            selectedFile: '',
            industry: ''
     })
    const company = useSelector((state) => currentId ? state.company.find((p) => p._id === currentId): null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    // console.log(user.result)
    useEffect(() => {
        if (company) setcompanytData(company);
    }, [company])
    //  createPost({...postData, name: user?.result?.name}) updatePost(currentId, {...postData, name: user?.result?.name})
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(copanytData)
        if (currentId === 0) {
            // dispatch(createPost({...postData, name: user?.result?.name}))
            dispatch(createCompany(copanytData))
        } else {
          
            dispatch(updateCompany(currentId, copanytData));
        }

        clear();
            
            

        clear();
        setTimeout(() => {
        window.location.reload();
            
        }, 1000);
    }
    
    const clear = () => {
        setCurrentId(null);
        setcompanytData({  
            name: '',
            address: '',
            descriptionFull: '',
            descriptionSmall: '',
            bothPrice: '',
            currentPrice: '',
            myValuePrice: '',
            numberOfStocks: '',
            dateOfPurchase: '',
            selectedFile:'',
            industry: ''
        })
    }

    if (user.result.role === 'user') {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sing In to create post!!!!
                </Typography>
            </Paper>
        )
    }

    if (user.result.role === 'admin') {
        return (
        
            <Paper className={classes.paper}>
                <form autoComplete="off" noValidate className={`${classes.form} ${classes.form}`} onSubmit={handleSubmit}>
                    <Typography variant="h6"> {currentId ? 'Editing' : 'Creating'} Company</Typography>                                                   {/*  //ovo je samo da se ovaj textfile promjeni da nemjenja ostale */}
                    <TextField name="name" variant="outlined" label="name" fullWidth value={copanytData.name} onChange={(e) => setcompanytData({ ...copanytData, name: e.target.value})} />
                    <TextField name="address" variant="outlined" label="address" fullWidth value={copanytData.address} onChange={(e) => setcompanytData({ ...copanytData, address: e.target.value })} />
                    <TextField name="descriptionSmall" variant="outlined" label="descriptionSmall" fullWidth value={copanytData.descriptionSmall} onChange={(e) => setcompanytData({ ...copanytData, descriptionSmall: e.target.value })} />
                    <TextField name="descriptionFull" variant="outlined" label="descriptionFull" fullWidth multiline rows={4} value={copanytData.descriptionFull} onChange={(e) => setcompanytData({ ...copanytData, descriptionFull: e.target.value})} />
                    <TextField name="bothPrice" variant="outlined" label="bothPrice" fullWidth value={copanytData.bothPrice} onChange={(e) => setcompanytData({ ...copanytData, bothPrice: e.target.value })} />
                    <TextField name="currentPrice" variant="outlined" label="currentPrice" fullWidth value={copanytData.currentPrice} onChange={(e) => setcompanytData({ ...copanytData, currentPrice: e.target.value })} />
                    <TextField name="myValuePrice" variant="outlined" label="myValuePrice" fullWidth value={copanytData.myValuePrice} onChange={(e) => setcompanytData({ ...copanytData, myValuePrice: e.target.value })} />
                    <TextField name="numberOfStocks" variant="outlined" label="numberOfStocks" fullWidth value={copanytData.numberOfStocks} onChange={(e) => setcompanytData({ ...copanytData, numberOfStocks: e.target.value })} />
                    <TextField name="dateOfPurchase" variant="outlined" label="dateOfPurchase" fullWidth value={copanytData.dateOfPurchase} onChange={(e) => setcompanytData({ ...copanytData, dateOfPurchase: e.target.value })} />
                    <TextField name="industry" variant="outlined" label="industry" fullWidth value={copanytData.industry} onChange={(e) => setcompanytData({ ...copanytData, industry: e.target.value })} />
                    <div className={classes.fileInput}><FileBase64 type="file" multiple={false} onDone={({ base64 }) => setcompanytData({ ...copanytData, selectedFile: base64 })} /></div> 
                    <Button className={classes.buttonSubmit} variant="contained"  color="primary" size="large" type="submit" fullWidth>Submit</Button>
                    <Button variant="contained"  color="secondary" size="small" onClick={clear} fullWidth>Clear</Button> 
                </form> 
            </Paper>
        
        ); 
    } 
};

export default Form;
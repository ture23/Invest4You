import React, { useState, useEffect} from 'react'
import {Button, TextField, Paper } from '@material-ui/core'
import useStyles from './styles'
import  {createNews} from '../../action/company'
import { useDispatch } from 'react-redux'
import { getAllNews } from '../../action/company'


export default function InvestorsNews({novosti}) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(0);
    let ObjNovosti = {}

    novosti.forEach(element => (Object.assign(ObjNovosti, element)));
    for (let element in novosti) {
        Object.assign(ObjNovosti, element)
    }
    
    const user = JSON.parse(localStorage.getItem('profile'));
    let UserStatus = user.result.role;
    
    const [ news, setNews ] = useState({
        title: '',
        body: ''
    })
    useEffect(() => {
    
    
        dispatch(getAllNews());
       
        
    }, [currentId, dispatch])
    
    

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createNews(news))
            
    }
    
    if (UserStatus === 'user') {
        return (
            <Paper className={classes.news}>

                <p>{ObjNovosti.title}</p>
                <p>{ObjNovosti.body}</p>
            </Paper>
        )
    }
    if (UserStatus === 'admin') {
        return (
            <div className={classes.box}>
                <Paper className={classes.news} >
                    <form onSubmit={handleSubmit} >
                        <h1> Our Form </h1>
                        <TextField name="title" fullWidth label="Title of the News" onChange={(e) => setNews({ ...news, title: e.target.value })} type="text" />
                        <TextField name="body" fullWidth multiline rows={4} label="News..." onChange={(e) => setNews({ ...news, body: e.target.value })} type="text" />
                        <Button className={classes.buttonSubmit} variant="contained"  color="primary" size="large" type="submit" fullWidth>Submit</Button>
                        
                    </form>
                </Paper>
                <Paper className={classes.news}>

                    <p>{ObjNovosti.title}</p>
                    <p>{ObjNovosti.body}</p>
                </Paper>
                
            </div>
        )
        
    }
    }
    


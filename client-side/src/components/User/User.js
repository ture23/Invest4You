import React, {useRef} from 'react'
import useStyles from './styles';
import AllUsers from './AllUsers'
import { useSelector } from 'react-redux';


import { TableRow, TableCell, Button } from '@mui/material'
import Collapse from '@mui/material/Collapse'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/core/Box';
import {updateUser, } from '../../action/user'
import { useDispatch } from 'react-redux';



export default function User({user}) {
    
    // const user = useSelector((state) => state.user);

    const userdata = user;
    console.log(userdata)
    // console.log(userdata);
    const valueRef = useRef('') 
    
    const dispatch = useDispatch();

    //  const sendValue = () => {
    //      return console.log(valueRef.current.value, userdata) //on clicking button accesing current value of TextField and outputing it to console

    //      if (userdata?._id) {
    //          dispatch(updatedUser(userdata._id, {...userdata, name: valueRef.current.value}))
    //      }
    // }
      const handleSubmit = (e) => {
          e.preventDefault();
          const newCapital = parseFloat(user.capital) + parseFloat(valueRef.current.value) ;
        dispatch(updateUser(user._id, {...user, capital: newCapital}))
        setTimeout(() => {
        window.location.reload();
            
        }, 1000);
          
    }

    const [open, setOpen] = React.useState(true);

    const classes = useStyles();

    return (
      
        <TableRow>
            <TableCell component="th" scope="row">
                {user.name}
            </TableCell>
            <TableCell align="right">
                {user.email}
            </TableCell>
            <TableCell align="right">
                {user.capital}
            </TableCell>
            <TableCell align="right">
                {  ' ' }
            </TableCell>
                            
            <TableCell align="right">
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box className={classes.userbox}>
                      <TextField
                            inputRef={valueRef}
                            id="outlined-basic"
                            label="Uplata/Isplata"   
                            variant="outlined"
                            size="small"
                        />
                    </Box>
                </Collapse>
          </TableCell>
              
            <TableCell align="right">
            <form onSubmit={handleSubmit}>
                <Button type="submit" className={classes.btn} color="primary" variant="contained" size="small">
                    Uplata
                </Button>
            </form>
          </TableCell>
        </TableRow>
        
  )
}

import React from 'react';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import User from './User';
import { useSelector } from 'react-redux';

import Container from '@mui/material/core/Container';
import Table from '@mui/material/core/Table';
import TableBody from '@mui/material/core/TableBody';
import TableCell from '@mui/material/core/TableCell';
import TableHead from '@mui/material/core/TableHead';
import TableRow from '@mui/material/core/TableRow';
import Box from '@mui/material/core/Box';


// napraviti da za svakog usera mozes mjenjati kapital 
export default function AllUsers() {

    const userArray = useSelector((state) => state.user);
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };
    console.log(userArray);

    const classes = useStyles();

  return (
      <Container className={classes.container} maxWidth='xl'>
          <Box className={classes.box}>
              <Table className={classes.table}
                  aria-label="simple table">
                  <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Ulozeni Kapital</TableCell>
                            <TableCell align="right">Trenutni Kapital</TableCell>
                         
                        </TableRow>
                    </TableHead>
                    <TableBody>
                       {userArray.map((user) => (
                        <User user={user} />
                        ))}
                       
                      
                    </TableBody>    
                </Table>
              
          </Box>
                      
              

      </Container>
  )
}

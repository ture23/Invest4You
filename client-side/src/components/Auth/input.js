import React from 'react'
import { TextField, Grid, InputAdornment, IconButton } from '@mui/material/core'

import Visibility from '@mui/material/icons/Visibility'
import VisibilityOff from '@mui/material/icons/VisibilityOff'

const Input = ({half,handleChange, handelShowPassword, name, label, autoFocus, type}) => {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField
                name={name}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                label={label}
                autoFocus={autoFocus}
                type={type}
                InputProps={name === 'password' ? {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handelShowPassword}>
                                {type === "password" ? <Visibility /> : <VisibilityOff /> }
                            </IconButton>
                        </InputAdornment>
                    )
                }: false}
            
            />
        </Grid>
    )
}

export default Input

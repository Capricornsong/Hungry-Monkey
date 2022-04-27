import { AppBar, Box, Button, Grid, Toolbar, Typography } from '@mui/material';
import React from 'react';
import '../css/Navbar.css';

 function Navbar(){
    return(
        
            <AppBar position="static">
                <Toolbar variant="dense">
                <Typography variant="h6" color="inherit" component="div">
                    Hungry Monkey
                </Typography>
                <Button variant="contained" id="login-button"
                        onClick={() => {
                            window.location = "/login";
                        }}
                    >Login</Button>
                </Toolbar>
            </AppBar>
        
    )
  }

export default Navbar;
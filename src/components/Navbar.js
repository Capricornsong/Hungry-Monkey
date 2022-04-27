import { Button, Grid } from '@mui/material';
import React from 'react';
import '../css/Navbar.css';

 function Navbar(){
    return(
        <div id="navbar-div">
            <Grid container>
                <Grid item md={9} xs={6}>
                    <div id="logo-div">
                        <h1>Logo</h1>
                    </div>
                </Grid>
                <Grid item md={1} className="align-right">
                    <Button variant="contained" id="login-button"
                        onClick={() => {
                            window.location = "/login";
                        }}
                    >Login</Button>
                </Grid>
                <Grid item md={1} className="align-right">
                    <Button variant="text" id="register-button"
                        onClick={() => {
                            window.location = "/register_m";
                        }}
                    >Create Account</Button>
                </Grid>
            </Grid>                    
        </div>
    )
  }

export default Navbar;
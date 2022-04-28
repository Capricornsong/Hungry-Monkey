/*
 * @Author: Liusong He
 * @Date: 2022-04-27 17:30:10
 * @LastEditTime: 2022-04-28 17:15:06
 * @FilePath: \coursework_git\src\components\Navbar.js
 * @Email: lh2u21@soton.ac.uk
 * @Description: 
 */
import { AppBar, Button, Grid, Link, Toolbar, Typography } from '@mui/material'
import React from 'react'
import '../css/Navbar.css'

function Navbar() {
    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <Grid container>
                    <Grid item xs={10}>
                        <Typography variant="h6" color="inherit" component="div" onClick={() => { window.location = "/home" }}>
                            Hungry Monkey
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Button variant="contained" id="login-button" style={{ backgroundColor: '#ededed', color: 'blue' }}
                            onClick={() => {
                                window.location = "/login"
                            }}
                        >Login</Button>
                        <Link href="/register_m" variant="body2" style={{ color: '#ededed', marginLeft: 20 }}>Create account</Link>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
/*
 * @Author: Liusong He
 * @Date: 2022-04-27 17:30:10
 * @LastEditTime: 2022-04-27 20:22:09
 * @FilePath: \coursework_git\src\components\Navbar.js
 * @Email: lh2u21@soton.ac.uk
 * @Description: 
 */
import React from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppBar, Button, Grid, IconButton, Link, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import '../css/Navbar.css'
import { Box } from '@mui/system';

function Navbar(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar variant="dense">
                <Grid container alignItems="center">
                    <Grid item xs={9}>
                        <Typography variant="h6" color="inherit" component="div" onClick={() => { window.location = "/home" }}>
                            Hungry Monkey
                        </Typography>
                    </Grid>
                    <Grid item xs={1} >
                        <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                                
                            >
                                <ShoppingCartIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                        </Menu>
                    </Grid>
                    <Grid item xs={2} >
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
        </Box>
    )
}

export default Navbar
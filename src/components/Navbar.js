/*
 * @Author: Liusong He
 * @Date: 2022-04-27 17:30:10
 * @LastEditTime: 2022-04-27 20:22:09
 * @FilePath: \coursework_git\src\components\Navbar.js
 * @Email: lh2u21@soton.ac.uk
 * @Description: 
 */
import React, { useContext } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppBar, Badge, Button, Divider, Grid, IconButton, Link, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@mui/material'
import '../css/Navbar.css'
import { Box } from '@mui/system';
import CartContext from './CartContext'

function Navbar() {
    const { cartItems } = useContext(CartContext);

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
                                <Badge badgeContent={cartItems.length} color="error">
                                    <ShoppingCartIcon />
                                </Badge>
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
                            style={{padding: 10}}
                        >
                            <Typography style={{textAlign: 'center', marginBottom: 5, marginTop: 5}}>Cart</Typography>
                            <Typography component={'span'} variant={'body2'}>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 400 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Menu Item</TableCell>
                                                <TableCell align="center">Price</TableCell>
                                                <TableCell align="right">Quantity</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {cartItems.map((item) => (
                                            <TableRow
                                                key={item.food_name}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">{item.name}</TableCell>
                                                <TableCell align="center">£ {item.price}</TableCell>
                                                <TableCell align="right">Quantity</TableCell>
                                            </TableRow>
                                        ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Typography>
                            <Typography style={{textAlign: 'center', marginBottom: 5, marginTop: 5}}>Subtotal:</Typography>
                            <Button variant={'contained'} onClick={() => { window.location = "/checkout" }} style={{marginBottom: 5, marginTop: 5, marginLeft: '37%'}}>Go to Checkout</Button>
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
/*
 * @Author: Liusong He
 * @Date: 2022-04-27 17:30:10
 * @LastEditTime: 2022-05-02 20:32:36
 * @FilePath: \coursework_git\src\components\Navbar.js
 * @Email: lh2u21@soton.ac.uk
 * @Description: 
 */
import React, { useContext, useEffect, useState } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { AppBar, Badge, Button, Grid, IconButton, Link, Menu, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@mui/material'
import '../css/Navbar.css'
import { Box } from '@mui/system'
import CartContext from './CartContext'
import { useNavigate } from 'react-router-dom'
import { logout } from "../util/firebaseAuth"

function Navbar() {
    const { cartItems } = useContext(CartContext)
    const { cartTotal } = useContext(CartContext)

    const [userObject, setUserObject] = useState('')
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = React.useState(null)

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleLoginButton = () => {
        // navigate('/login')
        window.open('/login','_self')
    }

    const logoutUser = async () => {
        try {
            await logout()
        } catch (error) {
            console.log('userprogile line76:', error)
        }
    }

    const handleLogout = () => {
        sessionStorage.clear()
        logoutUser()
        window.open('login', '_self')
    }

    useEffect(() => {
        setUserObject(JSON.parse(sessionStorage.getItem('user')))
    }, [])
    
    if(userObject == null) {
        // not signed in user navbar
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
                                    style={{ padding: 10 }}
                                >
                                    <Typography style={{ textAlign: 'center', marginBottom: 5, marginTop: 5 }}>Cart</Typography>
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
                                                            <TableCell align="right">{item.quantity}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Typography>
                                    <Typography style={{ textAlign: 'center', marginBottom: 5, marginTop: 5 }}>Subtotal: £{cartTotal}</Typography>
                                    <Button variant={'contained'} onClick={() => { window.location = "/checkout" }} style={{ marginBottom: 5, marginTop: 5, marginLeft: '37%' }}>Go to Checkout</Button>
                                </Menu>
                            </Grid>
                            <Grid item xs={2} >
                                <Button variant="contained" id="login-button" style={{ backgroundColor: '#ededed', color: 'blue' }}
                                    onClick={handleLoginButton}
                                >Login</Button>
                                <Link href="/register_m" variant="body2" style={{ color: '#ededed', marginLeft: 20 }}>Create account</Link>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </Box>
        )
    } else if(userObject.role === "normal"){
        // regular user navbar
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
                                <Grid item xs={3.6} sm={2.2} md={1.8} lg={1.5} xl={1.1} >
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
                                        style={{ padding: 10 }}
                                    >
                                        <Typography style={{ textAlign: 'center', marginBottom: 5, marginTop: 5 }}>Cart</Typography>
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
                                                                <TableCell align="right">{item.quantity}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Typography>
                                        <Typography style={{ textAlign: 'center', marginBottom: 5, marginTop: 5 }}>Subtotal: £{cartTotal}</Typography>
                                        <Button variant={'contained'} onClick={() => { window.location = "/checkout" }} style={{ marginBottom: 5, marginTop: 5, marginLeft: '37%' }}>Go to Checkout</Button>
                                    </Menu>
                                </Grid>
                                <Grid item xs={2} sm={1.5} md={1.2} lg={1.1} xl={0.8}>
                                    <Button variant="contained" id="profile-button" style={{ backgroundColor: '#ededed', color: 'blue' }} onClick={() => navigate('/user_page')}>Profile</Button>
                                </Grid>
                                <Grid item xs={2} sm={2} md={1} lg={1} xl={0.8}>
                                    <Link onClick={handleLogout} variant="body2" style={{ color: '#ededed', marginLeft: 20 }}>Log out</Link>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                </Box>
            )
    } else if(userObject.role === "deliver"){
        // driver navbar
        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <Grid container alignItems="center">
                            <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                                <Typography variant="h6" color="inherit" component="div" onClick={() => { window.location = "/home" }}>
                                    Hungry Monkey
                                </Typography>
                            </Grid>
                            <Grid item xs={1} sm={3.3} md={4} lg={5.4} xl={6.3}/>
                            <Grid item xs={3.6} sm={2.2} md={1.8} lg={1.5} xl={1.1}>
                                <Button variant="contained" id="profile-button" style={{ backgroundColor: '#ededed', color: 'blue' }} onClick={() => navigate('/driver_page')}>Order page</Button>
                            </Grid>
                            <Grid item xs={2} sm={1.5} md={1.2} lg={1.1} xl={0.8}>
                                <Button variant="contained" id="profile-button" style={{ backgroundColor: '#ededed', color: 'blue' }} onClick={() => navigate('/user_page')}>Profile</Button>
                            </Grid>
                            <Grid item xs={2} sm={2} md={1} lg={1} xl={0.8}>
                                <Link onClick={handleLogout} variant="body2" style={{ color: '#ededed', marginLeft: 20 }}>Log out</Link>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </Box>
        )
    } else if(userObject.role === "restaurant"){
        // restaurant owner navbar
        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <Grid container alignItems="center">
                            <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                                <Typography variant="h6" color="inherit" component="div" onClick={() => { window.location = "/home" }}>
                                    Hungry Monkey
                                </Typography>
                            </Grid>
                            <Grid item xs={1} sm={3.3} md={4} lg={5.4} xl={6.3}/>
                            <Grid item xs={3.6} sm={2.2} md={1.8} lg={1.5} xl={1.1}>
                                <Button variant="contained" id="profile-button" style={{ backgroundColor: '#ededed', color: 'blue' }} onClick={() => navigate('/restaurant_owner_page')}>Restaurant page</Button>
                            </Grid>
                            <Grid item xs={2} sm={1.5} md={1.2} lg={1.1} xl={0.8}>
                                <Button variant="contained" id="profile-button" style={{ backgroundColor: '#ededed', color: 'blue' }} onClick={() => navigate('/user_page')}>Profile</Button>
                            </Grid>
                            <Grid item xs={2} sm={2} md={1} lg={1} xl={0.8}>
                                <Link onClick={handleLogout} variant="body2" style={{ color: '#ededed', marginLeft: 20 }}>Log out</Link>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </Box>
        )
    } else if(userObject.role === "manager"){
        // restaurant owner navbar
        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <Grid container alignItems="center">
                            <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                                <Typography variant="h6" color="inherit" component="div" onClick={() => { window.location = "/home" }}>
                                    Hungry Monkey
                                </Typography>
                            </Grid>
                            <Grid item xs={1} sm={3.3} md={4} lg={5.4} xl={6.3}/>
                            <Grid item xs={3.6} sm={2.2} md={1.8} lg={1.5} xl={1.1}>
                                <Button variant="contained" id="profile-button" style={{ backgroundColor: '#ededed', color: 'blue' }} onClick={() => navigate('/admin_page')}>Administrator panel</Button>
                            </Grid>
                            <Grid item xs={2} sm={1.5} md={1.2} lg={1.1} xl={0.8}>
                                <Button variant="contained" id="profile-button" style={{ backgroundColor: '#ededed', color: 'blue' }} onClick={() => navigate('/user_page')}>Profile</Button>
                            </Grid>
                            <Grid item xs={2} sm={2} md={1} lg={1} xl={0.8}>
                                <Link onClick={handleLogout} variant="body2" style={{ color: '#ededed', marginLeft: 20 }}>Log out</Link>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </Box>
        )
    }
   

}

export default Navbar
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
import BigButton from '../css/BigButton.css'

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

    const isSmallWindow = window.screen.width > 600
    
    if(userObject == null) {
        // not signed in user navbar
        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <Grid container alignItems="center">
                            <Grid item xs={2.3} sm={3} md={3} lg={3} xl={3}>
                                <Grid container alignItems="center">
                                    { isSmallWindow && 
                                    <Grid item xs={6} id="monkey-log-grid">
                                        <img src={require('../media/monkey-logo.svg').default} alt="monkey-logo" id="monkey-logo" onClick={() => { navigate('/home') }}/>
                                    </Grid>
                                    }
                                    <Grid item xs={6}>
                                        <Typography variant="h6" color="inherit" component="div" onClick={() => { navigate('/home') }}>
                                            Hungry Monkey
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={0} sm={2.5} md={4.5} lg={5.8} xl={6.6}/>
                            <Grid item xs={1.5} sm={1.1} md={1} lg={0.7} xl={0.5}>
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
                                                    {cartItems.map((item, iterator) => (
                                                        <TableRow
                                                            key={iterator}
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
                                    <Button variant={'contained'} onClick={() => { navigate('/checkout') }} style={{ marginBottom: 5, marginTop: 5, marginLeft: '37%' }}>Go to Checkout</Button>
                                </Menu>
                            </Grid>
                            <Grid item xs={4} sm={2.4} md={1.6} lg={1.2} xl={1} >
                                <Button variant="contained" id="login-button" style={{ backgroundColor: '#ededed', color: 'blue' }} onClick={handleLoginButton}>Login</Button>
                                
                            </Grid>
                            <Grid item xs={4.1} sm={2.6} md={1.6} lg={1.2} xl={0.9}>
                                <Link href="/register_m" variant="body2" id="create-account-link" style={{ color: '#ededed', marginLeft: 20 }}>Create account</Link>
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
                            <Grid item xs={2.3} sm={3} md={3} lg={3} xl={3}>
                                <Grid container alignItems="center">
                                    { isSmallWindow && 
                                    <Grid item xs={6} id="monkey-log-grid">
                                        <img src={require('../media/monkey-logo.svg').default} alt="monkey-logo" id="monkey-logo" onClick={() => { navigate('/home') }}/>
                                    </Grid>
                                    }
                                    <Grid item xs={6}>
                                        <Typography variant="h6" color="inherit" component="div" onClick={() => { navigate('/home') }}>
                                            Hungry Monkey
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={2} sm={4} md={5.3} lg={6.1} xl={6.6}/>
                            <Grid item xs={1.9} sm={1.1} md={1} lg={0.7} xl={0.6}>
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
                                                    {cartItems.map((item, iterator) => (
                                                        <TableRow
                                                            key={iterator}
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
                                    <Button variant={'contained'} onClick={() => { navigate('/checkout') }} style={{ marginBottom: 5, marginTop: 5, marginLeft: '37%' }}>Go to Checkout</Button>
                                </Menu>
                            </Grid>
                            <Grid item xs={3.2} sm={2} md={1.4} lg={1.2} xl={1} >
                                    <Button variant="contained" id="profile-button" style={{ backgroundColor: '#ededed', color: 'blue' }} onClick={() => navigate('/user_page')}>Profile</Button>
                            </Grid>
                            <Grid item xs={2} sm={1.5} md={1} lg={0.8} xl={0.7}>
                                    <Link onClick={handleLogout} id="logout-link" variant="body2" style={{ color: '#ededed' }}>Log out</Link>
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
                                <Grid container alignItems="center">
                                    { isSmallWindow && 
                                    <Grid item xs={6} id="monkey-log-grid">
                                        <img src={require('../media/monkey-logo.svg').default} alt="monkey-logo" id="monkey-logo" onClick={() => { navigate('/home') }}/>
                                    </Grid>
                                    }
                                    <Grid item xs={6}>
                                        <Typography variant="h6" color="inherit" component="div" onClick={() => { navigate('/home') }}>
                                            Hungry Monkey
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={0} sm={2} md={4.4} lg={5.3} xl={5.8}/>
                            <Grid item xs={4} sm={3} md={2} lg={1.5} xl={1.3}>
                                <Button variant="contained" id="driver-page-button" style={{ backgroundColor: '#ededed', color: 'blue' }} onClick={() => navigate('/driver_page')}>Order page</Button>
                            </Grid>
                            <Grid item xs={2.6} sm={2} md={1.4} lg={1} xl={0.8}>
                                <Button variant="contained" id="driver-profile-button" style={{ backgroundColor: '#ededed', color: 'blue' }} onClick={() => navigate('/user_page')}>Profile</Button>
                            </Grid>
                            <Grid item xs={2} sm={1.6} md={1} lg={1} xl={1}>
                                <Link onClick={handleLogout} id="driver-logout-link" variant="body2" style={{ color: '#ededed', marginLeft: 20 }}>Log out</Link>
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
                            <Grid item xs={2.5} sm={3} md={3} lg={3} xl={3}>
                                <Grid container alignItems="center">
                                    { isSmallWindow && 
                                    <Grid item xs={6} id="monkey-log-grid">
                                        <img src={require('../media/monkey-logo.svg').default} alt="monkey-logo" id="monkey-logo" onClick={() => { navigate('/home') }}/>
                                    </Grid>
                                    }
                                    <Grid item xs={6}>
                                        <Typography variant="h6" color="inherit" component="div" onClick={() => { navigate('/home') }}>
                                            Hungry Monkey
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={0} sm={1} md={4} lg={4.7} xl={5.3}/>
                            <Grid item xs={4.5} sm={4} md={2.5} lg={2} xl={1.7}>
                                <Button variant="contained" id="restaurant-page-button" style={{ backgroundColor: '#ededed', color: 'blue' }} onClick={() => navigate('/restaurant_owner_page')}>Restaurant page</Button>
                            </Grid>
                            <Grid item xs={2.6} sm={2.3} md={1.4} lg={1.2} xl={1}>
                                <Button variant="contained" id="profile-button" style={{ backgroundColor: '#ededed', color: 'blue' }} onClick={() => navigate('/user_page')}>Profile</Button>
                            </Grid>
                            <Grid item xs={2} sm={1.4} md={1} lg={1} xl={0.8}>
                                <Link onClick={handleLogout} id="owner-logout-link"variant="body2" style={{ color: '#ededed'}}>Log out</Link>
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
                            <Grid item xs={2} sm={3} md={3} lg={3} xl={3}>
                                <Grid container alignItems="center">
                                    { isSmallWindow && 
                                    <Grid item xs={6} id="monkey-log-grid">
                                        <img src={require('../media/monkey-logo.svg').default} alt="monkey-logo" id="monkey-logo" onClick={() => { navigate('/home') }}/>
                                    </Grid>
                                    }
                                    <Grid item xs={6}>
                                        <Typography variant="h6" color="inherit" component="div" onClick={() => { navigate('/home') }}>
                                            Hungry Monkey
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={0} sm={0.5} md={3} lg={4.5} xl={5.8}/>
                            <Grid item xs={5.7} sm={4.5} md={3} lg={2.2} xl={1.6}>
                                <Button variant="contained" id="big-button" style={{ backgroundColor: '#ededed', color: 'blue' }} onClick={() => navigate('/admin_page')}>Administrator panel</Button>
                            </Grid>
                            <Grid item xs={2.2} sm={1.8} md={1.2} lg={1.1} xl={0.8}>
                                <Button variant="contained" id="profile-button" style={{ backgroundColor: '#ededed', color: 'blue' }} onClick={() => navigate('/user_page')}>Profile</Button>
                            </Grid>
                            <Grid item xs={2} sm={2} md={1} lg={1} xl={0.8}>
                                <Link onClick={handleLogout} variant="body2" id="logout-link" style={{ color: '#ededed', marginLeft: 20 }}>Log out</Link>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </Box>
        )
    }
   

}

export default Navbar
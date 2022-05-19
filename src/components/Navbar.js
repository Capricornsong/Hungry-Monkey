/*
 * @Author: Liusong He
 * @Date: 2022-04-27 17:30:10
 * @LastEditTime: 2022-05-19 18:36:08
 * @FilePath: \coursework_git\src\components\Navbar.js
 * @Email: lh2u21@soton.ac.uk
 * @Description: 
 */
import React, { useContext, useEffect, useState } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { AppBar, Badge, Button, Container, Grid, IconButton, Link, Menu, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@mui/material'
import '../css/Navbar.css'
import { Box } from '@mui/system'
import CartContext from './CartContext'
import { useNavigate } from 'react-router-dom'
import { logout } from "../util/firebaseAuth"
//import BigButton from '../css/BigButton.css'
import BigButton2 from '../css/BigButton2.css'

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
    }, [sessionStorage.getItem('user')])

    const isSmallWindow = window.screen.width > 600
    
    if(userObject == null) {
        // not signed in user navbar
        return (
            <AppBar position="static">
                <Container maxWidth="xl" style={{padding: 5}}>
                    <Toolbar variant="dense" disableGutters>                                   
                        <img src={require('../media/monkey-logo.svg').default} alt="monkey-logo" id="monkey-logo" onClick={() => { navigate('/home') }}/>
                        <Typography variant="h6" color="inherit" component="div" onClick={() => { navigate('/home') }}>Hungry Monkey</Typography>
                            <Container style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: 0}}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                    style={{right: 7}}
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
                                                            <TableCell component="th" scope="row">{item.food_name}</TableCell>
                                                            <TableCell align="center">£ {item.food_price}</TableCell>
                                                            <TableCell align="right">{item.food_amount}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Typography>
                                    <Typography style={{ textAlign: 'center', marginBottom: 5, marginTop: 5 }}>Subtotal: £{cartTotal}</Typography>
                                    <Button variant={'contained'} onClick={() => { navigate('/checkout') }} style={{ marginBottom: 5, marginTop: 5, marginLeft: '37%' }} disabled>Go to Checkout</Button>
                                </Menu>

                                <Button variant="contained" id="login-button" style={{ backgroundColor: '#ededed', color: 'blue' }} onClick={handleLoginButton}>Login</Button>
                                <Link href="/register_m" variant="body2" id="create-account-link" style={{ color: '#ededed', marginLeft: 10 }}>Create account</Link>
                            </Container>
                    </Toolbar>
                </Container>
            </AppBar>
        )
    } else if(userObject.role === "normal"){
        // regular user navbar
            return (
                <AppBar position="static">
                    <Container maxWidth="xl" style={{padding: 5}}>
                        <Toolbar variant="dense" disableGutters>                                   
                            <img src={require('../media/monkey-logo.svg').default} alt="monkey-logo" id="monkey-logo" onClick={() => { navigate('/home') }}/>
                            <Typography variant="h6" color="inherit" component="div" onClick={() => { navigate('/home') }}>Hungry Monkey</Typography>
                                <Container style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: 0}}>
                                    <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleMenu}
                                        color="inherit"
                                        style={{right: 15}}
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
                                                                <TableCell component="th" scope="row">{item.food_name}</TableCell>
                                                                <TableCell align="center">£ {item.food_price}</TableCell>
                                                                <TableCell align="right">{item.food_amount}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Typography>
                                        <Typography style={{ textAlign: 'center', marginBottom: 5, marginTop: 5 }}>Subtotal: £{cartTotal}</Typography>
                                        <Button variant={'contained'} onClick={() => { navigate('/checkout') }} style={{ marginBottom: 5, marginTop: 5, marginLeft: '37%' }}>Go to Checkout</Button>
                                    </Menu>
    
                                    <Button variant="contained" id="profile-button" style={{ backgroundColor: '#ededed', color: 'blue', right: 5 }} onClick={() => navigate('/user_page')}>Profile</Button>
                                    <Link onClick={handleLogout} id="logout-link" variant="body2" style={{ color: '#ededed', marginLeft: 10 }}>Log out</Link>
                                </Container>
                        </Toolbar>
                    </Container>
                </AppBar>
            )
    } else if(userObject.role === "deliver"){
        // driver navbar
        return (
            <AppBar position="static">
                <Container maxWidth="xl" style={{padding: 5}}>
                    <Toolbar variant="dense" disableGutters>                                   
                        <img src={require('../media/monkey-logo.svg').default} alt="monkey-logo" id="monkey-logo" onClick={() => { navigate('/home') }}/>
                        <Typography variant="h6" color="inherit" component="div" onClick={() => { navigate('/home') }}>Hungry Monkey</Typography>
                            <Container style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: 0}}>                              
                                <Button variant="contained" id="driver-page-button" style={{ backgroundColor: '#ededed', color: 'blue', right: 10  }} onClick={() => navigate('/driver_page')}>Order page</Button>
                                <Button variant="contained" id="driver-profile-button" style={{ backgroundColor: '#ededed', color: 'blue' }} onClick={() => navigate('/user_page')}>Profile</Button>
                                <Link onClick={handleLogout} id="logout-link" variant="body2" style={{ color: '#ededed', marginLeft: 10 }}>Log out</Link>
                            </Container>
                    </Toolbar>
                </Container>
            </AppBar>
        )
    } else if(userObject.role === "restaurant"){
        // restaurant owner navbar
        return (
            <AppBar position="static">
                <Container maxWidth="xl" style={{padding: 5}}>
                    <Toolbar variant="dense" disableGutters>                                   
                        <img src={require('../media/monkey-logo.svg').default} alt="monkey-logo" id="monkey-logo" onClick={() => { navigate('/home') }}/>
                        <Typography variant="h6" color="inherit" component="div" onClick={() => { navigate('/home') }}>Hungry Monkey</Typography>
                            <Container style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: 0}}>                              
                                <Button variant="contained" id="restaurant-page-button" style={{ backgroundColor: '#ededed', color: 'blue', right: 10  }} onClick={() => navigate('/restaurant_owner_page')}>Restaurant page</Button>
                                <Button variant="contained" id="restaurant-profile-button" style={{ backgroundColor: '#ededed', color: 'blue' }} onClick={() => navigate('/user_page')}>Profile</Button>
                                <Link onClick={handleLogout} id="logout-link" variant="body2" style={{ color: '#ededed', marginLeft: 10 }}>Log out</Link>
                            </Container>
                    </Toolbar>
                </Container>
            </AppBar>
        )
    } else if(userObject.role === "manager"){
        // restaurant owner navbar
        return (
            <AppBar position="static">
                <Container maxWidth="xl" style={{padding: 5}}>
                    <Toolbar variant="dense" disableGutters>                                   
                        <img src={require('../media/monkey-logo.svg').default} alt="monkey-logo" id="monkey-logo" onClick={() => { navigate('/home') }}/>
                        <Typography variant="h6" color="inherit" component="div" onClick={() => { navigate('/home') }}>Hungry Monkey</Typography>
                            <Container style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: 0}}>                              
                                <Button variant="contained" id="admin-page-button" style={{ backgroundColor: '#ededed', color: 'blue', right: 10  }} onClick={() => navigate('/admin_page')}>Administrator panel</Button>
                                <Button variant="contained" id="admin-profile-button" style={{ backgroundColor: '#ededed', color: 'blue' }} onClick={() => navigate('/user_page')}>Profile</Button>
                                <Link onClick={handleLogout} id="logout-link" variant="body2" style={{ color: '#ededed', marginLeft: 10 }}>Log out</Link>
                            </Container>
                    </Toolbar>
                </Container>
            </AppBar>
        )
    }
   

}

export default Navbar
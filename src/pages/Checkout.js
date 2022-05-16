import { Box, Container, Button, Typography, CssBaseline, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, TableFooter, Snackbar, Alert } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import React, { useContext, useState } from 'react'
import Navbar from '../components/Navbar'
import CartContext from '../components/CartContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const theme = createTheme()


function Checkout() {
  const { cartItems } = useContext(CartContext)
  const { clearCart } = useContext(CartContext)
  const { cartTotal } = useContext(CartContext)
  const { chosenRestaurant } = useContext(CartContext)
  const currentDate = new Date()
  const timeParameter = currentDate.getHours() + ':' + currentDate.getMinutes()
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const navigate = useNavigate()

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
}

  const handleOrderAdd = () => { 
    axios.post('https://hungry-monkey-api.azurewebsites.net/api/order/placeNewOrder', {
        'user_uid': sessionStorage.getItem('uid'),
        'restaurant_name': chosenRestaurant,
        'food_ordered': cartItems,
        'order_placed_time': timeParameter,
        'order_price': cartTotal
    })
    .then(response => {
        setSnackbarOpen(true)
        clearCart()
        setTimeout(() => { navigate('/user_page') }, 700)
    })
    .catch(error => {
        console.log(error)
    })
  }

    if (!sessionStorage.getItem('uid')) {
        navigate('/login')
    }
  
  return (
      <ThemeProvider theme={theme}>
        <Navbar />
        <Container component="main">
        <CssBaseline />
          <Box>
            <Typography component="h1" variant="h5">
              Checkout
            </Typography>
            <h5 component="h5" variant="h5">
              Your order:
            </h5>
            <Typography component={'span'} variant={'body2'}>
              <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                      <TableHead>
                          <TableRow>
                              <TableCell>Menu Item</TableCell>
                              <TableCell align="right">Price</TableCell>
                              <TableCell align="right">Quantity</TableCell>
                          </TableRow>
                      </TableHead>
                      <TableBody>
                      {cartItems.map((item, iterator) => (
                          <TableRow
                              key={iterator}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              style={{justifyContent: 'center'}}
                          >
                              <TableCell component="th" scope="row">{item.food_name}</TableCell>
                              <TableCell align="right">£ {item.food_price}</TableCell>
                              <TableCell align="right">{item.food_amount}</TableCell>
                          </TableRow>
                      ))}
                      </TableBody>
                      <TableFooter>
                        <TableRow align='center'>
                          <TableCell/>
                          <TableCell align='center'>
                            <Typography>Subtotal: £{ cartTotal }</Typography>
                          </TableCell>
                          <TableCell/>
                        </TableRow>
                        <TableRow>
                            <TableCell align="right">
                              <Button style={{color: 'red'}} onClick={() => clearCart()}>Clear basket</Button>
                            </TableCell>
                            <TableCell align="right">
                              <Button align="right"variant="contained" onClick={() => handleOrderAdd()}>Place order</Button>
                            </TableCell>
                          </TableRow>
                      </TableFooter>
                  </Table>
              </TableContainer>
          </Typography>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                // message="Successfully updated"
                severity="success"
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Order successfully placed
                </Alert>
            </Snackbar>
          </Box>
        </Container>
      </ThemeProvider>
  )
}

export default Checkout
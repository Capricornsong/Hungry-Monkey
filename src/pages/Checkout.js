import { Box, Container, Button, Typography, CssBaseline, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, TableFooter } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import CartContext from '../components/CartContext'

const theme = createTheme()


function Checkout() {
  const { cartItems } = useContext(CartContext)
  const { clearCart } = useContext(CartContext)
  
  return (
      <ThemeProvider theme={theme}>
        <Navbar />
        <Container component="main" maxWidth="sm">
        <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Checkout
            </Typography>
            <h5 component="h5" variant="h5">
              Your order:
            </h5>
            <Typography component={'span'} variant={'body2'}>
              <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                          <TableRow>
                              <TableCell>Menu Item</TableCell>
                              <TableCell align="right">Price</TableCell>
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
                              <TableCell align="right">£ {item.price}</TableCell>
                              <TableCell align="right">Quantity</TableCell>
                          </TableRow>
                      ))}
                      </TableBody>
                      <TableFooter>
                        <TableRow>
                            <TableCell align="right">
                              <Button style={{color: 'red'}} onClick={() => clearCart()}>Clear basket</Button>
                            </TableCell>
                            <TableCell align="right">
                              <Button align="right"variant="contained">Place order</Button>
                            </TableCell>
                          </TableRow>
                      </TableFooter>
                  </Table>
              </TableContainer>
          </Typography>
          </Box>
        </Container>
      </ThemeProvider>
  )
}

export default Checkout
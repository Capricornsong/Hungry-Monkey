import { Box, Button, Container, TextField, Typography, CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import React from 'react'
import Navbar from '../components/Navbar'

const theme = createTheme()

function ForgotPassword() {
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
              Forgotten password request
            </Typography>
            <h5 component="h5" variant="h5">
              Please enter your email address
            </h5>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >Submit</Button>
          </Box>
        </Container>
      </ThemeProvider>
  )
}

export default ForgotPassword
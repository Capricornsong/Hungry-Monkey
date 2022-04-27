import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import { createTheme } from '@mui/system';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import Navbar from '../components/Navbar';

 function ForgotPassword(){
    const theme = createTheme();

    return(
        <div id="forgot-password-div">
            <Navbar/>
            <ThemeProvider theme={theme}>
              <Container component="main" maxWidth="sm">
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
        </div>
    )
  }

export default ForgotPassword;
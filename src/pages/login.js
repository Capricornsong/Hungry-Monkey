/*
 * @Author: Liusong He
 * @Date: 2022-04-25 18:07:07
 * @LastEditTime: 2022-04-27 16:29:01
 * @FilePath: \coursework\coursework\src\pages\login.js
 * @Email: lh2u21@soton.ac.uk
 * @Description: 
 */

import * as React from 'react';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import { useSelector } from 'react-redux';
import GoogleIcon from '@mui/icons-material/Google';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {
  Avatar,
  Box,
  Button,
  Checkbox,
  CssBaseline,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
  TextField,
  Typography,
  
} from '@mui/material';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
        Hungry Monkey
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {

  // const customization = useSelector((state) => state.customization);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  
  };

  return (
    <ThemeProvider theme={theme}>
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          {/* The component used for the root node. Either a string to use a HTML element or a component
        Applies the theme typography styles. */}
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              loading={true}
              sx={{ mt: 3, mb: 3 }}
            >
              Sign In
            </Button>

            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
              <Button>
                  
              </Button>
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                mt: 0, 
                mb: 3,
                // color: 'grey.700',
                // backgroundColor: theme.palette.grey[50],
                // borderColor: theme.palette.grey[100]
              }}
              startIcon={<GoogleIcon />}
              color='warning'
            >
              Sign In with Google
            </Button>
            
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="./register_m" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
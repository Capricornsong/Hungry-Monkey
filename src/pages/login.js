/*
 * @Author: Liusong He
 * @Date: 2022-04-25 18:07:07
 * @LastEditTime: 2022-05-05 18:57:03
 * @FilePath: \coursework_git\src\pages\login.js
 * @Email: lh2u21@soton.ac.uk
 * @Description: 
 */

import { logout } from '../util/firebaseAuth'
import { login, auth } from '../util/firebaseAuth'
import * as React from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
// import { useSelector } from 'react-redux';
import GoogleIcon from '@mui/icons-material/Google'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
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
  useMediaQuery,
} from '@mui/material'
import axios from 'axios'
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
  )
}
// const currentUser = auth.currentUser
export default function SignIn() {
  const navigate = useNavigate()
  React.useEffect(() => {
    if (sessionStorage.getItem('uid')) {
      navigate('/user_page')
    }
  })

  //switch mode depend on system setting 
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          // mode: prefersDarkMode ? 'dark' : 'light',
          mode: 'light'
        },
      }),
    [prefersDarkMode],
  )
  // const customization = useSelector((state) => state.customization);
  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    localStorage.clear()
    login(data.get('email'), data.get('password')).then((response) => {
      console.log('response:', response)
      if (response) {
        console.log('currentUser.uid', response.user.uid)
        sessionStorage.setItem('uid', response.user.uid)
        // sessionStorage.setItem('firstname', currentUser.first_name)
        navigate('/user_page')
        // window.open('user_page', '_self')
      }
      //fali...
      else {

      }
    }).catch((err) => {
      console.log('err:', err)
      alert('username or password is wrong')
    })
  }

  const handleGooleLogin = () => {
    console.log('dsadad')
  }

  // if (!auth.currentUser) {
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
              onClick={handleGooleLogin}
            >
              Sign In with Google
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgot-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="./register_m" variant="body2">
                  {"Don't have an components? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  )
  // }
  // else {
  //   window.open('\Home', '_self')
  //   return null
  // }
}
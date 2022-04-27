/*
 * @Author: Liusong He
 * @Date: 2022-04-25 19:01:30
 * @LastEditTime: 2022-04-27 19:23:03
 * @FilePath: \coursework_git\src\pages\register_m.js
 * @Email: lh2u21@soton.ac.uk
 * @Description: The meterial version of the login-in page
 */
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

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {countries} from '../data/data'
import * as React from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useFormControl } from '@mui/material/FormControl';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
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
console.log({countries})
export default function SignUp() {

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string()
      .required('Last Name is required'),
      // .min(6, 'Username must be at least 6 characters')
      // .max(20, 'Username must not exceed 20 characters'),
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    password1: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    password2: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password1'), null], 'Confirm Password does not match'),
    address1: Yup.string()
      .required('Address is required!'),
    address2: Yup.string()
      .required('address is required'),
    postcode: Yup.string()
      .required('Postcode is required！'),
    // acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
    country: Yup.string()
      .required('Country is required!'),
    city: Yup.string()
    .required('City is requirement'),
  });
  
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = (event) => {
    
    console.log(event)
    // event.preventDefault();
    // const data = new FormData(event);
    console.log({
      firstName: event.firstName,
      lastName: event.lastName,
      email: event.email,
      password1: event.password1,
      password2:event.password2,
      address1: event.address1,
      address2: event.address2,
      country: event.country,
    });
  };
  //used to store password1 to compare with password2
  // const [password, setPassword] = React.useState(0);
  //used to change the textfield depend on the comparison of the password1 & password2
  // const [confirmpasswordstate, setConfirmpasswordstate] = React.useState(false)
  //validate function
  // const validatePassword = (event) => {
  //   console.log(event.currentTarget.value,{password}.password)
  //   if(event.currentTarget.value === {password}.password){
  //     // console.log('11111')
  //     setConfirmpasswordstate(false)
  //   }
  //   else{
  //     // console.log('222')
  //     setConfirmpasswordstate(true)
  //   }
  // }
  const [firstname,setFirstname] = React.useState('');


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* icon */}
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate 
            onSubmit={handleSubmit} 
            sx={{ mt: 3 }
          }>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  {...register('firstName')}
                  error={errors.firstName ? true : false}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.firstName?.message}
              </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e) => setFirstname(e.currentTarget.value)}
                  {...register('lastName')}
                  error={errors.lastName ? true : false}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  {...register('email')}
                  error={errors.email ? true : false}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password1"
                  label="Password"
                  type="password"
                  id="password1"
                  autoComplete="new-password"
                  // store the password1 for comparing with password2
                  // onChange={(e) => setPassword(e.currentTarget.value)}
                  {...register('password1')}
                  error={errors.password1 ? true : false}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  // error={confirmpasswordstate}
                  required
                  fullWidth
                  name="password2"
                  label="Confirm Password"
                  type="password"
                  id="password2"
                  autoComplete="new-password"
                  // onChange={validatePassword}
                  {...register('password2')}
                  error={errors.password2 ? true : false}
                />
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{  mt:3,mb:1 }} orientation="horizontal">Address</Divider>
                
              </Grid>
              
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="address1"
                  label="Address line 1"
                  type="text"
                  id="address1"
                  autoComplete="text"
                  {...register('address1')}
                  error={errors.address1 ? true : false}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="address2"
                  label="Address line 2"
                  type="text"
                  id="address2"
                  autoComplete="address"
                  {...register('address2')}
                  error={errors.address2 ? true : false}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="postcode"
                  label="Postcode"
                  type="text"
                  id="postcode"
                  autoComplete="postcode"
                  {...register('postcode')}
                  error={errors.postcode ? true : false}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="city"
                  label="City"
                  type="text"
                  id="postcode"
                  {...register('city')}
                  error={errors.city ? true : false}
                />
              </Grid> 
              <Grid item xs={12}>
                <Autocomplete
                  options={countries}
                  autoHighlight
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                      <img
                        loading="lazy"
                        width="20"
                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                        alt=""
                      />
                      {/* {option.label} ({option.code}) +{option.phone} */}
                      {option.label} ({option.code}) 
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Choose a country"
                      id="country"
                      name='country'
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                      }}
                      {...register('country')}
                      error={errors.country ? true : false}
                    />
                  )}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  name='acceptTerms'
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}    
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit(onSubmit)}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="./login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

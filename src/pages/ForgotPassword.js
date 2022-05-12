import {Box, Button, Container, TextField, Typography, CssBaseline, FormControl, Snackbar, Alert} from '@mui/material'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import * as Yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm} from 'react-hook-form'
import {forgetPassword} from "../util/firebaseAuth"

const theme = createTheme()

function ForgotPassword() {
    const [snackbarOpen, setSnackbarOpen] = useState(false)

    const handleSnackbarClose = () => {
        setSnackbarOpen(false)
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required').email('Email is invalid')
    })

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(validationSchema)
    })


    const onSubmit = (event) => {
        console.log({email: event.email})
        forgetPassword(event.email).then(()=>{
            //TODO ADD A POP UP Window!
            setSnackbarOpen(true)
            setTimeout(() => { window.location.href = "/login" }, 1000)
        }).catch((e)=>{
            console.log(e.message)
            alert("Firebase connection error")
        })
    }

    return (
        <ThemeProvider theme={theme}>
            <Navbar/>
            <Container component="main" maxWidth="sm">
                <CssBaseline/>
                <FormControl
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}>
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h4"> Forgotten password request</Typography>
                        <Typography variant="h7"> Please enter your email address </Typography>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            //onChange={handleInputBox}

                            {...register('email')}
                            error={errors.email ? true : false}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            onClick={handleSubmit(onSubmit)}
                        >Submit</Button>
                    </Box>
                </FormControl>

                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    onClose={handleSnackbarClose}
                    // message="Successfully updated"
                    severity="success"
                >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Password request sent
                </Alert>
            </Snackbar>
            </Container>
        </ThemeProvider>
    )
}

export default ForgotPassword
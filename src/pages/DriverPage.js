import * as React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Box, Container, Grid, Typography, Card, CardContent, CardActionArea, useMediaQuery, Snackbar, Alert } from '@mui/material'
import DriverTable from '../components/DriverTable'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { RepeatOneSharp } from '@mui/icons-material';

function DriverPage() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
    const [currentOrder, setCurrentOrder] = React.useState([{}])
    const [isLoading, setIsLoading] = React.useState(true)
    const [snackbarOpen, setSnackbarOpen] = React.useState(false)
    const navigate = useNavigate()

    const userObject = JSON.parse(sessionStorage.getItem('user'))

    const closeSnackbar = () => {
        setSnackbarOpen(false)
    }

    const theme = React.useMemo(() =>
        createTheme({
            palette: {
                mode:  'light',
            },
        }),
        [prefersDarkMode],
    )

    React.useEffect(() => {
        axios.post('https://hungry-monkey-api.azurewebsites.net/api/order/getOrderByDeliverEmail', {
            'order_deliver_by': userObject.email,
            //'order_deliver_by': 'bobmarley@bob.com'
        })
        .then(response => {
            response.data.forEach(order => {
                if(order.order_status === 'delivering'){
                    setCurrentOrder(response.data)
                }
            })
            setIsLoading(false)
        })
        .catch(error => {
            console.log(error)
        })
    },[])

    if (isLoading) {
        return (
            <ThemeProvider theme={theme}>
                <Navbar/>
                <Box sx={{ flexGrow: 1, py: 8 }} theme={theme}>
                    <Container maxWidth="lg">
                        <Typography
                            sx={{ mb: 3 }}
                            variant="h4"
                        >
                            Driver
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item lg={4} md={4} xs={12}>
                                <Card sx={{ boxShadow: 3, }}>
                                    <CardActionArea>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div" textAlign='center'>
                                                Hi🖐 Loading
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" textAlign='center'>
                                                UserId: Loading
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" textAlign='center'>
                                                Driver Status: Loading
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>

                        </Grid>
                    </Container>
                </Box>
            </ThemeProvider>
        )
    }
    if (!sessionStorage.getItem('uid')) {
        navigate('/login')
    }
    else if(JSON.parse(sessionStorage.getItem('user')).role === 'deliver'){
        return (
            <ThemeProvider theme={theme}>
                <Box sx={{ flexGrow: 1, py: 8}} theme={theme}>
                    <Container maxWidth="lg">
                        <Typography
                            sx={{ mb: 3 }}
                            variant="h4"
                        >
                            Driver
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item lg={4} md={4} xs={12}>
                                <Card sx={{ boxShadow: 3,}}>
                                    <CardActionArea>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div" textAlign='center'>
                                                Hi🖐 {userObject.first_name + " " + userObject.last_name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" textAlign='center'>
                                                UserId: {userObject.uid}
                                            </Typography>
                                            <Typography  variant="body2" color="text.secondary" textAlign='center'>
                                                Driver Status: {userObject.deliver_status}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                            <Grid item lg={8} md={8} xs={12}>
                                {/**
                                 *
                                 *
                                 */}
                                <DriverTable orderDetails={currentOrder[0]} setSnackbarOpen={setSnackbarOpen}/>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    onClose={closeSnackbar}
                    // message="Successfully updated"
                    severity="success"
                >
                    <Alert onClose={closeSnackbar} severity="success" sx={{ width: '100%' }}>
                        Order successfully delivered
                    </Alert>
                </Snackbar>
            </ThemeProvider>
        )
    }
    else{
        window.open('/forbidden.html', "_self")
        return null
    }

}

export default DriverPage

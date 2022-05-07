import * as React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Box, Container, Grid, Typography, Card, CardContent, CardActionArea, useMediaQuery } from '@mui/material'
import axios from 'axios'
import RestaurantDetails from '../components/RestaurantDetails'
import MenuDetails from '../components/MenuDetails'
import RestaurantOrders from '../components/RestaurantOrders'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { isEmpty } from '@firebase/util'

function RestaurantOwnerPage() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
    const [isLoading, setIsLoading] = React.useState(true)
    const [restaurantObject, setRestaurantObject] = React.useState([])
    const [newOwner, setNewOwner] = React.useState(false)
    const [newOwnerObject, setNewOwnerObject] = React.useState({})

    const userObject = JSON.parse(sessionStorage.getItem('user'))

    const navigate = useNavigate()

    const theme = React.useMemo(() =>
        createTheme({
            palette: {
                mode: 'light',
            },
        }),
        [prefersDarkMode],
    )

    React.useEffect(() => {
        axios.get('https://hungry-monkey-api.azurewebsites.net/api/restaurant/getAllRestaurant')
            .then(response => {
                console.log(response.data)
                response.data.forEach(restaurant => {
                    if(restaurant.owner === userObject.email){
                        setRestaurantObject(restaurant)
                        setNewOwner(false)
                    }
                })
            })
            .catch(error => {
                console.log(error)               
            })     
    }, [])

    React.useEffect(() => {
        if(restaurantObject.length < 1){
            setNewOwnerObject({
                name: '',
                description: '',
                location: '',
                open_time: '',
                close_time: '',
                owner: userObject.email,
            })
            setNewOwner(true)
        }

    }, [userObject.email, restaurantObject.length])
    

    if (!sessionStorage.getItem('uid')) {
        navigate('/login')
    } else if (JSON.parse(sessionStorage.getItem('user')).role === 'restaurant') {

        if(newOwner) {
            return (
                <ThemeProvider theme={theme}>
                    <Navbar/>
                    <Box sx={{ flexGrow: 1, py: 8 }} theme={theme}>
                        <Container maxWidth="lg">
                            <Typography
                                sx={{ mb: 3 }}
                                variant="h4"
                            >
                                Restaurant
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item lg={4} md={4} xs={12}>
                                    <Card sx={{ boxShadow: 3, }}>
                                        <CardActionArea>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div" textAlign='center'>
                                                    {restaurantObject.name}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" textAlign='center'>
                                                    Owner: {restaurantObject.owner}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" textAlign='center'>
                                                    Status: {restaurantObject.status === 'Approve'? "Approved" : "Loading"}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" textAlign='center'>
                                                    Opening Time: {restaurantObject.open_time}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" textAlign='center'>
                                                    Closing Time: {restaurantObject.close_time}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" textAlign='center'>
                                                    Location: {restaurantObject.location}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                                <Grid item lg={8} md={8} xs={12}>
                                    <Typography variant='h4'>Hello new Restaurant owner</Typography>
                                    <Typography variant='h6' style={{marginBottom: 20}}>Please provide the details of your restaurant using the form below</Typography>
                                    <RestaurantDetails restaurantobjectprop={newOwnerObject} />
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
                </ThemeProvider>
            )
        } 

            return (
                <ThemeProvider theme={theme}>
                    <Navbar/>
                    <Box sx={{ flexGrow: 1, py: 8 }} theme={theme}>
                        <Container maxWidth="lg">
                            <Typography
                                sx={{ mb: 3 }}
                                variant="h4"
                            >
                                Restaurant
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item lg={4} md={4} xs={12}>
                                    <Card sx={{ boxShadow: 3, }}>
                                        <CardActionArea>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div" textAlign='center'>
                                                    {restaurantObject.name}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" textAlign='center'>
                                                    Owner: {restaurantObject.owner}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" textAlign='center'>
                                                    Status: {restaurantObject.status === 'Approve'? "Approved" : "Loading"}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" textAlign='center'>
                                                    Opening Time: {restaurantObject.open_time}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" textAlign='center'>
                                                    Closing Time: {restaurantObject.close_time}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" textAlign='center'>
                                                    Location: {restaurantObject.location}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                                <Grid item lg={8} md={8} xs={12}>
                                    <RestaurantDetails restaurantobjectprop={restaurantObject} />
                                    <MenuDetails restaurantobjectprop={restaurantObject}/>
                                    <RestaurantOrders restaurantobjectprop={restaurantObject}/>
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
                </ThemeProvider>
            )

    }
    else {
        window.open('/forbidden.html', "_self")
        return null
    }
}

export default RestaurantOwnerPage

import * as React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Box, Container, Grid, Typography, Card, CardContent, CardActionArea, useMediaQuery } from '@mui/material'
import axios from 'axios'
import RestaurantDetails from '../components/RestaurantDetails'
import MenuDetails from '../components/MenuDetails'
import RestaurantOrders from '../components/RestaurantOrders'
import { useNavigate } from 'react-router-dom'

function RestaurantOwnerPage() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
    const [isLoading, setIsLoading] = React.useState(false)
    const [restaurantObject, setRestaurantObject] = React.useState([])
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
        axios.post('https://hungry-monkey-api.azurewebsites.net/api/restaurant/getRestaurantByName', {
            'name': "Paskal's Burgers",
        })
            .then(response => {
                setRestaurantObject(response.data[0])
                setIsLoading(false)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    if (isLoading) {
        return (
            <ThemeProvider theme={theme}>
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
                                                Loading
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" textAlign='center'>
                                                Loading
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
    else if (JSON.parse(sessionStorage.getItem('user')).role === 'restaurant') {
        return (
            <ThemeProvider theme={theme}>
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
                                                Status: {restaurantObject.status}
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
                                <MenuDetails />
                                <RestaurantOrders />
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

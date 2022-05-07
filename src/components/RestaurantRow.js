import React, { useEffect, useState } from 'react'
import { Button, Grid, Typography, CssBaseline, Container } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import RestaurantCard from './RestaurantCard'
import axios from 'axios'

const theme = createTheme()

function RestaurantRow(props) {

    const [isLoading, setIsLoading] = useState(true)
    const restaurantList = []
    const [stateArray, setStateArray] = useState()
    const [imageUrlArray, setImageUrlArray] = useState([])

    useEffect(() => {
        if(props.allRestaurants.length > 0){
            props.allRestaurants.forEach(restaurant => {
                restaurantList.push(restaurant)
            })
            setStateArray(restaurantList)
            setIsLoading(false)
        }
        props.allRestaurants.forEach(restaurant => {
            axios.post('https://hungry-monkey-api.azurewebsites.net/api/restaurant/getRestaurantImage', {
                "restaurant_id": restaurant.restaurant_id,
            })
            .then(response => {
                setImageUrlArray((prevState) => [...prevState, response.data])
                console.log(imageUrlArray)
            })
            .catch(error => {
                console.log(error)
            })  
        })

    },[props.allRestaurants])

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xl">
                <CssBaseline />
                    <Grid 
                        container 
                        style={{ marginTop: 30 }}
                    >
                        <Grid item xl={1} lg={1} md={1} sm={1} xs={1}/>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={4}>
                            <Typography variant="h6" color="inherit" component="div">Recommended takeaways</Typography>
                        </Grid>
                    </Grid>
                    <Grid 
                        container 
                        direction="row"
                        justifyContent="space-evenly"
                        alignItems="center"
                    >  
                        {props.allRestaurants.map((item, iterator) => {
                            return <RestaurantCard 
                                name={item.name}
                                key={item.name}
                                description={item.description}
                                imageUrl={imageUrlArray[iterator]}
                                id={item.restaurant_id}
                                restaurantid={item.restaurant_id}
                                rating="5/5"
                                price="4/5"
                                opens={item.open_time}
                                closes={item.close_time}
                                address={item.location}
                            />
                        })}  
                </Grid>      
            </Container>
        </ThemeProvider>
    )


    
}

export default RestaurantRow
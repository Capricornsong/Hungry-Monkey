import React from 'react'
import { Button, Grid, Typography, CssBaseline, Container } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import RestaurantCard from './RestaurantCard'

const theme = createTheme()

function RestaurantRow(props) {
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
                        <Grid item xl={2} lg={1} md={1} sm={1} xs={1}/>
                        <Grid item xl={1} lg={2} md={2} sm={3} xs={4}>
                            <Button variant='outlined'>Food type</Button>
                        </Grid>
                        <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                            <Button variant='outlined'>Sort</Button>
                        </Grid>
                    </Grid>
                    <Grid 
                        container 
                        direction="row"
                        justifyContent="space-evenly"
                        alignItems="center"
                    >  
                        {props.allRestaurants.slice(0,3).map((item) => (
                            <RestaurantCard 
                            name={item.name}
                            key={item.name}
                            description={item.description}
                            id={item.id}
                            foodType="Noodles"
                            rating="5/5"
                            price="4/5"
                            opens={item.open_time}
                            closes={item.close_time}
                            address={item.location}
                            /> 
                        ))}  
                </Grid>      
            </Container>
        </ThemeProvider>
    )
}

export default RestaurantRow

import React from 'react'
import { Button, Grid, Typography } from '@mui/material'
import RestaurantCard from './RestaurantCard'

function RestaurantRow() {
    return (
        <div id="restaurant-row-div" className='bottom-margin top-margin'>
            <Grid container style={{ marginTop: 30 }}>
                <Grid item xs={2}></Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" color="inherit" component="div">Recommended takeaways</Typography>
                </Grid>
                <Grid item xs={1}>
                    <Button variant='outlined'>Food type</Button>
                </Grid>
                <Grid item xs={1}>
                    <Button variant='outlined'>Sort</Button>
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid>
            <Grid container style={{ marginTop: 30 }}>
                <Grid item xs={1}></Grid>
                <Grid item xs={10} container>
                    <RestaurantCard name="Pizza" />
                    <RestaurantCard name="Kebab" />
                    <RestaurantCard name="Noodles" />
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
        </div>
    )
}

export default RestaurantRow
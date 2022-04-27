import React from 'react';
import { Button, Grid } from '@mui/material';
import RestaurantCard from './RestaurantCard';

 function RestaurantRow(){
    return(
        <div id="restaurant-row-div" className='bottom-margin top-margin'>
            <Grid container>
                <Grid item xs={2}></Grid>
                <Grid item xs={5}>
                    <h3>Recommended takeaways</h3>
                </Grid>
                <Grid item xs={1}>
                    <Button variant='outlined'>Food type</Button>
                </Grid>
                <Grid item xs={1}>
                    <Button variant='outlined'>Sort</Button>
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid>
            <Grid container>
                <Grid item xs={2}></Grid>
                <Grid item xs={8} container>
                    <RestaurantCard name="Pizza"/>
                    <RestaurantCard name="Kebab"/>
                    <RestaurantCard name="Noodles"/>
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid>
        </div>
    )
  }

export default RestaurantRow;
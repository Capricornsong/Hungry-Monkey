
import React from 'react'
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material'

function RestaurantCard(props) {


    return (
        <div id="restaurant-card-div" style={{ marginRight: 20 }}>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image="src\media\kebab.jpg"
                        alt="kebab"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {props.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Kebab lorem ipsum Kebab lorem ipsum Kebab lorem ipsum Kebab lorem ipsum Kebab lorem ipsum
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">More info</Button>
                    <Button variant="contained" style={{ marginLeft: 150 }}>Menu</Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default RestaurantCard
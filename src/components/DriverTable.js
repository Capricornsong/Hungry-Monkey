import { Button, Card, CardContent, CardHeader, Divider, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import { useEffect, useState } from 'react'

function DriverTable(props) {   
    const [foodPickedVisible, setFoodPickedVisible] = useState(true)
    const [foodDeliveredVisible, setFoodDeliveredVisible] = useState(false)
    const [orderEmpty, setOrderEmpty] = useState(true)

    const handleFoodPickedUp = () => {
        setFoodPickedVisible(false)
        setFoodDeliveredVisible(true)
    }

    const handleFoodDelivered = () => {
        setFoodDeliveredVisible(false)
        
        axios.patch('https://hungry-monkey-api.azurewebsites.net/api/order/updateOrderStatus', {
            "order_id": props.orderDetails.order_id.toString(),
            "order_status": "delivered"
        })
        .then(response => {
            if(response.status === 200){
                props.setSnackbarOpen(true)
            }
        })
        .catch(error => {
            console.log(error)
        })
    }


    useEffect(() => {
        if(props.orderDetails !== undefined){
            setOrderEmpty(false)
        }
    },[])

    

    if(orderEmpty) {
        return (
            <div>
            <Card sx={{ boxShadow: 3 }}>
                <CardHeader
                    title='Currently assigned order'
                    subheader='Details of the currently assigned order'
                />
                <Divider />
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xl={12} lg={12} md={12} xs={12} >
                            <Typography>You have no orders assigned at the moment. Please check later when you have been assigned an order.</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
        )
    } else {
        return (
            <div>
                <Card sx={{ boxShadow: 3 }}>
                    <CardHeader
                        title='Currently assigned order'
                        subheader='Details of the currently assigned order'
                    />
                    <Divider />
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xl={6} lg={6} md={6} xs={6} >
                                <Typography>Order id: {props.orderDetails.order_id}</Typography>
                                <Typography>Order created at: {props.orderDetails.order_placed_time}</Typography>
                                <Button 
                                    variant='contained' 
                                    style={{marginRight: 10, marginTop: 10}}
                                    disabled={foodPickedVisible? false : true} 
                                    onClick={handleFoodPickedUp}
                                >
                                    Food picked up
                                </Button>
                                <Button 
                                    variant='contained' 
                                    style={{ marginTop: 10}} 
                                    disabled={foodDeliveredVisible? false : true}
                                    onClick={handleFoodDelivered}
                                >
                                    Food Delivered
                                </Button>
                            </Grid>
                            <Grid item xl={6} lg={6} md={6} xs={6} >
                                <Typography>Restaurant name: {props.orderDetails.restaurant_name}</Typography>
                                <Typography>Order information:</Typography>
                                {props.orderDetails.food_ordered.map((item, iterator) => (
                                    <Box boxShadow={2} style={{marginTop: 10, padding: 10}} key={'order-item-box' + iterator.toString()}>
                                        <Typography>Item: {iterator + 1}</Typography>
                                        <Typography>{item.food_name}</Typography>
                                        <Typography>Price: £ {item.food_price}</Typography>
                                        <Typography>Quantity: {item.food_amount}</Typography>
                                    </Box>
                                ))}
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default DriverTable
import { Alert, Box, Button, Card, CardContent, Grid, Snackbar, TextField } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import { useEffect, useState } from 'react'
import axios from 'axios'

function MenuItemEdit(props) { 

    const [snackbarOpen, setSnackbarOpen] = useState(false)

    const handleSnackbarClose = () => {
        setSnackbarOpen(false)
    }

    const [menuItemObject, setMenuItemObject] = useState({
        restaurant_id: '',
        food_id: '',
        food_description: '',
        food_price: '',
        food_name: '',
        food_type: '',
    })

    useEffect(() => {
        setMenuItemObject({
            restaurant_id: props.restaurantid,
            food_id: props.itemobject.food_id,
            food_description: props.itemobject.food_description,
            food_price: props.itemobject.food_price,
            food_name: props.itemobject.food_name,
            food_type: props.itemobject.food_type, 
        })
    },[])

    const handleUpdateInputBox = (event) => {
        setMenuItemObject({
            ...menuItemObject,
            [event.target.name]: event.target.value
        })
    }

    const handleUpdate = (event) => {
        event.preventDefault()
        axios.patch('https://hungry-monkey-api.azurewebsites.net/api/restaurant/menu/updateFood', menuItemObject)
            .then(response => {
                console.log(response.data)
                if (response.data.result) {
                    console.log('success')
                    setSnackbarOpen(true)
                    setTimeout(() => { window.location.href = "/restaurant_owner_page"; }, 500);
                }
            })
    }

    const handleDelete = () => {
        axios.delete('https://hungry-monkey-api.azurewebsites.net/api/restaurant/menu/deleteFood', {data: {
            'restaurant_id': menuItemObject.restaurant_id,
            'food_id': menuItemObject.food_id
        }, headers:{Authorization: "token"}})

        .then(response => {
            console.log(response.data)
            if (response.data.result) {
                setSnackbarOpen(true)
                setTimeout(() => { window.location.href = "/restaurant_owner_page"; }, 500);
            }
        })

    }
    
    return (
        <Box sx={{ margin: 1 }} boxShadow={1}>
            <form
                autoComplete='off'
                noValidate
                {...props}
                onSubmit={handleUpdate}
            >
                <Card sx={{ boxShadow: 0}}>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} lg={4} >
                                <TextField
                                    fullWidth
                                    name='food_name'
                                    required
                                    label='Item name'
                                    value={menuItemObject.food_name}
                                    onChange={handleUpdateInputBox}
                                />
                            </Grid>
                            <Grid item xs={12} md={12} lg={4} >
                                <TextField
                                    fullWidth
                                    name='food_description'
                                    required
                                    label='Item description'
                                    value={menuItemObject.food_description}
                                    onChange={handleUpdateInputBox}
                                />
                            </Grid>
                            <Grid item xs={12} md={12} lg={4} >
                                <TextField
                                    fullWidth
                                    name='food_price'
                                    required
                                    label='Item price'
                                    value={menuItemObject.food_price}
                                    onChange={handleUpdateInputBox}
                                />
                            </Grid>
                            <Grid
                                item xs={12} md={12} lg={6} textAlign='right' >
                                <Button
                                    variant="contained"
                                    sx={{ mt: 3, mb: 1 }}
                                    color='error'
                                    fullWidth
                                    onClick={() => handleDelete(menuItemObject.food_id)}
                                >
                                    Delete Item
                                    <DeleteForeverIcon/>
                                </Button>
                            </Grid>
                            <Grid
                                item xs={12} md={12} lg={6} textAlign='center' >
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 1 }}
                                    color='primary'
                                    fullWidth
                                >
                                    Update Item
                                    <EditIcon style={{paddingLeft: 5}}/>
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </form>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                // message="Successfully updated"
                severity="success"
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Successfully Updated
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default MenuItemEdit
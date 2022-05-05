import { Button, Card, CardContent, Collapse, Grid, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import axios from 'axios'

function AddMenuItem(props) { 
    const [editFormOpen, setEditFormOpen] = useState(false)
    const [nameError, setNameError] = useState(false)
    const [descriptionError, setDescriptionError] = useState(false)
    const [priceError, setPriceError] = useState(false)
    const [typeError, setTypeError] = useState(false)

    const [newMenuItemObject, setNewMenuItemObject] = useState({
        restaurant_id: '',
        food_description: '',
        food_price: '',
        food_name: '',
        food_type: '',
    })

    useEffect(() => {
        setNewMenuItemObject({
            restaurant_id: props.restaurantid,
            food_description: '',
            food_price: '',
            food_name: '',
            food_type: '', 
        })
    },[])

    const handleUpdateInputBox = (event) => {
        setNewMenuItemObject({
            ...newMenuItemObject,
            [event.target.name]: event.target.value
        })
    }

    const checkInputFields = () => {
        if(newMenuItemObject.food_name == '') {
            setNameError(true)
        } else {
            setNameError(false)
        }
        if(newMenuItemObject.food_description == '') {
            setDescriptionError(true)
        } else {
            setDescriptionError(false)
        }
        if(newMenuItemObject.food_price == '') {
            setPriceError(true)
        } else {
            setPriceError(false)
        }
        if(newMenuItemObject.food_type == '') {
            setTypeError(true)
        } else {
            setTypeError(false)
        }
    }

    const handleCreate = () => {
        checkInputFields()

        if(newMenuItemObject.food_name !== '' && newMenuItemObject.food_description !== '' && newMenuItemObject.food_price !== '' && newMenuItemObject.food_type !== '') {
            axios.post('https://hungry-monkey-api.azurewebsites.net/api/restaurant/menu/createNewFood', newMenuItemObject)
            .then(response => {
                console.log(response.data)
                if (response.data.result) {
                    console.log('success')
                    window.location.href = "/restaurant_owner_page";
                }
            })
        } else {
            console.log("error occured")
        }
        

    }

    return (
        <div>
            <Button
                variant="contained"
                sx={{ mt: 3, mb: 1 }}
                color='primary'
                style={{width: 300}}
                onClick={() => setEditFormOpen(!editFormOpen)}
            >
                Add Item
                <AddCircleIcon style={{paddingLeft: 5}}/>
            </Button>

            <Collapse in={editFormOpen} timeout='auto' unmountOnExit>
                <Card sx={{ boxShadow: 0}}>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} lg={3} >
                                <TextField
                                    fullWidth
                                    name='food_name'
                                    required
                                    label={nameError? 'Name Required' : 'Item name'}
                                    onChange={handleUpdateInputBox}
                                    error={nameError}
                                />
                            </Grid>
                            <Grid item xs={12} md={12} lg={3} >
                                <TextField
                                    fullWidth
                                    name='food_description'
                                    required
                                    label={descriptionError? 'Description Required' : 'Item description'}
                                    onChange={handleUpdateInputBox}
                                    error={descriptionError}
                                />
                            </Grid>
                            <Grid item xs={12} md={12} lg={3} >
                                <TextField
                                    fullWidth
                                    name='food_price'
                                    required
                                    label={priceError? 'Price Required' : 'Item price'}
                                    onChange={handleUpdateInputBox}
                                    error={priceError}
                                />
                            </Grid>
                            <Grid item xs={12} md={12} lg={3} >
                                <TextField
                                    fullWidth
                                    name='food_type'
                                    required
                                    label={typeError? 'Type Required' : 'Item type'}
                                    onChange={handleUpdateInputBox}
                                    error={typeError}
                                />
                            </Grid>
                            <Grid
                                item xs={12} md={12} lg={12} textAlign='center' >
                                <Button
                                    variant="contained"
                                    sx={{ mt: 3, mb: 1 }}
                                    color='success'
                                    style={{width: 300}}
                                    onClick={() => handleCreate()}
                                >
                                    Create Item
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Collapse>

        </div>
    )
}

export default AddMenuItem
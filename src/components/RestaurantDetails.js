import * as React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Alert, Box, Button, FilledInput, Card, CardActionArea, CardContent, styled, Collapse, Grid, Snackbar, Table, TableBody, TableCell, TableRow, TextField, Typography, useMediaQuery } from '@mui/material'
import StoreIcon from '@mui/icons-material/Store'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Input = styled('input')({
    display: 'none',
})

function RestaurantDetails(props) {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

    const [isLoading, setIsLoading] = React.useState(true)
    const [editFormOpen, setEditFormOpen] = React.useState(false)
    const [snackbarOpen, setSnackbarOpen] = React.useState(false)
    const [selectedFile, setSelectedFile] = React.useState(null)
    const [newOwner, setNewOwner] = React.useState(false)
    const navigate = useNavigate()
    const userObject = JSON.parse(sessionStorage.getItem('user'))

    const theme = React.useMemo(() =>
        createTheme({
            palette: {
                mode: 'light',
            },
        }),
        [prefersDarkMode],
    )

    const handleSnackbarClose = () => {
        setSnackbarOpen(false)
    }

    const [restaurantObject, setRestaurantObject] = React.useState({
        restaurant_id: '',
        name: '',
        description: '',
        location: '',
        open_time: '',
        close_time: '',
    })

    const [newRestaurantObject, setNewRestaurantObject] = React.useState({
        name: '',
        description: '',
        location: '',
        open_time: '',
        close_time: '',
        owner: '',
    })

    const handleUpdateInputBox = (event) => {
        setRestaurantObject({
            ...restaurantObject,
            [event.target.name]: event.target.value
        })
    }

    const handleNewUpdateInputBox = (event) => {
        setNewRestaurantObject({
            ...newRestaurantObject,
            [event.target.name]: event.target.value
        })
    }

    const handleUpdate = (event) => {
        event.preventDefault()
        console.log(restaurantObject)
        axios.patch('https://hungry-monkey-api.azurewebsites.net/api/restaurant/updateRestaurant', restaurantObject)
            .then(response => {
                if (response.data.result) {
                    setSnackbarOpen(true)
                    setTimeout(() => { window.location.href = "/restaurant_owner_page" }, 500)
                }
            })
    }

    React.useEffect(() => {
        if(props.restaurantobjectprop.name !== ''){
            axios.post('https://hungry-monkey-api.azurewebsites.net/api/restaurant/getRestaurantByName', {
                'name': props.restaurantobjectprop.name,
            })
            .then(response => {
                setRestaurantObject(response.data[0])
                setIsLoading(false)
            })
            .catch(error => {
                console.log(error)
            })
        } else {
            // new owner
            setNewOwner(true)
            setIsLoading(false)
        }      
    },[props.restaurantobjectprop.name])

    
    const handleCapture = (event) => {
        console.log(event.target.value);
        setSelectedFile(event)
    }
    const handleUploadImage = () => {
        // saveFace(selectedFile)
        // console.log(selectedFile);
    }

    const handleRestaurantRegister = () => {
        axios.post('https://hungry-monkey-api.azurewebsites.net/api/restaurant/createNewRestaurant', {
                "name": newRestaurantObject.name,
                "description": newRestaurantObject.description,
                "location": newRestaurantObject.location,
                "open_time": newRestaurantObject.open_time,
                "close_time": newRestaurantObject.close_time,
                "owner": userObject.email
            })
            .then(response => {
                setSnackbarOpen(true)
                setTimeout(() => { navigate('/user_page') }, 700)

            })
            .catch(error => {
                console.log(error)
            })
    }

    if (isLoading) {
        return (
            <Typography>Loading</Typography>
        )
    } else if(newOwner) {
        // new owner table
        return (
            <ThemeProvider theme={theme}>
                <Grid container spacing={3}>
                    <Grid item lg={12} md={12} xs={12}>
    
                        <Card sx={{ boxShadow: 3 }}>
                            <CardActionArea onClick={() => setEditFormOpen(!editFormOpen)}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div" textAlign='center'>
                                        Register Restaurant Details
                                        <StoreIcon style={{ marginLeft: 10 }} />
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" textAlign='center'>
                                        {editFormOpen ? 'Click here to close the detail editor' : 'Click here to edit restaurant details'}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
    
                        <Collapse in={editFormOpen} timeout='auto' unmountOnExit>
                            <Card sx={{ boxShadow: 1 }}>
                                <CardContent>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell style={{ padding: 0, paddingTop: 0 }} colSpan={6}>
                                                    <Box sx={{ margin: 1 }}>
                                                        <form
                                                            autoComplete='off'
                                                            noValidate
                                                            onSubmit={handleRestaurantRegister}
                                                            {...props}
                                                        >
                                                            <Card sx={{ boxShadow: 0 }}>
                                                                <CardContent>
                                                                    <Grid container spacing={2}>
                                                                        <Grid item xs={12} md={12} lg={12} >
                                                                            <TextField
                                                                                fullWidth
                                                                                name='name'
                                                                                required
                                                                                label='Restaurant name'
                                                                                value={newRestaurantObject.name}
                                                                                onChange={handleNewUpdateInputBox}
                                                                            />
                                                                        </Grid>
                                                                        <Grid item xs={12} md={12} lg={12} >
                                                                            <TextField
                                                                                fullWidth
                                                                                name='description'
                                                                                required
                                                                                label='Restaurant description'
                                                                                value={newRestaurantObject.description}
                                                                                onChange={handleNewUpdateInputBox}
                                                                            />
                                                                        </Grid>
                                                                        <Grid item xs={12} md={12} lg={12} >
                                                                            <TextField
                                                                                fullWidth
                                                                                name='open_time'
                                                                                required
                                                                                label='Opening time'
                                                                                value={newRestaurantObject.open_time}
                                                                                onChange={handleNewUpdateInputBox}
                                                                            />
                                                                        </Grid>
                                                                        <Grid item xs={12} md={12} lg={12} >
                                                                            <TextField
                                                                                fullWidth
                                                                                name='close_time'
                                                                                required
                                                                                label='Closing time'
                                                                                value={newRestaurantObject.close_time}
                                                                                onChange={handleNewUpdateInputBox}
                                                                            />
                                                                        </Grid>
                                                                        <Grid item xs={12} md={12} lg={12} >
                                                                            <TextField
                                                                                fullWidth
                                                                                name='location'
                                                                                required
                                                                                label='Location'
                                                                                value={newRestaurantObject.location}
                                                                                onChange={handleNewUpdateInputBox}
                                                                            />
                                                                        </Grid>
                                                                        <Grid
                                                                            item xs={12} md={12} lg={12} textAlign='right' >
                                                                            <Button
                                                                                //type="submit"
                                                                                variant="contained"
                                                                                sx={{ mt: 0, mb: 1 }}
                                                                                color='primary'
                                                                                fullWidth
                                                                                onClick={() => handleRestaurantRegister()}
                                                                            >
                                                                                Register Restaurant
                                                                            </Button>
                                                                        </Grid>
    
                                                                    </Grid>
                                                                </CardContent>
                                                            </Card>
                                                        </form>
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </Collapse>
                        <Snackbar
                            open={snackbarOpen}
                            autoHideDuration={3000}
                            onClose={handleSnackbarClose}
                            // message="Successfully updated"
                            severity="success"
                        >
                            <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                                Restaurant successfully registered
                            </Alert>
                        </Snackbar>
                    </Grid>
                </Grid>
            </ThemeProvider>
        )
    } else {
        return (
            <ThemeProvider theme={theme}>
                <Grid container spacing={3}>
                    <Grid item lg={12} md={12} xs={12}>
    
                        <Card sx={{ boxShadow: 3 }}>
                            <CardActionArea onClick={() => setEditFormOpen(!editFormOpen)}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div" textAlign='center'>
                                        Restaurant Details
                                        <StoreIcon style={{ marginLeft: 10 }} />
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" textAlign='center'>
                                        {editFormOpen ? 'Click here to close the detail editor' : 'Click here to edit restaurant details'}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
    
                        <Collapse in={editFormOpen} timeout='auto' unmountOnExit>
                            <Card sx={{ boxShadow: 1 }}>
                                <CardContent>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell style={{ padding: 0, paddingTop: 0 }} colSpan={6}>
                                                    <Box sx={{ margin: 1 }}>
                                                        <form
                                                            autoComplete='off'
                                                            noValidate
                                                            onSubmit={handleUpdate}
                                                            {...props}
                                                        >
                                                            <Card sx={{ boxShadow: 0 }}>
                                                                <CardContent>
                                                                    <Grid container spacing={2}>
                                                                        <Grid item xs={12} md={12} lg={12} >
                                                                            <TextField
                                                                                fullWidth
                                                                                name='name'
                                                                                required
                                                                                label='Restaurant name'
                                                                                value={restaurantObject.name}
                                                                                onChange={handleUpdateInputBox}
                                                                            />
                                                                        </Grid>
                                                                        <Grid item xs={12} md={12} lg={12} >
                                                                            <TextField
                                                                                fullWidth
                                                                                name='description'
                                                                                required
                                                                                label='Restaurant description'
                                                                                value={restaurantObject.description}
                                                                                onChange={handleUpdateInputBox}
                                                                            />
                                                                        </Grid>
                                                                        <Grid item xs={12} md={12} lg={12} >
                                                                            <TextField
                                                                                fullWidth
                                                                                name='open_time'
                                                                                required
                                                                                label='Opening time'
                                                                                value={restaurantObject.open_time}
                                                                                onChange={handleUpdateInputBox}
                                                                            />
                                                                        </Grid>
                                                                        <Grid item xs={12} md={12} lg={12} >
                                                                            <TextField
                                                                                fullWidth
                                                                                name='close_time'
                                                                                required
                                                                                label='Closing time'
                                                                                value={restaurantObject.close_time}
                                                                                onChange={handleUpdateInputBox}
                                                                            />
                                                                        </Grid>
                                                                        <Grid item xs={12} md={12} lg={12} >
                                                                            <TextField
                                                                                fullWidth
                                                                                name='restaurant_location'
                                                                                required
                                                                                label='Location'
                                                                                value={restaurantObject.location}
                                                                                onChange={handleUpdateInputBox}
                                                                            />
                                                                        </Grid>
                                                                        <Grid
                                                                            item xs={12} md={12} lg={12} textAlign='right' >
                                                                            <label htmlFor="contained-button-file">
                                                                                <Input accept="image/png" id="contained-button-file" multiple type="file"
                                                                                    onChange={handleCapture} />
                                                                                <Button variant="contained" component="span" color='secondary' fullWidth >
                                                                                    Upload Image1
                                                                                </Button>
                                                                            </label>
                                                                            <label htmlFor="uploadImage">
                                                                                <Input accept="image/*" id="uploadImage" type="file" />
                                                                                {/* {selectedFile ? selectedFile.name : "Select Image"} */}
                                                                                <Button variant="contained" component="span" color='secondary' fullWidth onClick={handleUploadImage}>
                                                                                    Choose image 
                                                                                </Button>
                                                                            </label>
                                                                        </Grid>
                                                                        <Grid
                                                                            item xs={12} md={12} lg={12} textAlign='right' >
                                                                            <Button
                                                                                type="submit"
                                                                                variant="contained"
                                                                                sx={{ mt: 0, mb: 1 }}
                                                                                color='primary'
                                                                                fullWidth
                                                                            >
                                                                                Update
                                                                            </Button>
                                                                        </Grid>
    
                                                                    </Grid>
                                                                </CardContent>
                                                            </Card>
                                                        </form>
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </Collapse>
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
                    </Grid>
                </Grid>
            </ThemeProvider>
        )
    }

    
}

export default RestaurantDetails
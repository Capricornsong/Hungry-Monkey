import * as React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Alert, Button, Card, CardActionArea, CardContent, Collapse, Grid, Snackbar, Table, TableBody, TableCell, TableRow, Typography, useMediaQuery } from '@mui/material'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import axios from 'axios'
import MenuItemEdit from './MenuItemEdit'
import AddMenuItem from './AddMenuItem'

function MenuDetails(props) { 
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const [isLoading, setIsLoading] = React.useState(true)
    const [editFormOpen, setEditFormOpen] = React.useState(false)
    const [snackbarOpen, setSnackbarOpen] = React.useState(false)
    const [menuArray, setMenuArray] = React.useState([])  

    const handleSnackbarClose = () => {
        setSnackbarOpen(false)
    }

    const handleUpdate = (item) => {
        console.log(item)
        setSnackbarOpen(true)
    }

    const theme = React.useMemo( () =>
        createTheme({
            palette: {
            mode: prefersDarkMode ? 'dark' : 'light',
            },
        }),
        [prefersDarkMode],
    );


    React.useEffect(() => {
        axios.post('https://hungry-monkey-api.azurewebsites.net/api/restaurant/menu/getAllFoodByRestaurantID', {
            'restaurant_id': "23b3af84-b7cf-496a-8283-e20fcadb1ab6",
        })
        .then(response => {
            setMenuArray(response.data)
            setIsLoading(false)
        })
        .catch(error => {
            console.log(error)
        })
    },[])

    if(isLoading){
        return(
            <Typography>Loading</Typography>
        )
    }

    return (
        <ThemeProvider theme={theme}>
            <Grid container spacing={3} style={{marginTop: 20}}>
                    <Grid item lg={12} md={12} xs={12}>

                        <Card sx={{ boxShadow: 3}}>
                            <CardActionArea onClick={() => setEditFormOpen(!editFormOpen)}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div" textAlign='center'>
                                        Menu Details
                                        <MenuBookIcon style={{marginLeft: 10}}/>
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" textAlign='center'>
                                        {editFormOpen? 'Click here to close the menu editor' : 'Click here to edit menu details'}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>

                        <Collapse in={editFormOpen} timeout='auto' unmountOnExit>
                            <Card sx={{ boxShadow: 1 }}>
                                <CardContent>
                                    <Table>
                                        <TableBody>
                                            {menuArray.map((item, iterator) => (
                                                <TableRow key={iterator}>
                                                    <TableCell style={{ padding: 0, paddingTop: 0 }} colSpan={6}>
                                                        <MenuItemEdit itemobject={item} restaurantid={"23b3af84-b7cf-496a-8283-e20fcadb1ab6"}/>
                                                    </TableCell>
                                                </TableRow>
                                            ))} 
                                            <TableRow>
                                                <TableCell>               
                                                    <Grid item xs={12} md={12} lg={12} textAlign='center'>
                                                        <AddMenuItem restaurantid={"23b3af84-b7cf-496a-8283-e20fcadb1ab6"}/>
                                                    </Grid>
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

export default MenuDetails
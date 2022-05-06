import * as React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Card, CardActionArea, CardContent, Collapse, Grid, Typography, useMediaQuery } from '@mui/material'
import TaskIcon from '@mui/icons-material/Task'
import UnassignedOrders from './UnassignedOrders'
import AssignedOrders from './AssignedOrders'
import CompletedOrders from './CompletedOrders'


function RestaurantDetails(props) { 
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const [editFormOpen, setEditFormOpen] = React.useState(false)

    const theme = React.useMemo( () =>
        createTheme({
            palette: {
            mode: 'light',
            },
        }),
        [prefersDarkMode],
    );

    return (
        <ThemeProvider theme={theme}>
            <Grid container spacing={3} style={{marginTop: 20}}>
                    <Grid item lg={12} md={12} xs={12}>

                        <Card sx={{ boxShadow: 3}}>
                            <CardActionArea onClick={() => setEditFormOpen(!editFormOpen)}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div" textAlign='center'>
                                        Order List
                                        <TaskIcon style={{marginLeft: 10}}/>
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" textAlign='center'>
                                        {editFormOpen? 'Click here to close the order list' : 'Click here to view and manage orders'}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>

                        <Collapse in={editFormOpen} timeout='auto' unmountOnExit>
                            <Card sx={{ boxShadow: 3 }}>
                                <CardContent>
                                    <UnassignedOrders restaurantName={props.restaurantobjectprop.name}/>
                                    <AssignedOrders restaurantName={props.restaurantobjectprop.name}/>
                                    <CompletedOrders restaurantName={props.restaurantobjectprop.name}/>
                                </CardContent>
                            </Card>
                        </Collapse>

                    </Grid>
                </Grid>

        </ThemeProvider>
    )
}

export default RestaurantDetails
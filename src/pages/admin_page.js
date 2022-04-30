/*
 * @Author: Liusong He
 * @Date: 2022-04-29 16:42:02
 * @LastEditTime: 2022-04-30 19:03:27
 * @FilePath: \coursework_git\src\pages\admin_page.js
 * @Email: lh2u21@soton.ac.uk
 * @Description: 
 */

import { useEffect, useState } from 'react'
import {
    Alert,
    Box,
    Button,
    Card,
    Toolbar,
    Tooltip,
    CardContent,
    CardHeader,
    Checkbox,
    Divider,
    Grid,
    InputLabel,
    TextField,
    MenuItem,
    Paper,
    Select,
    Snackbar,
    TableHead,
    TablePagination,
    TableRow,
    TableCell,
    selectClasses,
    TableContainer,
    Table,
    TableSortLabel,
    IconButton,
    Theme,
    Container,
    CardActionArea,
    Typography,
    TableBody,
    useMediaQuery,
} from '@mui/material'
import * as React from 'react'
import PropTypes from 'prop-types'
import { alpha } from '@mui/material/styles'
import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete'
import FilterListIcon from '@mui/icons-material/FilterList'
import { visuallyHidden } from '@mui/utils'
import { height } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { logDOM } from '@testing-library/react'

const columns = [
    { field: 'restaurant_id', headerName: 'Restaurant ID', flex: 1 },
    { field: 'name', headerName: 'Name', width: 250, },
    { field: 'location', headerName: 'Location', flex: 0.3, minWidth: 70 },
    { field: 'owner', headerName: 'Owner', flex: 0.3 },
    { field: 'status', headerName: 'Status', flex: 0.5 },
    // { field: 'owner', headerName: 'Owner', width: 70 },
]
export default function Admin_page() {
    //Used to save the status of check-boxs, as shows on https://mui.com/zh/x/react-data-grid/selection/
    const [selectionModel, setSelectionModel] = React.useState([])
    //Used to set theme automatically depend on the system setting 
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
    const theme = React.useMemo(
        () => createTheme({
            palette: {
                mode: prefersDarkMode ? 'dark' : 'light',
            },
        }),
        [prefersDarkMode],
    )
    const [restaurantData, setrestaurantData] = useState({
        "close_time": "",
        "open_time": "",
        "location": "",
        "description": "",
        "owner": "",
        "status": "",
        "name": "",
        "restaurant_id": ""
    })
    //get restaurant which status are waitconfirm
    useEffect(() => {
        // axios.post('https://hungry-monkey-api.azurewebsites.net/api/restaurant/getAllRestaurantByStatus', {
        //     status: 'WaitConfirm',
        // })
        axios.get('https://hungry-monkey-api.azurewebsites.net/api/restaurant/getAllRestaurant')
            .then(response => {
                console.log('response_data',response.data)
                setrestaurantData([...response.data])
                // console.log(restaurantData)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])
    //update selectionModel when user click the check-box
    const handSelectionBox = (newSelectionModel) => {
        setSelectionModel(newSelectionModel)
        console.log(newSelectionModel)
    }

    const handleApprove = (event) => {
        const isFail = 0
        if (selectionModel.length === 0) {
            event.preventDefault()
            console.log('empty!')
            // setOpen(true)
            //Snackbar
            ///to be continue...
        }
        else {
            selectionModel.forEach(id => {
                console.log(id)
                axios.patch('https://hungry-monkey-api.azurewebsites.net/api/restaurant/updateRestaurantStatus', {
                    restaurant_id: id,
                    status: 'Approve'
                })
                    .then(response => {
                        console.log(response.data)
                        console.log(response.data.result)
                        if (response.data.result == 'false') {
                            isFail = 1
                        }
                    })
            })
            if(isFail){
                setFail(true)
            }
            else{
                setSuccess(true)
            }
        }
        
        setTimeout(function (){
  
            // Something you want delayed.
                      
          }, 3000); 
    }

    const handleDecline = (event) => {
        const isFail = 0
        if (selectionModel.length === 0) {
            event.preventDefault()
            console.log('empty!')
            // setOpen(true)
            //Snackbar
            ///to be continue...
        }
        else {
            selectionModel.forEach(id => {
                console.log(id)
                axios.patch('https://hungry-monkey-api.azurewebsites.net/api/restaurant/updateRestaurantStatus', {
                    restaurant_id: id,
                    status: 'Declined'
                })
                    .then(response => {
                        console.log(response.data)
                        console.log(response.data.result)
                        if (response.data.result == 'false') {
                            isFail = 1
                        }
                    })
            })
            if(isFail){
                setFail(true)
            }
            else{
                setSuccess(true)
            }
        }
        
        setTimeout(function (){
  
            // Something you want delayed.
                      
          }, 3000); 
    }

    //Snackbar(success)
    const [success, setSuccess] = useState(false)
    const handleCloseSuccess = () => {
        setSuccess(false)
    }
    //Snackbar(fail)
    const [fail, setFail] = useState(false)
    const handleCloseFail = () => {
        setFail(false)
    }
    return (
        <>
            <Box
                // component="main"
                sx={{
                    flexGrow: 1,
                    //pending top
                    py: 8
                }}
                theme={theme}
            >
                <Container maxWidth="lg">
                    <Typography
                        sx={{ mb: 3 }}
                        variant="h4"
                    >
                        Administrator
                    </Typography>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            // the number of columns it uses
                            lg={4}
                            md={4}
                            xs={12}
                        >
                            <Card sx={{
                                // maxWidth:345,
                                boxShadow: 3,
                            }}>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div" textAlign='center
                        '>
                                            Hi🖐 Administrator'name
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" textAlign='center'>
                                            Admin Id: 2151646
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>

                        <Grid
                            item
                            //the number of columns it uses
                            lg={8}
                            md={8}
                            xs={12}
                        >
                            <form
                                autoComplete='off'
                                noValidate
                                // onSubmit={handleApprove}
                            // {...props}
                            >
                                <div style={{  width: '100%' }}>
                                    {/* DataGrid needs a "ID" property for generating columns */}
                                    <DataGrid
                                        autoHeight 
                                        checkboxSelection
                                        isRowSelectable={(params) => params.row.status === 'WaitConfirm'}
                                        // disableSelectionOnClick
                                        rows={restaurantData}
                                        columns={columns}
                                        // pageSize={8}
                                        // rowsPerPageOptions={[8]}
                                        //set id manually 
                                        getRowId={(rows) => rows.restaurant_id}
                                        //handling check0-box
                                        onSelectionModelChange={handSelectionBox}
                                        selectionModel={selectionModel}
                                    />
                                </div>
                                <Grid
                                    item
                                    xs={12}
                                    md={12}
                                    lg={12}
                                    direction='row-reverse'
                                    textAlign='right'
                                    
                                >
                                    <Button
                                        type="submit"
                                        // fullWidth
                                        variant="contained"
                                        sx={{
                                            mt: 3,
                                            mb: 1,
                                        }}
                                        color='primary'
                                        onClick={handleApprove}
                                    >
                                        Approve
                                    </Button>
                                    <Button     
                                        type="submit"
                                        // fullWidth
                                        variant="contained"
                                        sx={{
                                            mt: 3,
                                            mb: 1,
                                            ml:3
                                        }}
                                        color='secondary'
                                        onClick={handleDecline}
                                    >
                                        Declined
                                    </Button>
                                </Grid>
                            </form>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Snackbar
                open={success}
                autoHideDuration={3000}
                onClose={handleCloseSuccess}
                // message="Successfully approved"
                severity="success"
            // anchorOrigin={{'bottom','center'}}
            >
                <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
                    Success!
                </Alert>
            </Snackbar>
            <Snackbar
                open={fail}
                autoHideDuration={3000}
                onClose={handleCloseFail}
                // message="Successfully approved"
                severity="error"
            // anchorOrigin={{'bottom','center'}}
            >
                <Alert onClose={handleCloseFail} severity="error" sx={{ width: '100%' }}>
                     Something wrong!
                </Alert>
            </Snackbar>
        </>
    )
}

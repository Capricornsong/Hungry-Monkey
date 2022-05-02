/*
 * @Author: Liusong He
 * @Date: 2022-04-30 19:52:53
 * @LastEditTime: 2022-05-01 23:05:55
 * @FilePath: \coursework_git\src\components\RestaurantList.js
 * @Email: lh2u21@soton.ac.uk
 * @Description: 
 */


import axios from 'axios'
import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import {
    Alert,
    Button,
    Grid,
    Snackbar,
} from '@mui/material'

export const RestaurantList = (props) => {
    const [selectionModel, setSelectionModel] = React.useState([])
    const columns = [
        { field: 'restaurant_id', headerName: 'Restaurant ID', flex: 0.6 },
        { field: 'name', headerName: 'Name',flex: 1 },
        { field: 'location', headerName: 'Location', flex: 0.3, minWidth: 70 },
        { field: 'owner', headerName: 'Owner', flex: 0.3 },
        { field: 'status', headerName: 'Status', flex: 0.5 },
        // { field: 'owner', headerName: 'Owner', width: 70 },
    ]
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
                console.log('response_data', response.data)
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
            setEmptyItem(true)
            // setOpen(true)
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
            if (isFail) {
                setFail(true)
            }
            else {
                setSuccess(true)
            }
        }
    }

    const handleDecline = (event) => {
        const isFail = 0
        if (selectionModel.length === 0) {
            event.preventDefault()
            console.log('empty!')
            // setOpen(true)
            setEmptyItem(true)
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
            if (isFail) {
                setFail(true)
            }
            else {
                setSuccess(true)
            }
        }
    }
    const [success, setSuccess] = useState(false)

    //Snackbar(fail)
    const [fail, setFail] = useState(false)

    const[emptyItem, setEmptyItem] = useState(false)  

    const handleClose = () =>{
        setSuccess(false)
        setFail(false)
        setEmptyItem(false)
    }

    return (
        <>
            <form
                autoComplete='off'
                noValidate
            >
                <div style={{ width: '100%' }}>
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
                            ml: 3
                        }}
                        color='secondary'
                        onClick={handleDecline}
                    >
                        Declined
                    </Button>
                </Grid>
            </form>
            <Snackbar
                open={success}
                autoHideDuration={3000}
                onClose={handleClose}
                severity="success"
            >
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Success!
                </Alert>
            </Snackbar>
            <Snackbar
                open={fail}
                autoHideDuration={3000}
                onClose={handleClose}
                severity="error"
            >
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Something wrong!
                </Alert>
            </Snackbar>

            <Snackbar
                open={emptyItem}
                autoHideDuration={3000}
                onClose={handleClose}
                severity="info"
            >
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    No item been selectd!
                </Alert>
            </Snackbar>
        </>
    )
}
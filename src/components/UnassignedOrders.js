import { useEffect, useState } from "react"
import { Box, Button, Fade, Grid, Modal, Typography, Backdrop, FormControl, RadioGroup, FormControlLabel, Radio, Snackbar, Alert } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import axios from "axios"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  }

const style2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  }

function UnassignedOrders(props) {
    const [orderSelected, setOrderSelected] = useState(false)

    const [unassignedOrders, setUnassignedOrders] = useState([])
    const [driverList, setDriverList] = useState([])
    const [selectedOrder, setSelectedOrder] = useState({})
    const [radioSelectionId, setRadioSelectionId] = useState(0)
    const [assignedDriver, setAssignedDriver] = useState({})

    const [snackbarOpen, setSnackbarOpen] = useState(false)
    
    const [driverModalOpen, setDriverModalOpen] = useState(false)
    const handleDriverModalOpen = () => setDriverModalOpen(true)
    const handleDriverModalClose = () => setDriverModalOpen(false)

    const [declineModalOpen, setDeclineModalOpen] = useState(false)
    const handleDeclineModalOpen = () => setDeclineModalOpen(true)
    const handleDeclineModalClose = () => setDeclineModalOpen(false)

    const handleSnackbarClose = () => {
        setSnackbarOpen(false)
    }

    function getOrderItems(params) {
        return(
            params.row.food_ordered.map((item) => (
                item.food_name
            ))
        )
    }

    const columns = [
        { field: 'order_id', headerName: 'Order ID', flex: 0.3 },
        { field: 'food_ordered', headerName: 'Order items', flex: 1, minWidth: 300, valueGetter: getOrderItems,},
        { field: 'user_email', headerName: 'Customer', flex: 0.3 },
        { field: 'order_status', headerName: 'Status', flex: 0.5 },
    ]

    useEffect(() => {
        // get restaurants by status
        axios.post('https://hungry-monkey-api.azurewebsites.net/api/order/getOrderByRestaurantNameAndStatus', {
            "restaurant_name": props.restaurantName,
            "order_status": "placed"
         })
        .then(response => {
            setUnassignedOrders(response.data)
            
        })
        .catch(error => {
            console.log(error)
        })

        // get drivers
        axios.post('https://hungry-monkey-api.azurewebsites.net/api/user/getUserByRole', {
            "role": "deliver"
         })
        .then(response => {
            setDriverList(response.data)       
        })
        .catch(error => {
            console.log(error)
        })

    }, [])

    const handSelectionBox = (newSelectedOrder) => {
        unassignedOrders.map((item) => {
            if(item.order_id === newSelectedOrder[0]) {
                setSelectedOrder(item)
            }
        })
        setOrderSelected(!orderSelected)
    }

    const handleRadioSelection = (event) => {
        setRadioSelectionId(event.target.value)
        // get driver
        axios.post('https://hungry-monkey-api.azurewebsites.net/api/user/getUserByUID', {
            "uid": event.target.value,
         })
        .then(response => {
            setAssignedDriver(response.data)            
        })
        .catch(error => {
            console.log(error)
        })
    }

    const handleAssignDriver = () => {
        // assign driver to order
        axios.patch('https://hungry-monkey-api.azurewebsites.net/api/order/assignOrder2Deliver', {
            "order_id": selectedOrder.order_id,
            "order_deliver_by": assignedDriver.email
         })
        .then(response => {
            console.log("response data: " + response.data)   
            
            axios.patch('https://hungry-monkey-api.azurewebsites.net/api/user/updateDriverStatusByUID', {
                "uid": assignedDriver.uid,
                "deliver_status": "delivering"
             })
            .then(response => {
                console.log("response data 2: " + response.data)            
            })
            .catch(error => {
                console.log(error)
            })
            
        })
        .catch(error => {
            console.log(error)
        })
        

        

        setSnackbarOpen(true)
        setTimeout(() => { window.location.href = "/restaurant_owner_page"; }, 500);
    }

    return (
        <>
            <form autoComplete='off' noValidate >
                <div style={{ width: '100%' }}>
                    <Typography variant='h5'>Unassigned Orders</Typography>
                    <DataGrid
                        autoHeight
                        checkboxSelection
                        rows={unassignedOrders}
                        columns={columns}
                        getRowId={(row) => row.order_id}
                        onSelectionModelChange={handSelectionBox}
                        selectedOrder={selectedOrder}
                    />
                </div>
                <Grid item xs={12} md={12} lg={12} textAlign='right'>
                    <Button
                        variant="contained"
                        sx={{ mt: 3, mb: 1}}
                        color='primary'
                        disabled={!orderSelected}
                        onClick={handleDriverModalOpen}
                    >
                        Assign Driver
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ mt: 3, mb: 1, ml: 3 }}
                        color='secondary'
                        disabled={!orderSelected}
                        onClick={handleDeclineModalOpen}
                    >
                        Decline
                    </Button>
                </Grid>
            </form>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={driverModalOpen}
                onClose={handleDriverModalClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={driverModalOpen}>
                    <Box sx={style}>
                        <FormControl>
                            <Typography variant='h5'>Select a driver</Typography>
                            <RadioGroup aria-labelledby="demo-radio-buttons-group-label" name="radio-buttons-group" value={radioSelectionId} onChange={handleRadioSelection}>
                                {driverList.map((driver, iterator) => {
                                    if(driver.deliver_status === 'waiting') {
                                        return <FormControlLabel value={driver.uid} control={<Radio />} label={driver.first_name + " " + driver.last_name} key={iterator} />
                                    }
                                })}
                                </RadioGroup>
                                
                        </FormControl>
                        <Button 
                            variant='contained'
                            onClick={() => handleAssignDriver()} 
                            style={{marginLeft: 40}}
                            disabled={radioSelectionId === 0? true : false}
                        >Select driver</Button>
                    </Box>
                </Fade>
            </Modal>

            <Modal
                aria-labelledby="transition-modal-title-2"
                aria-describedby="transition-modal-description-2"
                open={declineModalOpen}
                onClose={handleDeclineModalClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={driverModalOpen}>
                    <Box sx={style2}>
                        <Typography variant={'h5'}>Decline Order</Typography>
                        <Typography>Please confirm that you would like to decline this order</Typography>
                        <Button 
                            variant='contained' 
                            color='error'
                        >decline order</Button>
                    </Box>
                </Fade>
            </Modal>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                severity="success"
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Successfully Updated
                </Alert>
            </Snackbar>
        </>
    )
}

export default UnassignedOrders
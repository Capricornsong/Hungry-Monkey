import { useEffect, useState } from "react"
import { Box, Button, Fade, Grid, Modal, Typography, Backdrop } from "@mui/material"
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

function UnassignedOrders(props) {
    const [orderSelected, setOrderSelected] = useState(false)

    const [unassignedOrders, setUnassignedOrders] = useState([])
    const [driverList, setDriverList] = useState([])
    const [selectedOrder, setSelectedOrder] = useState({})

    const [driverModalOpen, setDriverModalOpen] = useState(false)
    const handleDriverModalOpen = () => setDriverModalOpen(true)
    const handleDriverModalClose = () => setDriverModalOpen(false)

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
            "restaurant_name": "Paskal's Burgers",
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
            console.log(response.data)
            
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
                        //onClick={handleDecline}
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
                        <Typography id="modal-title" variant="h5">Assign a driver</Typography>
                        {driverList.map((driver, iterator) => {
                            if(driver.deliver_status === 'waiting') {
                                return (
                                    <Box key={iterator}>
                                        <Typography>{driver.first_name + driver.last_name}</Typography>
                                    </Box>
                                )
                            }
                        })}
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}

export default UnassignedOrders
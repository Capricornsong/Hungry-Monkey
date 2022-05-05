import { useEffect, useState } from "react"
import { Typography } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import axios from "axios"


function AssignedOrders(props) {
    const [assignedOrders, setAssignedOrders] = useState([])

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
            "order_status": "delivering"
         })
        .then(response => {
            setAssignedOrders(response.data)
            
        })
        .catch(error => {
            console.log(error)
        })

    }, [])


    return (
        <>
            <div style={{ width: '100%' }}>
                <Typography variant='h5'>Assigned Orders</Typography>
                <DataGrid
                    autoHeight
                    rows={assignedOrders}
                    columns={columns}
                    getRowId={(row) => row.order_id}
                />
            </div>
        </>
    )
}

export default AssignedOrders
import { useEffect, useState } from "react"
import { Typography } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import axios from "axios"


function CompletedOrders(props) {
    const [completedOrders, setCompletedOrders] = useState([])

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
            "order_status": "delivered"
         })
        .then(response => {
            setCompletedOrders(response.data)
            
        })
        .catch(error => {
            console.log(error)
        })

    }, [])


    return (
        <>
            <div style={{ width: '100%' }}>
                <Typography variant='h5'>Completed Orders</Typography>
                <DataGrid
                    autoHeight
                    rows={completedOrders}
                    columns={columns}
                    getRowId={(row) => row.order_id}
                />
            </div>
        </>
    )
}

export default CompletedOrders
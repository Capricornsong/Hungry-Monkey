/*
 * @Author: Liusong He
 * @Date: 2022-04-28 13:00:08
 * @LastEditTime: 2022-05-01 18:02:55
 * @FilePath: \coursework_git\src\components\orderHistory.js
 * @Email: lh2u21@soton.ac.uk
 * @Description: 
 */

import { KeyboardArrowDown, TabUnselectedRounded } from "@mui/icons-material"
import { Button, Box, Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { Fragment, useState, useEffect } from "react"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import axios from 'axios'



function Details(props) {
    const { row } = props
    const [open, setOpen] = useState(false)

    return (
        <Fragment>
            <TableRow
                sx={{ '& > *': { borderBottom: 'unset' } }}
            >
                <TableCell>
                    {/* expand button */}
                    <IconButton
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component='th' scope='row'>{row.restaurant_name}</TableCell>
                <TableCell>{row.order_placed_time}</TableCell>
                <TableCell>{row.order_price} </TableCell>
                <TableCell>{row.order_status}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ padding: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout='auto' unmountOnExit>
                        <Box
                            sx={{
                                margin: 1
                            }}
                        >
                            <Typography variant="h6" gutterBottom component='div'>Details</Typography>
                            <Table size='small' >
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell>Food name</TableCell>
                                        <TableCell>Price ( £)</TableCell>
                                        <TableCell>Amount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.food_ordered.map((foodRow) => (
                                        <TableRow key={foodRow.food_name}>
                                            <TableCell></TableCell>
                                            <TableCell>{foodRow.food_name}</TableCell>
                                            <TableCell>{foodRow.food_price}</TableCell>
                                            <TableCell>{foodRow.food_amount}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    )
}
export const OrderHistory = () => {
    const [orderlist, setOrderlist] = useState([])

    useEffect(() => {
        axios.post('https://hungry-monkey-api.azurewebsites.net/api/order/getOrderByUserUID', {
            uid: '1',
        })
            .then(response => {
                // console.log('response:',response.data)
                setOrderlist([...response.data])
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return (
        <>
            <Typography variant="h5" sx={{
                mb: 2,
                ml: 2
            }}>Order History</Typography>
            <TableContainer component={Paper}>

                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Restaurant Name</TableCell>
                            <TableCell>Order Placed Date</TableCell>
                            <TableCell>Total Price ( £)</TableCell>
                            <TableCell>Order Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orderlist.map((row) => (
                            row.order_status === 'delivered' ? <Details key={row.order_id} row={row} /> : <></>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

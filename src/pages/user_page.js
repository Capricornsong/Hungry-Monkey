/*
 * @Author: Liusong He
 * @Date: 2022-04-26 17:55:13
 * @LastEditTime: 2022-05-01 20:46:54
 * @FilePath: \coursework_git\src\pages\user_page.js
 * @Email: lh2u21@soton.ac.uk
 * @Description: 
 */

import { UpdateProfile } from '../components/user_profile'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Container, Grid, Typography, Modal, Card, CardContent, CardActions, CardActionArea, CardMedia, useMediaQuery, } from '@mui/material'
import { shadows, textAlign } from '@mui/system'
import { OrderHistory } from '../components/orderHistory'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import * as React from 'react'
import axios from 'axios'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

function Details(props) {
    const { row } = props
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const handleMap = (event) => {
        console.log(row.order_id)
        setOpen(true)
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }

    return (
        // <Card sx={{
        //     // maxWidth:345,
        //     mb:2,
        //     boxShadow: 3,
        // }}>
        //     <CardActionArea>
        //         <CardContent>
        //         <Typography gutterBottom variant="h6" >
        //             {row.restaurant_name}
        //         </Typography>
        //         <Typography variant="body3" color="text.secondary" sx={{

        //         }}>
        //             Order Place Time: {row.order_placed_time} 
        //         </Typography>
        //         </CardContent>
        //     </CardActionArea>
        // </Card>
        <>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{
                        height: '1px'
                    }}
                >
                    <Typography>{row.restaurant_name}</Typography>
                    {/* <Typography sx={{ color: 'text.secondary' }}>I am an accordion</Typography> */}
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body2" color="text.secondary" component="div" sx={{ ml: 1 }}>
                        Order Place Time: {row.order_placed_time}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" component="div" sx={{ ml: 1 }}>
                        Including:
                    </Typography>
                    {row.food_ordered.map((food) => (
                        <Typography variant="body2" color="text.secondary" component="div" sx={{
                            ml: 3
                        }}>{food.food_amount} × {food.food_name} </Typography>
                    ))}
                    <Typography variant="subtitle2" color="text.secondary" component="div" sx={{ ml: 1 }} >
                        Total Price: {row.order_price}  £
                    </Typography>
                    <Grid
                        item
                        // justifyContent='flex-end'
                        direction='row-reverse'
                        textAlign='right'
                    >
                        <Button
                            onClick={handleMap}
                            variant="outlined"
                            textSizeSmall
                            sx={{
                                mt: 1,
                                fontSize: '1px'
                            }}
                            color='primary'
                        >
                            Update
                        </Button>
                    </Grid>
                </AccordionDetails>
            </Accordion>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </Modal>
        </>

    )
}


export default function User_page() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    // mode: prefersDarkMode ? 'dark' : 'light',
                    mode:'light'
                },
            }),
        [prefersDarkMode],
    )

    const [orderlist, setOrderlist] = React.useState([])

    React.useEffect(() => {
        axios.post('https://hungry-monkey-api.azurewebsites.net/api/order/getOrderByUserUID', {
            uid: '1',
        })
            .then(response => {
                // console.log('response:',response.data)
                console.log('dadadada', response.data)
                setOrderlist([...response.data])
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return (
        <ThemeProvider theme={theme}>
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
                        Account
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
                                            Hi🖐 Liuosng HE~
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" textAlign='center'>
                                            UserId: 2151646
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                            <Typography gutterBottom variant="h6" component="div" sx={{
                                mt: 3
                            }}>
                                Order in progress
                            </Typography>
                            {orderlist.map((row) => (
                                row.order_status != 'delivered' ? <Details key={row.order_id} row={row} /> : <></>
                            ))}
                        </Grid>
                        <Grid
                            item
                            //the number of columns it uses
                            lg={8}
                            md={8}
                            xs={12}
                        >
                            <UpdateProfile />
                        </Grid>
                        <Grid
                            item
                            lg={12}
                            md={12}
                            xs={12}
                        >
                            <OrderHistory />
                        </Grid>
                    </Grid>
                </Container>

            </Box>
        </ThemeProvider>
    )
}

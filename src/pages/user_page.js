/*
 * @Author: Liusong He
 * @Date: 2022-04-26 17:55:13
 * @LastEditTime: 2022-05-12 15:58:27
 * @FilePath: \monkey\Hungry-Monkey\src\pages\user_page.js
 * @Email: lh2u21@soton.ac.uk
 * @Description: 
 */
//import { useJsApiLoader, GoogleMap } from '@react-google-maps/api'
import { UpdateProfile } from '../components/user_profile'
import { Map } from '../components/map'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Container, Dialog, DialogTitle, styled, DialogContent, DialogActions, Grid, Typography, Modal, Card, CardContent, CardActions, CardActionArea, CardMedia, useMediaQuery, } from '@mui/material'
import { shadows, textAlign } from '@mui/system'
import { OrderHistory } from '../components/orderHistory'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import * as React from 'react'
import axios from 'axios'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { auth } from "../util/firebaseAuth"
import { useNavigate } from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Navbar from '../components/Navbar'
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}))

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    )
}
function Details(props) {
    const { row } = props
    const [open, setOpen] = React.useState(false)
    const handleClose = () => setOpen(false)
    const handleMap = (event) => {
        // console.log(row.order_id)
        setOpen(true)
        // console.log(event.currentTarget);
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
    // sessionStorage.getItem('uid ')
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
                        <br/>
                        Total Price: £ {row.order_price}  
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" component="div" sx={{ ml: 1 }} >
                        Order Status: {row.order_status}  
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
                            Location
                        </Button>
                    </Grid>
                </AccordionDetails>
            </Accordion>
            <BootstrapDialog
                
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                maxWidth={800}
                disablePortal
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Location
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Map row = {row}/>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </BootstrapDialog>

        </>
    )
}


export default function User_page() {
    // this.props.history.push('/login')
    // console.log('uid', sessionStorage.getItem('uid'))
    // console.log('sessionuid', sessionStorage.getItem('uid'))
    const navigate = useNavigate()
    if (!sessionStorage.getItem('uid')) {
        navigate('/login')
    }
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    // mode: prefersDarkMode ? 'dark' : 'light',
                    mode: 'light'
                },
            }),
        [prefersDarkMode],
    )

    const [orderlist, setOrderlist] = React.useState([])

    React.useEffect(() => {
        if (sessionStorage.getItem('uid')) {
            axios.post('https://hungry-monkey-api.azurewebsites.net/api/order/getOrderByUserUID', {
                uid: sessionStorage.getItem('uid'),
                // uid: '1'
            })
                .then(response => {
                    // console.log('response:',response.data)
                    // console.log('dadadada', response.data)
                    setOrderlist([...response.data])
                })
                .catch(error => {
                    alert(error)
                    console.log(error)
                })
        }
        else {
            navigate('/login')
        }
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <Navbar />
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
                                            Hi🖐 {sessionStorage.getItem('user') && JSON.parse(sessionStorage.getItem('user')).first_name}~
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" textAlign='center'>
                                            UserId: {sessionStorage.getItem('uid')}
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

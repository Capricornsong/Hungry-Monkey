import React, { useEffect, useState, useContext } from 'react'
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography, Box, Fade, Modal, Backdrop, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, FormControl, InputLabel, Select, MenuItem  } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios';
import CartContext from './CartContext' 


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  }

function RestaurantCard(props) {
    const { addToCart } = useContext(CartContext)
    const [menuModalOpen, setMenuModalOpen] = React.useState(false)
    const handleMenuModalOpen = () => setMenuModalOpen(true)
    const handleMenuModalClose = () => setMenuModalOpen(false)

    const [infoModalOpen, setInfoModalOpen] = React.useState(false)
    const handleInfoModalOpen = () => setInfoModalOpen(true)
    const handleInfoModalClose = () => setInfoModalOpen(false)

    const [quantity, setQuantity] = React.useState(1);
    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
      };

    const [menuItems, setMenuItems] = useState([]);
      
    useEffect(() => {
        axios.post('https://hungry-monkey-api.azurewebsites.net/api/restaurant/menu/getAllFoodByRestaurantID', {
            'restaurant_id': '11121',
        })
        .then(response => {
            setMenuItems(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    },[])

    return (
        <div>
            <Card sx={{ maxWidth: 345 }} style={{marginTop: 30}}>
                <CardActionArea onClick={() => {
                    handleMenuModalOpen()
                }}>
                    <CardMedia
                        component="img"
                        height="160"
                        image={require('../../src/media/kebab.jpg')}
                        alt="kebab"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {props.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">Food type: {props.foodType}</Typography>
                        <Typography variant="body2" color="text.secondary">Rating: {props.rating}</Typography>
                        <Typography variant="body2" color="text.secondary">Price: {props.price}</Typography>
                        <Typography variant="body2" color="text.secondary">Opens from: {props.opens}</Typography>
                        <Typography variant="body2" color="text.secondary">Closes at: {props.closes}</Typography>
                        <Typography variant="body2" color="text.secondary">Address: {props.address}</Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button 
                        size="small" 
                        color="primary"
                        onClick={() => {
                            handleInfoModalOpen()
                        }}
                    >More info</Button>
                    <Button 
                    variant="contained" 
                    style={{ marginLeft: 150 }}
                    onClick={() => {
                        handleMenuModalOpen()
                    }}
                    >Menu</Button>
                </CardActions>
            </Card>
            <Modal
                aria-labelledby="menu-modal-title"
                aria-describedby="menu-modal-description"
                open={menuModalOpen}
                onClose={handleMenuModalClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={menuModalOpen}>
                    <Box sx={style}>
                        <Typography id="menu-modal" variant="h6" component="h2">{props.name}</Typography>
                        <Typography id="menu-modal-description" sx={{ mt: 2 }}></Typography>
                        <Typography id="menu-modal-table" sx={{ mt: 2 }} component={'span'} variant={'body2'}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                <TableRow>
                                    <TableCell>Menu Item</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {menuItems.map((item) => (
                                    <TableRow
                                    key={item.food_name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell component="th" scope="row">
                                        {item.food_name}
                                    </TableCell>
                                    <TableCell align="right">£ {item.price}</TableCell>
                                    <TableCell align="right">
                                        <Box sx={{ minWidth: 80 }}>
                                            <FormControl>
                                                <InputLabel id="quantity-select-label">Quantity</InputLabel>
                                                <Select
                                                labelId="quantity-simple-select-label"
                                                id="quantity-simple-select"
                                                value={quantity}
                                                label="Quantity"
                                                onChange={handleQuantityChange}
                                                >
                                                <MenuItem value={1}>1</MenuItem>
                                                <MenuItem value={2}>2</MenuItem>
                                                <MenuItem value={3}>3</MenuItem>
                                                <MenuItem value={4}>4</MenuItem>
                                                <MenuItem value={5}>5</MenuItem>
                                                <MenuItem value={6}>6</MenuItem>
                                                <MenuItem value={7}>7</MenuItem>
                                                <MenuItem value={8}>8</MenuItem>
                                                <MenuItem value={9}>9</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button variant="contained" size="small" 
                                            startIcon={<AddCircleOutlineIcon/>}
                                            onClick={() => {
                                                console.log(quantity)
                                                addToCart(item.food_name, item.food_price, quantity)
                                            }}
                                        >Add to cart</Button>
                                    </TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={infoModalOpen}
                onClose={handleInfoModalClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={infoModalOpen}>
                    <Box sx={style}>
                        <Typography id="modal-title" variant="h6" component="h2">{props.name}</Typography>
                        <Typography id="modal-description" sx={{ mt: 2 }}>{props.description}</Typography>
                        <Typography id="modal-description" sx={{ mt: 2 }}>additional content</Typography>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}

export default RestaurantCard

import React from 'react'
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography, Box, Fade, Modal, Backdrop, Container, Grid  } from '@mui/material'

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

    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <div>
            <Card sx={{ maxWidth: 345 }} style={{marginTop: 30}}>
                <CardActionArea onClick={() => {
                    handleOpen()
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
                        <Typography variant="body2" color="text.secondary">
                            Kebab lorem ipsum Kebab lorem ipsum Kebab lorem ipsum Kebab lorem ipsum Kebab lorem ipsum
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">More info</Button>
                    <Button variant="contained" style={{ marginLeft: 150 }}>Menu</Button>
                </CardActions>
            </Card>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="modal-title" variant="h6" component="h2">
                        {props.name}
                        </Typography>
                        <Typography id="modal-description" sx={{ mt: 2 }}>
                                asdasdasd
                        </Typography>
                        <Typography id="modal-description" sx={{ mt: 2 }}>
                                asdasdasd
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}

export default RestaurantCard
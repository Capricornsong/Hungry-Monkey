import react, { useEffect, useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import { countries } from '../data/data'
import { getProfile } from '../util/script'
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    InputLabel,
    TextField,
    MenuItem,
    Select,
    Snackbar,
    Typography,
} from '@mui/material'
import { ThemeContext } from '@emotion/react'
import axios from 'axios'

function DriverTable(props) {

    const uid = { uid: "111111" }

    const [profileData, setProfileData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        address_second_line: '',
        address_first_line: '',
        country: '',
        city: '',
        postcode: '',
    })

    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    // To make Input box inputable
    const handleUpdateInputBox = (event) => {
        setProfileData({
            ...profileData,
            [event.target.name]: event.target.value
        })
    }

    useEffect(() => {
        axios.post('https://hungry-monkey-api.azurewebsites.net/api/user/getUserByUID', {
            uid: '111111',
        })
            .then(response => {
                console.log(response.data)
                setProfileData({ ...response.data })
                console.log(profileData)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])
    
    return (
        <>
            <Card
                sx={{
                    boxShadow: 3,
                }}>
                <CardHeader
                    title='Orders'
                    subheader='Here you can see the status of your assigned orders'
                />
                <Divider />
                <CardContent>
                    <Grid
                        container
                        spacing={2}
                    >
                        <Grid
                            item
                            xs={12}
                            md={12}
                            lg={12}
                        >
                            <Typography>Order id: 1231231231</Typography>
                            <Typography>Restaurant name: Restaurant name</Typography>
                            <Typography>Order created at: 22:22</Typography>
                        </Grid>

                    </Grid>
                </CardContent>
            </Card>
        </>
    )
}

export default DriverTable
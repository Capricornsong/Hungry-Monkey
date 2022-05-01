/*
 * @Author: Liusong He
 * @Date: 2022-04-26 21:29:39
 * @LastEditTime: 2022-04-30 16:24:27
 * @FilePath: \coursework_git\src\components\user_profile.js
 * @Email: lh2u21@soton.ac.uk
 * @Description: This page is used to update users information
 */

import Autocomplete from '@mui/material/Autocomplete'
import { countries } from '../data/data'
import { getProfile } from '../util/script'
import { useEffect, useState } from 'react'
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
} from '@mui/material'
import { ThemeContext } from '@emotion/react'
import axios from 'axios'

export const UpdateProfile = (props) => {
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

    const handleUpdate = (event) => {
        event.preventDefault()
        console.log(profileData)
        axios.patch('https://hungry-monkey-api.azurewebsites.net/api/user/updateUserByUID', profileData)
            .then(response => {
                console.log(response.data)
                if (response.data.result) {
                    setOpen(true)
                }
            })
    }

    useEffect(() => {
        //    getProfile('https://hungry-monkey-api.azurewebsites.net/api/user/getUserByUID',uid)
        //    .then(responsedata => {
        //        setProfileData(responsedata)
        //        console.log(responsedata)
        //    })
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
        // console.log('prorpo')
    }, [])
    // const index = (countries || []).findIndex((countryitem) => countryitem.label === profileData.country)
    // console.log(profileData.country)
    // console.log((countries || []).findIndex((countryitem) => countryitem.label === "United Kingdom"))
    return (
        <>
            <form
                autoComplete='off'
                noValidate
                onSubmit={handleUpdate}
                {...props}
            >
                <Card
                    sx={{
                        boxShadow: 3,
                    }}>
                    <CardHeader
                        title='Profile'
                        subheader='You can update your profile here'
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
                                md={6}
                                lg={6}
                            >
                                <TextField
                                    fullWidth
                                    name='first_name'
                                    required
                                    label='First Name'
                                    value={profileData.first_name}
                                    onChange={handleUpdateInputBox}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={6}
                                lg={6}
                            >
                                <TextField
                                    fullWidth
                                    name='last_name'
                                    required
                                    label='Last Name'
                                    value={profileData.last_name}
                                    onChange={handleUpdateInputBox}
                                />
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                md={12}
                                lg={12}
                            >
                                <TextField
                                    disabled
                                    fullWidth
                                    name='email'
                                    required
                                    label='Email'
                                    helperText="Email can not be change"
                                    // InputProps={{
                                    //     readOnly: true,
                                    //   }}
                                    value={profileData.email}
                                    onChange={handleUpdateInputBox}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={12}
                                lg={12}
                            >
                                <TextField
                                    fullWidth
                                    name='address_first_line'
                                    required
                                    label='Address Line 1'
                                    value={profileData.address_first_line}
                                    onChange={handleUpdateInputBox}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={12}
                                lg={12}
                            >
                                <TextField
                                    fullWidth
                                    name='address_second_line'
                                    required
                                    label='Address Line 2'
                                    value={profileData.address_second_line}
                                    onChange={handleUpdateInputBox}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={4}
                                lg={4}
                            >
                                <TextField
                                    fullWidth
                                    name='city'
                                    required
                                    label='City'
                                    value={profileData.city}
                                    onChange={handleUpdateInputBox}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={4}
                                lg={4}
                            >
                                <TextField
                                    fullWidth
                                    name='postcode'
                                    required
                                    label='Postcode'
                                    value={profileData.postcode}
                                    onChange={handleUpdateInputBox}
                                />
                            </Grid>
                            <Grid item
                                xs={12}
                                md={4}
                                lg={4}
                            >
                                <TextField
                                    disabled
                                    fullWidth
                                    name='Country'
                                    required
                                    label='Country'
                                    helperText="Country can not be change"
                                    value={profileData.country}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={12}
                                lg={12}
                                // justifyContent='flex-end'
                                direction='row-reverse'

                                textAlign='right'
                            >
                                <Button
                                    type="submit"
                                    // fullWidth
                                    variant="contained"
                                    sx={{
                                        mt: 3,
                                        mb: 1,
                                        // color: 'grey.700',
                                        // backgroundColor: theme.palette.grey[50],
                                        // borderColor: theme.palette.grey[100]
                                    }}
                                    color='primary'
                                >
                                    Update
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </form>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                // message="Successfully updated"
                severity="success"
            >
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Successfully Updated
                </Alert>
            </Snackbar>
        </>
    )
}
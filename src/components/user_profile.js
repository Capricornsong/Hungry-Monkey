/*
 * @Author: Liusong He
 * @Date: 2022-04-26 21:29:39
 * @LastEditTime: 2022-04-27 23:30:27
 * @FilePath: \coursework_git\src\components\user_profile.js
 * @Email: lh2u21@soton.ac.uk
 * @Description: This page is used to update users information
 */

import Autocomplete from '@mui/material/Autocomplete'
import { countries } from '../data/data'
import { getProfile } from '../util/script'
import { useEffect, useState } from 'react'
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    Input,
    TextField
} from '@mui/material'
import { ThemeContext } from '@emotion/react'
import axios from 'axios'




export const UpdateProfile = () => {
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
    const handleUpdate = (event) => {
        setProfileData({
            ...profileData,
            [event.target.name]: event.target.value
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
        <form

            autoComplete='off'
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
                                onChange={handleUpdate}
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
                                onChange={handleUpdate}
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
                                name='email'
                                required
                                label='Email'
                                value={profileData.email}
                                onChange={handleUpdate}
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
                                onChange={handleUpdate}
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
                                onChange={handleUpdate}
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
                                onChange={handleUpdate}
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
                                onChange={handleUpdate}
                            />
                        </Grid>
                        <Grid item
                            xs={12}
                            md={4}
                            lg={4}
                        >
                            <Autocomplete
                                options={countries}
                                autoHighlight
                                disablePortal
                                value={profileData.country}
                                // getOptionLabel={(option) => option.label}
                                // (countries || []).findIndex((countryitem) => countryitem.label === profileData.country)
                                // value={countries[index].label}
                                onChange={handleUpdate}
                                renderOption={(props, option) => (
                                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                        <img
                                            loading="lazy"
                                            width="20"
                                            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                            alt=""
                                        />
                                        {/* {option.label} ({option.code}) +{option.phone} */}
                                        {option.label}
                                    </Box>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Choose a country"
                                        id="country"
                                        name='country'
                                    >
                                    </TextField>
                                )}
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
    )
}
/*
 * @Author: Liusong He
 * @Date: 2022-04-26 21:29:39
 * @LastEditTime: 2022-04-27 20:03:27
 * @FilePath: \coursework_git\src\components\user_profile.js
 * @Email: lh2u21@soton.ac.uk
 * @Description: This page is used to update users information
 */

import Autocomplete from '@mui/material/Autocomplete';
import { countries } from '../data/data';
import { getProfile } from '../util/script';
import { useEffect, useState } from 'react';
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
} from '@mui/material';
import { ThemeContext } from '@emotion/react';
import axios from 'axios';




export const UpdateProfile = () => {
    const uid = {uid:"111111"}
    const [values, setValues] = useState({
        firstName: 'Liusong',
        lastName: 'He',
        email: 'demo@qq.com',
        phone: '1231516',
        address1: 'address line 1',
        address2:'address line 2',
        country: 'UK'
      });
    const [profileData,setProfileData] = useState({
        first_name: '' ,
        last_name: '',
        email: '',
        address_second_line: '',
        address_first_line:'',
        country: '',
        city:'',
        postcode:'',
    })
    const handleUpdate = (event) => {
        setProfileData({
            ...profileData,
            [event.target.name] : event.target.value
        })
    }

    useEffect( () => {
    //    getProfile('https://hungry-monkey-api.azurewebsites.net/api/user/getUserByUID',uid)
    //    .then(responsedata => {
    //        setProfileData(responsedata)
    //        console.log(responsedata)
    //    })
        axios.post('https://hungry-monkey-api.azurewebsites.net/api/user/getUserByUID',{
            uid:'111111',
        })
        .then(response => {
            console.log(response.data)
            setProfileData({...response.data})
            console.log(profileData)
        })
        .catch(error => {
            console.log(error)
        })
        // console.log('prorpo')
    },[])
    // const data = getProfile('https://hungry-monkey-api.azurewebsites.net/api/user/getUserByUID',uid)
    // .then(data => {
    //     // var profile = data.body
    //     console.log('propropro')
    // })
    console.log('prorpo')

    return(
        <form
        autoComplete='off'
        >
            <Card 
                sx={{
                    boxShadow:3,
                }}>
                <CardHeader 
                    title='Profile'
                    subheader='You can update your profile here'
                />
                <Divider/>
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
                                name='firstname'
                                required
                                label='First Name'
                                value={profileData.first_name}
                                onChange = {handleUpdate}
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
                                name='lastname'
                                required
                                label='Last Name'
                                value={profileData.last_name}
                                
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
                                name='address1'
                                required
                                label='Address Line 1'
                                value={profileData.address_first_line}
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
                                name='address2'
                                required
                                label='Address Line 2'
                                value={profileData.address_second_line}
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
                            // getOptionLabel={(option) => option.label}
                            // value={profileData.country}
                            value = {profileData.country}
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
                                {option.label} ({option.code}) 
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
                    </Grid>
                </CardContent>
            </Card>
        </form>
    )
}
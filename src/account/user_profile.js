/*
 * @Author: Liusong He
 * @Date: 2022-04-26 21:29:39
 * @LastEditTime: 2022-04-27 16:11:30
 * @FilePath: \coursework\coursework\src\account\user_profile.js
 * @Email: lh2u21@soton.ac.uk
 * @Description: This page is used to update users information
 */

import Autocomplete from '@mui/material/Autocomplete';
import { countries } from '../data';
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
  TextField
} from '@mui/material';
import { ThemeContext } from '@emotion/react';

export const UpdateProfile = () => {
    const uid = {uid:"11111"}
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
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address1: '',
        address2:'',
        country: ''
    })

    useEffect( () => {
        const responsedata = getProfile('https://hungry-monkey-api.azurewebsites.net/api/user/getUserByUID',uid)
        setProfileData(responsedata)
        console.log(responsedata)
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
                                value={values.lastName}
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
                                value={values.firstName}
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
                                name='email'
                                required
                                label='Eamil'
                                value={values.email}
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
                                name='phone'
                                required
                                label='Phone Number'
                                value={values.firstName}
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
                                // value={values.firstName}
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
                                // value={values.firstName}
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
                                // value={values.firstName}
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
                                // value={values.firstName}
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
                            getOptionLabel={(option) => option.label}
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
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                }}
                                
                                />
                            )}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </form>
    )
}
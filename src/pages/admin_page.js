/*
 * @Author: Liusong He
 * @Date: 2022-04-29 16:42:02
 * @LastEditTime: 2022-05-02 20:31:48
 * @FilePath: \coursework_git\src\pages\admin_page.js
 * @Email: lh2u21@soton.ac.uk
 * @Description: 
 */

import { RestaurantList } from '../components/RestaurantList'
import {
    Box,
    Card,
    CardContent,
    Grid,
    Container,
    CardActionArea,
    Typography,
    TableBody,
    useMediaQuery,
} from '@mui/material'
import * as React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useAuth } from '../util/firebaseAuth'
export default function Admin_page() {
    // const currentUser = useAuth()
    //Used to set theme automatically depend on the system setting 
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
    const theme = React.useMemo(
        () => createTheme({
            palette: {
                mode: prefersDarkMode ? 'dark' : 'light',
            },
        }),
        [prefersDarkMode],
    )
    // if (sessionStorage.getItem('uid')) {
        return (
            <>
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
                            Administrator
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
                                                Hi🖐 {sessionStorage.getItem('uid')}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" textAlign='center'>
                                                Admin Id: {sessionStorage.getItem('uid')}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>

                            <Grid
                                item
                                //the number of columns it uses
                                lg={8}
                                md={8}
                                xs={12}
                            >
                                <RestaurantList />
                            </Grid>
                        </Grid>
                    </Container>
                </Box>

            </>
        )
    // }
    // else {
    //     window.open('\login', '_self')，
    //     return null
    // }

}

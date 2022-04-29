/*
 * @Author: Liusong He
 * @Date: 2022-04-26 17:55:13
 * @LastEditTime: 2022-04-29 16:16:57
 * @FilePath: \coursework_git\src\pages\user_page.js
 * @Email: lh2u21@soton.ac.uk
 * @Description: 
 */

import { UpdateProfile } from '../components/user_profile'
import { Box, Button, Container, Grid, Typography, Card, CardContent, CardActions, CardActionArea, CardMedia,useMediaQuery,} from '@mui/material'
import { shadows } from '@mui/system'
import { OrderHistory } from '../components/orderHistory'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import * as React from 'react'

export default function User_page(){
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = React.useMemo(
        () =>
        createTheme({
            palette: {
            mode: prefersDarkMode ? 'dark' : 'light',
            },
        }),
        [prefersDarkMode],
    );
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
                    </Grid>
                    <Grid
                        item
                        //the number of columns it uses
                        lg={8}
                        md={8}
                        xs={12}
                    >
                        <UpdateProfile />
                        {/* <Card sx={{
                // maxWidth:600,
                boxShadow:3,
            }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Liuosng HE
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        This is some sentenece.
                    </Typography>
                </CardContent>
            </Card> */}
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

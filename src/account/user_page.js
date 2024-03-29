/*
 * @Author: Liusong He
 * @Date: 2022-04-26 17:55:13
 * @LastEditTime: 2022-04-26 21:38:29
 * @FilePath: \coursework\coursework\src\account\user_page.js
 * @Email: lh2u21@soton.ac.uk
 * @Description: 
 */

import { UpdateProfile } from './user_profile';
import { Box, Button,Container, Grid, Typography,Card,CardContent,CardActions,CardMedia } from '@mui/material';
import { shadows } from '@mui/system';


export default function  user_page(){
    return(
        <>
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                //pending top
                py: 8
            }}
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
                    boxShadow:3,
                    }}>
                   <CardContent>
                        <Typography gutterBottom variant="h5" component="div" textAlign='center
                        '>
                            Hi🖐 Liuosng HE~
                        </Typography>
                        <Typography variant="body2" color="text.secondary" textAlign='center'>
                            UserId: 2151646
                        </Typography>
                    </CardContent>
                </Card>
                </Grid>
                <Grid
                    item
                    //the number of columns it uses
                    lg={8}
                    md={8}
                    xs={12}
                >
                    <UpdateProfile/>
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
            </Grid>
        </Container>
    </Box>
        </>
    )
}

/*
 * @Author: Liusong He
 * @Date: 2022-04-29 16:42:02
 * @LastEditTime: 2022-04-30 20:09:42
 * @FilePath: \coursework_git\src\pages\admin_page.js
 * @Email: lh2u21@soton.ac.uk
 * @Description: 
 */

import { RestaurantList } from '../components/RestaurantList'
import { useEffect, useState } from 'react'
import {
    Alert,
    Box,
    Button,
    Card,
    Toolbar,
    Tooltip,
    CardContent,
    CardHeader,
    Checkbox,
    Divider,
    Grid,
    InputLabel,
    TextField,
    MenuItem,
    Paper,
    Select,
    Snackbar,
    TableHead,
    TablePagination,
    TableRow,
    TableCell,
    selectClasses,
    TableContainer,
    Table,
    TableSortLabel,
    IconButton,
    Theme,
    Container,
    CardActionArea,
    Typography,
    TableBody,
    useMediaQuery,
} from '@mui/material'
import * as React from 'react'

import { createTheme, ThemeProvider } from '@mui/material/styles'
import { logDOM } from '@testing-library/react'

// const columns = [
//     { field: 'restaurant_id', headerName: 'Restaurant ID', flex: 1 },
//     { field: 'name', headerName: 'Name', width: 250, },
//     { field: 'location', headerName: 'Location', flex: 0.3, minWidth: 70 },
//     { field: 'owner', headerName: 'Owner', flex: 0.3 },
//     { field: 'status', headerName: 'Status', flex: 0.5 },
//     // { field: 'owner', headerName: 'Owner', width: 70 },
// ]
export default function Admin_page() {
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
                                            Hi🖐 Administrator'name
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" textAlign='center'>
                                            Admin Id: 2151646
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
}

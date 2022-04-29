/*
 * @Author: Liusong He
 * @Date: 2022-04-29 16:42:02
 * @LastEditTime: 2022-04-29 19:24:17
 * @FilePath: \coursework_git\src\pages\admin_page.js
 * @Email: lh2u21@soton.ac.uk
 * @Description: 
 */

import { useEffect, useState } from 'react'
import {
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
import PropTypes from 'prop-types'
import { alpha } from '@mui/material/styles'

import DeleteIcon from '@mui/icons-material/Delete'
import FilterListIcon from '@mui/icons-material/FilterList'
import { visuallyHidden } from '@mui/utils'
import { height } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const rows = [
    {
        "description": "Drake",
        "name": "松子 Southampton",
        "close_time": "22:22",
        "status": "WaitConfirm",
        "open_time": "11:11",
        "owner": "Yj",
        "location": "10,10",
        "restaurant_id": "1008611"
    },
    {
        "status": "WaitConfirm",
        "open_time": "11:11",
        "restaurant_id": "10086112",
        "close_time": "22:22",
        "name": "松子松 Southampton",
        "description": "Drake",
        "location": "10,10",
        "owner": "Yj"
    },
    {
        "status": "WaitConfirm",
        "owner": "Yj",
        "restaurant_id": "10086121",
        "close_time": "22:22",
        "name": "松子 Southampton 2",
        "open_time": "11:11",
        "location": "10,10",
        "description": "Drake"
    },
    {
        "location": "10,10",
        "owner": "Yj",
        "close_time": "22:22",
        "description": "Drake",
        "open_time": "11:11",
        "status": "WaitConfirm",
        "restaurant_id": "186121",
        "name": "松子 Southampton 3"
    },
    {
        "open_time": "11:11",
        "restaurant_id": "293dd8e9-876a-45e0-b155-6df0f466f73e",
        "close_time": "22:22",
        "location": "10,10",
        "owner": "Yj",
        "description": "Drake",
        "name": "Dy Restaurant Southampton 3",
        "status": "WaitConfirm"
    }
]

const columns = [
    { field: 'restaurant_id', headerName: 'Restaurant ID', flex: 1 },
    { field: 'name', headerName: 'Name', width: 250,  },
    { field: 'location', headerName: 'Location', flex: 0.3 ,minWidth:70 },
    { field: 'owner', headerName: 'Owner',flex: 0.3  }
    
    // { field: 'owner', headerName: 'Owner', width: 70 },
]
export default function Admin_page() {

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
                        <div style={{ height: 400, width: '100%' }}>
                            <DataGrid
                                checkboxSelection
                                // disableSelectionOnClick
                                rows={rows}
                                columns={columns}
                                // pageSize={8}
                                // rowsPerPageOptions={[8]}
                                getRowId={(rows) => rows.restaurant_id}
                            />
                        </div>
                    </Grid>
                    
                   
                </Grid>
            </Container>
            </Box>
            
        </>

    )
}

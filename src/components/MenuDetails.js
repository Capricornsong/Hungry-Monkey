import * as React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Box, Card, CardActionArea, CardContent, Collapse, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography, useMediaQuery } from '@mui/material'


function MenuDetails(props) { 
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const [editFormOpen, setEditFormOpen] = React.useState(false)

    const theme = React.useMemo( () =>
        createTheme({
            palette: {
            mode: prefersDarkMode ? 'dark' : 'light',
            },
        }),
        [prefersDarkMode],
    );

    return (
        <ThemeProvider theme={theme}>
            <Grid container spacing={3} style={{marginTop: 20}}>
                    <Grid item lg={12} md={12} xs={12}>

                        <Card sx={{ boxShadow: 3}}>
                            <CardActionArea onClick={() => setEditFormOpen(!editFormOpen)}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div" textAlign='center'>
                                        Menu Details
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" textAlign='center'>
                                        {editFormOpen? 'Click here to close the menu editor' : 'Click here to edit menu details'}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>

                        <Collapse in={editFormOpen} timeout='auto' unmountOnExit>
                            <Card sx={{ boxShadow: 3 }}>
                                <CardContent>
                                    <Table>
                                        <TableBody>                
                                            <TableRow>
                                                <TableCell style={{ padding: 0, paddingTop: 0 }} colSpan={6}>
                                                    <Box
                                                        sx={{
                                                            margin: 1
                                                        }}
                                                    >
                                                        <Typography variant="h6" gutterBottom component='div'>Details</Typography>
                                                        <Table size='small' >
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell style={{borderBottom: "0"}}>Food name</TableCell>
                                                                    <TableCell style={{borderBottom: "0"}}>Price ( £)</TableCell>
                                                                    <TableCell style={{borderBottom: "0"}}>Amount</TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {/** something here too */}
                                                            </TableBody>
                                                        </Table>
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </Collapse>

                    </Grid>
                </Grid>

        </ThemeProvider>
    )
}

export default MenuDetails
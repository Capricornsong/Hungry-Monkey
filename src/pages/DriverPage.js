import * as React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Box, Button, Container, Grid, Typography, Card, CardContent, CardActions, CardActionArea, CardMedia,useMediaQuery,} from '@mui/material'
import DriverTable from '../components/DriverTable'

function DriverPage(){
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
            sx={{
                flexGrow: 1,
                py: 8
            }}
            theme={theme}
        >
            <Container maxWidth="lg">
                <Typography
                    sx={{ mb: 3 }}
                    variant="h4"
                >
                    Driver
                </Typography>
                <Grid
                    container
                    spacing={3}
                >
                    <Grid
                        item
                        lg={4}
                        md={4}
                        xs={12}
                    >
                        <Card sx={{
                            boxShadow: 3,
                        }}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div" textAlign='center'>
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
                        lg={8}
                        md={8}
                        xs={12}
                    >
                        <DriverTable />
                    </Grid>
                </Grid>
            </Container>
        </Box>
        </ThemeProvider>
    )
}

export default DriverPage

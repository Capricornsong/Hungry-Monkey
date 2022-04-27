
import React from 'react'
import Navbar from '../components/Navbar'
import PostcodeSearch from '../components/PostcodeSearch'
import RestaurantRow from '../components/RestaurantRow'
import { Container, CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import '../css/Home.css'

const theme = createTheme()

function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Container component="main" maxWidth="xl">
      <CssBaseline />
        <PostcodeSearch />
        <RestaurantRow />
      </Container>
    </ThemeProvider>
  )
}

export default Home
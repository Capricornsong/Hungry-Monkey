import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import PostcodeSearch from '../components/PostcodeSearch'
import RestaurantRow from '../components/RestaurantRow'
import { Container, CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import '../css/Home.css'
import axios from 'axios'

const theme = createTheme()

function Home() {
  const [allRestaurants, setAllRestaurants] = useState([])
  
  useEffect(() => {
    axios.get('https://hungry-monkey-api.azurewebsites.net/api/restaurant/getAllRestaurant')
    .then(response => response.data)
    .then((data) => {
      setAllRestaurants(data)
    });
  },[])

  return (
    <ThemeProvider theme={theme}>
      <Navbar/>
      <Container component="main" maxWidth="xl">
      <CssBaseline />
        <PostcodeSearch />
        <RestaurantRow allRestaurants={allRestaurants}/>
      </Container>
    </ThemeProvider>
  )
}

export default Home
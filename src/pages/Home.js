import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import PostcodeSearch from '../components/PostcodeSearch'
import RestaurantRow from '../components/RestaurantRow'
import { Container, CssBaseline, Skeleton, } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import '../css/Home.css'
import axios from 'axios'
import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api'
const theme = createTheme()

function Home() {
  const [allRestaurants, setAllRestaurants] = useState([])
  const [lat, setLat] = useState()
  const [lng, setLng] = useState()
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    // libraries:['places']
  })

  const nearByRestaurants = []
  const [currLat, setCuttLat] = useState(50.935)
  const [currLng, setCuttLng] = useState(-1.395)
  const center = { lat: 50.935, lng: -1.395 }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
    console.log("Latitude is :", position.coords.latitude);
    console.log("Longitude is :", position.coords.longitude);
    setCuttLat(position.coords.latitude)
    setCuttLng(position.coords.longitude)
  })
  },[])
  
  useEffect(() => {
    if (isLoaded) {
      axios.post('https://hungry-monkey-api.azurewebsites.net/api/restaurant/getAllRestaurantByStatus',{
        status:'Approve'
      })
        .then(response => response.data)
        .then(async (data) => {
          const a = data.map(async element => {
            const eachRestaurant = new Promise((res, rej) => {
              geocoder.geocode({ address: element.location })
                .then((response) => {
                  const { lat, lng } = response.results[0].geometry.location
                  // console.log(lat())
                  // console.log(lng())
                  setLat(lat())
                  setLng(lng())
                  //console.log(response)
                  directionService.route({
                    origin: { lat: lat(), lng: lng() },
                    // destination: center,
                    destination: {lat: currLat, lng: currLng},
                    // eslint-disable-next-line no-undef
                    travelMode: google.maps.TravelMode.DRIVING
                  }).then((response) => {
                    res(response)
                  })
                })
            })
            const response = await eachRestaurant

            console.log('distance', response.routes[0].legs[0].distance.value)
            if (response && response.routes[0].legs[0].distance.value < 15000) {
              nearByRestaurants.push(element)
              console.log('nearby!!!')
              //console.log(nearByRestaurants)
            }
            else {
              console.log('not near by!!')
            }
          })
          await Promise.all(a)
          setAllRestaurants([...nearByRestaurants])
        })
    }
  }, [isLoaded,currLng])

  if (!isLoaded) {
    return (
      <ThemeProvider theme={theme}>
        <Navbar />
        <Container component="main" maxWidth="xl">
          <CssBaseline />
          <PostcodeSearch />
          <Skeleton variant="rectangular" />
        </Container>
      </ThemeProvider>
    )
  }

  // eslint-disable-next-line no-undef
  const directionService = new google.maps.DirectionsService()
  // eslint-disable-next-line no-undef
  const geocoder = new google.maps.Geocoder()
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Container component="main" maxWidth="xl">
        <CssBaseline />
        {/**
         * 
         * <PostcodeSearch />
         */}
        <RestaurantRow allRestaurants={allRestaurants} />
      </Container>
    </ThemeProvider>
  )
}

export default Home
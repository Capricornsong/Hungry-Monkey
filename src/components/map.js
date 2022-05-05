/*
 * @Author: Liusong He
 * @Date: 2022-05-01 19:18:06
 * @LastEditTime: 2022-05-04 20:23:52
 * @FilePath: \coursework_git\src\components\map.js
 * @Email: lh2u21@soton.ac.uk
 * @Description: 
 */
import { Box } from '@mui/material'
import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api'
import { Skeleton, Typography, LinearProgress, Grid, Chip } from '@mui/material'
import { useEffect, useReducer, useRef, useState } from 'react'
import PropTypes from "prop-types"
const center = { lat: 50.935, lng: -1.395 }
const de = { lat: 50.938, lng: -1.389 }

function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ width: "100%", mr: 1 }}>
                <LinearProgress
                    variant="determinate"
                    {...props}
                    sx={{
                        height: 13,
                        borderRadius: 5
                    }}
                />
            </Box>
            <Box sx={{ minWidth: 45 }}>

                <Typography variant="body2" color="text.secondary">
                    {Math.round(3 * (100 - props.value))} s
                </Typography>
            </Box>
        </Box>
    )
}
LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired
}
export const Map = () => {
    const [progress, setProgress] = useState(1)
    const [result, setResult] = useState(null)
    const [lat, setLat] = useState()
    const [lng, setLng] = useState()

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        // libraries:['places']
    })


    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) =>
                prevProgress >= 100 ? 0.3 : prevProgress + 0.3
            )
        }, 1000)
        return () => {
            clearInterval(timer)
        }
    }, [])

    useEffect(() => {
        if (isLoaded) {
            directionService.route({
                origin: center,
                destination: de,

                // eslint-disable-next-line no-undef
                travelMode: google.maps.TravelMode.DRIVING

            }).then((response) => {
                setResult(response)

                console.log(response.routes[0].legs[0].distance)
            })
        }

    }, [isLoaded])

    if (!isLoaded) {
        return (
            <Skeleton variant="rectangular" width={210} height={118} />
        )
    }
    // eslint-disable-next-line no-undef
    const directionService = new google.maps.DirectionsService()
    return (
        <Box
            height={580}
            width={800}>
            {/* Google map */}
            {/* <Skeleton variant="rectangular" width={210} height={118} /> */}
            <GoogleMap center={center} zoom={15} mapContainerStyle={{ width: '100%', height: '88%' }}
                options={{
                    streetViewControl: true
                }}
            >
                {/* <Marker position={center} /> */}
                {result && <DirectionsRenderer directions={result} />}
            </GoogleMap>

            <Typography gutterBottom Typography variant="body1"
                sx={{
                    mt: 1,
                    ml: 3,
                }}>
                Distance: <Chip label={result && result.routes[0].legs[0].distance.text} color="success" />
            </Typography>
            <Box sx={{
                width: "95%",
                display: 'flex',
                ml: 3,
            }}>
                <Grid item xs={4} sm={4}>
                    <Typography>
                        Estimated time: <Chip label={result && result.routes[0].legs[0].duration.text} color="primary" />
                    </Typography>
                </Grid>
                <Grid item xs={8} sm={8}><LinearProgressWithLabel value={progress} /></Grid>
            </Box>
            {/* <h1>dadwadda</h1> */}
        </Box>
    )
}
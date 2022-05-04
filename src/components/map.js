/*
 * @Author: Liusong He
 * @Date: 2022-05-01 19:18:06
 * @LastEditTime: 2022-05-03 22:19:26
 * @FilePath: \coursework_git\src\components\map.js
 * @Email: lh2u21@soton.ac.uk
 * @Description: 
 */
import { Box } from '@mui/material'
import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api'
import { Skeleton, Typography } from '@mui/material'
import { useEffect, useReducer, useRef, useState } from 'react'

const center = { lat: 50.935, lng: -1.395 }
const de = { lat: 50.938, lng: -1.389 }


export const Map = () => {

    const [result, setResult] = useState(null)

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        // libraries:['places']
    })

    useEffect(() => {
        if (isLoaded) {
            directionService.route({
                origin: center,
                destination: de,

                // eslint-disable-next-line no-undef
                travelMode: google.maps.TravelMode.DRIVING

            }).then((response) => {
                setResult(response)
                console.log(response)
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
            height={550}
            width={800}>
            {/* Google map */}
            {/* <Skeleton variant="rectangular" width={210} height={118} /> */}
            <GoogleMap center={center} zoom={15} mapContainerStyle={{ width: '100%', height: '95%' }}
                options={{
                    streetViewControl: true
                }}
            // onLoad={(map) => setMap(map)}
            >
                <Marker position={center} />
                {result && <DirectionsRenderer directions={result} />}
            </GoogleMap>
            <Typography gutterBottom>
                addawss
                {console.log(result)}
                Distance:{result && result.routes[0].legs[0].distance.text}
                Estimated time:{result && result.routes[0].legs[0].duration.text}
            </Typography>
            {/* <h1>dadwadda</h1> */}
        </Box>
    )
}
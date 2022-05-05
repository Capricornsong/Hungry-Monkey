import React, { useState } from 'react'
import { Button, Grid, TextField, Typography } from '@mui/material'

function PostcodeSearch() {
    const [buttonVisible, setButtonVisible] = useState(false)

    const textEntered = (e) => {
        if(e.target.value !== null) {
            if(buttonVisible !== true) {
                setButtonVisible(true)
            }
        }

        if(e.target.value.length === 0) {
            if(buttonVisible !== false) {
                setButtonVisible(false)
            }
        }
      }

    return (
        <Grid container>
            <Grid item xl={1} lg={1} md={1} sm={1} xs={1}/>
            <Grid item xl={9} lg={8} md={8} sm={8} xs={7}>
                <Typography variant="h6" color="inherit" component="div" style={{ marginTop: 20 }}>
                    Input your postcode to search takeaways near you
                </Typography>
                <TextField 
                    id="outlined-basic" 
                    label="Postcode search" 
                    variant="outlined" 
                    className='postcode-input' 
                    fullWidth 
                    onChange={textEntered}
                />
            </Grid>
            <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                <Button variant="contained" disabled={buttonVisible ? false : true} id="postcode-button" style={{marginTop: 60}}>Submit</Button>
            </Grid>
            <Grid item xl={1} lg={1} md={1} sm={1} xs={1}/>
        </Grid>
    )
}

export default PostcodeSearch
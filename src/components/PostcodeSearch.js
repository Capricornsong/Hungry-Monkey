import React, { useState } from 'react'
import { Button, Grid, TextField, Typography } from '@mui/material'

function PostcodeSearch() {
    const [postCodeEntered, setPostCodeEntered] = useState(true)

    return (
        <div id="postcode-div" className='bottom-margin'>
            <Grid container>
                <Grid item xs={2} />
                <Grid item xs={5}>
                    <Typography variant="h6" color="inherit" component="div" style={{ marginTop: 20 }}>
                        Input your postcode to search takeaways near you
                    </Typography>
                    <TextField id="outlined-basic" label="Postcode search" variant="outlined" className='postcode-input' />
                    <Button variant="contained" disabled={postCodeEntered ? false : true} id="postcode-button">Submit</Button>
                </Grid>
                <Grid item xs={2} />
            </Grid>
        </div>
    )
}

export default PostcodeSearch
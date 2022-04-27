import React, { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';

 function PostcodeSearch(){
    const [postCodeEntered, setPostCodeEntered] = useState(false)

    return(
        <div id="postcode-div" className='bottom-margin'>
            <Grid container>
                <Grid item xs={2}/>
                <Grid item xs={5}>
                    <h3>Input your postcode to search takeaways near you</h3>
                    <TextField id="outlined-basic" label="Postcode search" variant="outlined" className='postcode-input'/>
                    <Button variant="contained" disabled={postCodeEntered? false : true} id="postcode-button">Submit</Button>
                </Grid>
                <Grid item xs={2}/>
            </Grid>
        </div>
    )
  }

export default PostcodeSearch;
import * as React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { Reply } from '@mui/icons-material';

const DashboardDueCard = (props) => {
    return (
        <Box sx={{ textOverflow: 'ellipsis' }} style={{width:'90%', padding: '5px', marginTop: 0, marginBottom: '15px', height: '60px', border: '3px solid #f5f5f5', borderRadius: '10px', background: 'none', display: 'flex', alignItems: 'center'}}>
            <div style={{height: '100%', width: '100%', background: 'none', cursor: 'pointer'}} onClick={console.log('clicked card')}>
            <Grid container spacing={1}>
                <Grid item md={2}>
                    <div style={{width:'100%', height:'58px', borderRadius:'10px', alignItems:'center', display: 'flex', justifyContent: 'center', backgroundColor:'#fbf2a1'}}> 
                        <Reply/> 
                    </div>
                </Grid>
                <Grid item md={10}>
                    <Typography variant='caption'> {props.data.action}</Typography>
                    <Typography noWrap variant='body2' style={{ textOverflow: 'ellipsis' }} > <b> {props.data.customerName} </b></Typography>
                    <Typography variant='caption'> {props.data.deadline} </Typography>
                </Grid>
            </Grid>
            </div>
        </Box>
    )
}

export default DashboardDueCard;
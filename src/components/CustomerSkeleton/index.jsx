import Skeleton from '@mui/material/Skeleton';
import { Stack, Grid } from '@mui/material';

const CustomerSkeleton = () => {
    return (
        <div id='dashboard-skeleton' style={{height: '100%', width: '100%'}}>
            <Grid container spacing={1} style={{height: '100%', padding: '25px'}}>
                <Grid item md={3} style={{padding: 0}} sx={{borderRadius: '10px', padding: 0, height: '100%'}}>
                    <Skeleton variant='rectangular' animation="wave" sx={{height: '100%', borderRadius: '5px'}}/>
                </Grid>
                <Grid item md={9} style={{padding: 0, paddingLeft: '20px'}}>
                    <Stack spacing={1} alignItems='stretch' direction='column' sx={{height:'100%'}}>
                        <div style={{height: '50%', margin: 0, background: 'white', borderRadius: '5px'}}>
                            <Skeleton variant='rectangular' animation="wave" sx={{height: '100%', borderRadius: '5px'}}/>
                        </div>
                        <div style={{height: '50%', marginTop: '20px', background: 'white', borderRadius: '5px'}}>
                            <Skeleton variant='rectangular' animation="wave" sx={{height: '100%', borderRadius: '5px'}}/>
                        </div>
                    </Stack>
                </Grid>
            </Grid>
        </div>
    )
}

export default CustomerSkeleton;
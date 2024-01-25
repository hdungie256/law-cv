import { ArrowRight, Pause, Pending } from "@mui/icons-material";
import { Typography, Grid, Chip } from "@mui/material"

const DashboardLeftRow = () => {
    const handleClick = () => {
        console.log('clicked');
    };
    return(
        <div onClick={handleClick} style={{cursor: 'pointer'}}>

        <Grid container sx={{background:'none',height: '50px',display:'flex', alignItems: 'center'}}>
        <Grid item md={0.5}>
            <Pause fontSize="small" sx={{borderRadius: '50%', background: '#defba1'}}/>
        </Grid>
        <Grid item md={3.25}>
            <Typography noWrap className='dashboard-left-tab-text' variant='body2'> <b>Bộ chậu trồng cây</b></Typography>
        </Grid>
        <Grid item md={2}>
            <Chip sx={{background:'#fbf2a1'}} label='ĐK Sáng chế'/>
        </Grid>
        <Grid item md={2.5}>
            <Typography className='dashboard-left-tab-text' variant='body2' noWrap>Bánh bao Hà Phát Bánh bao Hà Phát Bánh bao Hà Phát Bánh bao Hà Phát Bánh bao Hà Phát </Typography>
        </Grid>
        <Grid item md={2.25} sx={{display: 'flex', justifyContent:'center'}}>
            <Typography className='dashboard-left-tab-text dashboard-left-tab-text-days' variant='body2' sx={{color: 'red'}} noWrap> <b>10 ngày </b></Typography>
        </Grid>
        <Grid item md={1.5}>
            <Typography className='dashboard-left-tab-text' variant='body2' noWrap> 25/06/2003 </Typography>
        </Grid>
        </Grid>
        </div>
    )
}
export default DashboardLeftRow;
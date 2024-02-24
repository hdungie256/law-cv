import { ArrowRight, Reply } from "@mui/icons-material";
import { Typography, Grid, Chip } from "@mui/material";
import '../../assets/scss/_colors.scss'

const DashboardDueRow = (props) => {
    const handleClick = () => {
        console.log('clicked');
    };
    return(
        <div onClick={handleClick} style={{cursor: 'pointer'}}>

        <Grid container sx={{background:'none',height: '50px',display:'flex', alignItems: 'center'}}>
        <Grid item md={0.5}>
            {/* <ArrowRight fontSize='small'/> */}
            {/* <Divider  orientation="vertical" flexItem/> */}
            {props.data?.action?.includes('Duy trì hiệu lực') ?  <ArrowRight fontSize='small' sx={{borderRadius: '50%',background: '#caebff'}}/>
            : <Reply fontSize="small" sx={{borderRadius: '50%',background: '#fbcca1'}}/>}
        </Grid>
        <Grid item md={2.5}>
            <Typography className='dashboard-due-tab-text' variant='body2'> <b>{props.data.action}</b></Typography>
        </Grid>
        <Grid item md={1.5}>
            <Chip sx={{background: 
            props.data.type === 'Thẩm định nhãn hiệu' ? '#a1a5fb' : 
            props.data.type === 'Sáng chế' ? '#fba1a1' :
            props.data.type === 'KDCN' ? '#c7c6ff' :
            props.data.type === 'Li xăng - Chuyển nhượng' ? "#defba1" : 
            props.data.type === 'Cấp lại' ? "#f9a1fb":
            props.data.type === 'Sửa đổi' ? "#737373": 
            props.data.type === 'Gia hạn' ? "#caebff" : "#fbf2a1"}} 
            label={props.data.type}/>
        </Grid>
        <Grid item md={3}>
            <Typography className='dashboard-due-tab-text' variant='body2' noWrap>{props.data.customerName} </Typography>
        </Grid>
        <Grid item md={2}>
            <Typography className='dashboard-due-tab-text' variant='body2' noWrap>{props.data.workName} </Typography>
        </Grid>
        <Grid item md={1} sx={{display: 'flex', justifyContent:'center'}}>
            <Typography className='dashboard-due-tab-text dashboard-due-tab-text-due' variant='body2' sx={{color: 'red'}} noWrap> <b>{props.data.daysLeft} </b></Typography>
        </Grid>
        <Grid item md={1.5}>
            <Typography className='dashboard-due-tab-text' variant='body2' noWrap> {props.data.deadline} </Typography>
        </Grid>
        </Grid>
        </div>
    )
}
export default DashboardDueRow;
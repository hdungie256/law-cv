import './index.scss'
import * as React from 'react';
import { Box, Fade, Grid, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import DashboardDueCard from '../../components/DashboardDueCard';
import DashboardDueTab from '../../components/DashboardDueTab';
import DashboardLeftTab from '../../components/DashboardLeftTab';
import { useEffect } from 'react';
import getWorkForDashboard from '../../apis/work/getWorkForDashboard';
import CustomerSkeleton from '../../components/CustomerSkeleton';

const DashBoardScreen= () =>{
    const [isLoading, setIsLoading] = React.useState(true)
    const [dueData, setDueData] = React.useState([])
    const [dueCard, setDueCard] = React.useState([])
    const [pendingData, setPendingData] = React.useState([])

    const fetchData = async () => {
        setIsLoading(true)
        if (!sessionStorage.getItem("dashboardData")){
            await getWorkForDashboard();
        }
        const d = sessionStorage.getItem("dashboardData")
        
        setDueData(JSON.parse(d)['dueRows'])
        setDueCard(JSON.parse(d)['dueCards'])
        setPendingData(JSON.parse(d)['pendingRows'])
        setIsLoading(false)
      };
      useEffect(() => {
        fetchData(); 
      }, []); 

    return(
        <div id='dashboard-screen'>
            {!isLoading ? (
            <Fade in={!isLoading} timeout={300}>
            <Grid container spacing={1} style={{height: '100%', padding: '25px'}}>
                <Grid item md={3} style={{borderRadius: '10px'}} sx={{background:'white', borderRadius: '10px', padding: '15px', height: '100%'}}>
                    <Stack sx={{height: '100%', overflow: 'hidden'}} direction="column" justifyContent="space-evenly" alignItems="stretch" spacing={0}>
                        <div>
                        <Typography variant='subtitle1'><b style={{color: 'grey'}}>{today.weekday}, ngày {today.date} tháng {today.month} năm {today.year}</b></Typography>
                        </div>

                        <div>
                        <Stack direction='row' spacing={2} justifyContent={'space-between'} style={{margin: 0}}>
                            <Box className='dashboard-summary-block' style={{height: '70px'}} sx={{background: '#caebff', borderRadius: '10px'}}>
                                    <Typography sx={{color: 'black'}} variant='h5'> <b>{dueData.length + pendingData.length}</b> </Typography>
                                    <Typography variant='body2' className='dashboard-summary-block-title'> Tổng</Typography>
                            </Box>

                            <Box className='dashboard-summary-block' style={{height: '70px'}} sx={{background: '#fbf2a1', borderRadius: '10px'}}>
                                    <Typography sx={{color: 'black'}} variant='h5'> <b>{dueData.length}</b> </Typography>
                                    <Typography variant='body2' className='dashboard-summary-block-title'> Đến hạn</Typography>
                            </Box>

                            <Box className='dashboard-summary-block' style={{height: '70px'}} sx={{background: '#fbcca1', borderRadius: '10px'}}>
                                    <Typography sx={{color: 'black'}} variant='h5'> <b>{pendingData.length}</b> </Typography>
                                    <Typography variant='body2' className='dashboard-summary-block-title'> Chưa có KQ</Typography>
                            </Box>

                        </Stack>
                        </div>

                        <div>
                        <Typography variant='subtitle1'><b style={{color: 'grey'}}>Đến hạn trong 14 ngày:</b></Typography>
                        </div>

                        <div style={{height: '65%'}}>
                        <Box sx={{background: 'none', maxHeight: '100%',overflow: 'auto'}} style={{margin: 0}}>
                            {dueCard.map(item => (
                                <DashboardDueCard data={item}/>
                            ))}

                        </Box>
                        </div>

                    </Stack>
                </Grid>

                <Grid item md={9} style={{padding: 0, paddingLeft: '20px'}}>
                    <Stack spacing={1} alignItems='stretch' direction='column' sx={{height:'100%'}}>
                        <div style={{height: '50%', margin: 0, background: 'white', borderRadius: '5px'}}>
                            <DashboardDueTab data={dueData} maxHeight='45vh'/> 
                        </div>
                        <div style={{height: '50%', marginTop: '20px', background: 'white', borderRadius: '5px'}}>
                            <DashboardLeftTab data={pendingData} maxHeight='45vh'/>
                        </div>
                    </Stack>
                </Grid>
            </Grid>
            </Fade>) :
            <CustomerSkeleton/>}
        </div>
    )
}
export default DashBoardScreen;

const getToday = () => {
    const today = dayjs()
    var weekday = "";
    const date = today.date()
    const month = today.month()+1
    const year = today.year()
    if (today.day() === 0){
        weekday = 'Chủ nhật'
    }
    else if (today.day() === 1){
        weekday = 'Thứ Hai'
    }
    else if (today.day() === 2){
        weekday = 'Thứ Ba'
    }
    else if (today.day() === 3){
        weekday = 'Thứ Tư'
    }
    else if (today.day() === 4){
        weekday = 'Thứ Năm'
    }
    else if (today.day() === 5){
        weekday = 'Thứ Sáu'
    }
    else {
        weekday = 'Thứ Bảy'
    }
    return (
        {weekday: weekday, 
        date: date,
        month: month,
        year: year}
    )
}

const today = getToday()